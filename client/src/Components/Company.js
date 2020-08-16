import React,{Component} from 'react';
import Navigation from './Navigation';
import Layout from './Layout';
import '../Style/Company.css';

class Company extends Component{
    render(){
        return(
            <div className ="Company">
                <Navigation/>
                 <h1 id="title1">Charts</h1>
                <Layout/>
            </div>
        )
    }
}

export default Company;
