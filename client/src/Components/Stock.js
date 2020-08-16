import React,{Component} from 'react';
import Navigation from './Navigation';
import {Form,Row,Col} from 'react-bootstrap';
import '../Style/Stock.css';
import axios from 'axios';

class Stock extends Component{
    constructor(props){
        super(props);

        this.state = {
            index :"Nifty",
            show:false,
            open : 0.00,
            dhigh : 0.00,
            dlow : 0.00,
            adjc : 0.00,
            whigh :0.00,
            wlow: 0.00,
            close:0.00,
            diff : 0.00,
            date : "",
            ddiff:0.00,
            wdiff:0.00,
        }

        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(event){
        const payload ={
            company : event.target.value
        }

        this.setState({
            index:event.target.value,
            show:true
        })

        axios({
            url : "http://localhost:9000/last",  /*API call to server to retrieve the last document*/
            method:"POST",
            data:payload
        }).then((response)=>{
            var f = response.data.close - response.data.adj;
            this.setState({
                open : response.data.open,
                dhigh : response.data.high,
                dlow : response.data.low,
                adjc : response.data.adj,
                show:true,
                close:response.data.close,
                diff: f,
                date : response.data.day + " " + response.data.month + " " +response.data.year
            });
        }).catch(()=>{
            console.log("Error!");
        });

        axios({
            url : "http://localhost:9000/min",      /*API call to retrive the minimum ans maximum close over 52 weeks*/
            method:"POST",
            data:payload
        }).then((response)=>{
             this.setState({
                 wlow: response.data[0].min,
                 whigh : response.data[response.data.length-1].min
             })
        }).catch(()=>{
            console.log("Error!");
        })
    }

    

    render(){
        return(
            <div className = "Stock">
                <Navigation name = {this.props.name}/>
                <div className = "form">
                    <Form>
                        <Form.Group controlId="Company">
                                    <Form.Label><h5 id="title2">Stock Index</h5></Form.Label>
                                    <Form.Control as="select" value ={this.state.index} onChange = {this.handleChange}>
                                        <option>Nifty</option>
                                        <option>Bse</option>
                                    </Form.Control>
                        </Form.Group>
                    </Form>
                </div>
                {this.state.show === true ?
                <div className = "show">
                    <h3>{this.state.index}</h3>
                    <hr className ="dash"/>
                    <div className = "major">
                        <Row>
                            <Col xs ={12} sm={6}>
                                <h1>{(this.state.close).toFixed(2)}</h1>
                                <h5>As updated on {this.state.date}</h5>
                            </Col>
                        </Row>
                    </div>
                    <hr className ="dot"/>
                    <div className ="remain">
                        <h5><hr/>Overview<hr/></h5>
                        <Row>
                            <Col xs={12} sm={6}>
                                <h5>Open : {(this.state.open).toFixed(2)}</h5>
                            </Col>
                            <Col xs={12} sm={6}>
                                <h5>Day Low : {(this.state.dlow).toFixed(2)}</h5>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} sm={6}>
                                <h5>Previous Close : {(this.state.adjc).toFixed(2)}</h5>
                            </Col>
                            <Col xs={12} sm={6}>
                                <h5>52 Week High : {(this.state.whigh).toFixed(2)}</h5>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} sm={6}>
                                <h5>Day High : {(this.state.dhigh).toFixed(2)}</h5>
                            </Col>
                            <Col xs ={12} sm={6}>
                                <h5>52 Week Low : {(this.state.wlow).toFixed(2)}</h5>
                            </Col>
                        </Row>
                    </div>
                 </div> : null}
            </div>
        )
    }
}
export default Stock;