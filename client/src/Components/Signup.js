import React,{Component} from 'react';
import axios from 'axios';
import { Navbar, Button,Form} from 'react-bootstrap';
import {Redirect,Link} from 'react-router-dom';
import '../Style/Login.css';

class Signup extends Component{
    constructor(props){
        super(props);

        this.state = {
            email: "",
            username: "",
            password : "",
            show:false
        }

        this.handleChange = this.handleChange.bind(this);
        this.send = this.send.bind(this);
    }

     /*Changing the state of the username and password for every change in the input form*/
    handleChange(event){
        var id =  event.target.id;
        var t = event.target.value;

        if(id === "email"){
            this.setState({
                email : t
            });
        }else if(id === "user"){
            this.setState({
                username : t
            });
        }else if(id === "pass"){
            this.setState({
                password : t
            });
        }
    }
     /*Event handler for sending username and password to the server*/
    send(){
        const payload = {
            email : this.state.email,
            username : this.state.username,
            password : this.state.password
        }

        this.setState({
            email : "",
            username:"",
            password:""
        })

        axios({
            url:"http://localhost:9000/signup",
            method:"POST",
            data : payload
        }).then((response)=>{
            if(response.data === "succ"){
                this.setState({
                    show:true     /*Once we get "succ" from the server, Redirect to the Login page*/
                })
            }
        }).catch(()=>{
            console.log("Error!");
        })
    }



    render(){
        return(
            <div className ="Login">
                <Navbar size = "lg" bg="dark" variant = "dark">
                    <Navbar.Brand href="#" id= "title">Stock Market</Navbar.Brand>
                </Navbar>
               
                <div className ="loginform">
                    <h3 id="title2">Signup</h3><hr/>
                    <Form>
                        <Form.Group>
                                <Form.Label><h3>Email</h3></Form.Label>
                                <Form.Control id="email" onChange = {this.handleChange} value = {this.state.email}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label><h3>Username</h3></Form.Label>
                                <Form.Control id="user" onChange = {this.handleChange} value = {this.state.username}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label><h3>Password</h3></Form.Label>
                                <Form.Control id="pass" onChange = {this.handleChange} value = {this.state.password} type= "password"/>
                            </Form.Group>
                            <Button variant="dark" id="buttonlogin" onClick ={this.send}>
                                Submit
                            </Button>
                    </Form>
                    <Link to = {"/"}><h5 id="signlogin">Login Here.</h5></Link>
                </div>
                {this.state.show === true ? <Redirect to ={"/"}/>:null}          
            </div>
        )
    }
}

export default Signup;