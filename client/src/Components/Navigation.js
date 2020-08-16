import React,{Component} from 'react';
import {Navbar,Nav,Button} from 'react-bootstrap';
import '../Style/Navigation.css';
import {Redirect} from 'react-router-dom';

class Navigation extends Component{
    constructor(props){
        super(props);

        this.state ={
            logout : false
        }
        this.send = this.send.bind(this);
    
    }

        
    /*When the user logs out redirect them to login page*/
    send(){
        this.setState({
            logout:true
        });
    }

    render(){
        console.log(this.props.name);
        return(
            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand href="#" id="title">Stock Market</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/Stock" id="nav">Stock Index</Nav.Link>
                            <Nav.Link href="/Company" id="nav">Company</Nav.Link>
                        </Nav>
                            <Button variant="outline-light" onClick = {this.send}>Logout</Button>
                    </Navbar.Collapse>
                </Navbar>
                 {this.state.logout === true ? <Redirect to = {"/"}/> : null}
            </div>
        )
    }
}

export default Navigation;