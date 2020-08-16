import React,{Component} from 'react';
import {Form,Col,Button} from 'react-bootstrap';
import '../Style/Layout.css';
import axios from 'axios';
import {Line} from 'react-chartjs-2';


class Layout extends Component{
    constructor(props){
        super(props);

        this.state = {
            company:"Ashok", /*default state values*/
            field:"open",
            time:1,
            api : '',
            total:'1 month',
            data : {},
            show:false
        }

        this.handleChange = this.handleChange.bind(this);
        this.send = this.send.bind(this);
    }

    /*On selecting value from dropdown*/
    handleChange(event){
        this.setState({
            show:false   /*Dont show graph while choosing*/
        })

        var id =  event.target.id;
        if(id === "Company"){
             this.setState({
                 company:event.target.value
             })
        }else if(id === "Y"){
            this.setState({
                field:event.target.value
            })
        }else if(id === "time"){
            var t = event.target.value;
            t = t.split(" ");
           
            /*Intialise t[1] according to the api call to make in the server*/
            if(t[1] === "months" || t[1] === "year"){
                t[1] = 'users'; /*Api call to get aggregate for a year or a couple of months */
            }else if(t[1] === "month"){
                t[1] = '';/*Api call to get aggregate for a month*/
            }else if(t[1] === "years"){
                t[1] = 'year'; /*Api call to get aggregate for 5 years*/
            }

            

            this.setState({
                total:event.target.value,
                time : parseInt(t[0]),
                api: t[1]
            });
        }
    }

    send(){

        this.setState({
            show:true   /*On clicking the button plot the graph*/
        });

        var t = this.state.time;
        var u = this.state.api;
        const payload = {
        field: this.state.field,
        company: this.state.company,
        year: "2020",
        month:"Aug"
        }

    
      
    var x = [];  /* x values */
    var y = []; /* y values */
    
    axios({
      url:"http://localhost:9000/"+u,
      method:"POST",
      data:payload
    }).then((response)=>{
      
        var i ; 

        if(t === 1){
            i =0;
        }else{
            i = response.data.length - t-1;
        }

        for(i; i<response.data.length;i++){
          x.push((response.data[i]._id));
          y.push(response.data[i].average);
        }
    })
        this.setState({
          data :{
            labels: x,
            datasets: [
              {
                label: this.state.company + " " +this.state.field,
                data: y,
                fill: false,
                 borderColor: "black"
              
              }
            ]
          }
        });
  }
    

    
    render(){
        return(
            <div className ="Layout">
                <Form>
                    <Form.Row>
                        <Form.Group as={Col} controlId="Company">
                                <Form.Label id="title">Company</Form.Label>
                                <Form.Control as="select" value ={this.state.company} onChange = {this.handleChange} >
                                    <option>Ashok</option>
                                    <option>Reliance</option>
                                    <option>Tatasteel</option>
                                    <option>Cipla</option>
                                    <option>Eichter</option>
                                </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="Y">
                                <Form.Label id="title">Y axis</Form.Label>
                                <Form.Control as="select" value ={this.state.field} onChange = {this.handleChange} >
                                    <option>open</option>
                                    <option>high</option>
                                    <option>adj</option>
                                    <option>close</option>
                                    <option>low</option>
                                </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="time">
                                <Form.Label id="title">Time</Form.Label>
                                <Form.Control as="select" value ={this.state.total} onChange = {this.handleChange}>
                                    <option>1 month</option>
                                    <option>3 months</option>
                                    <option>6 months</option>
                                    <option>1 year</option>
                                    <option>2 years</option>
                                    <option>5 years</option>
                                </Form.Control>
                        </Form.Group>
                    </Form.Row>
                    <Button variant ="dark" onClick = {this.send}>Plot Graph!</Button>
                </Form>
                {this.state.show === true ? <div className ="output"><h5 id="final">The aggregate of {this.state.field} over a period of {this.state.total}</h5><Line data = {this.state.data}/></div> : null}
            </div>
        )
    }
}

export default Layout;