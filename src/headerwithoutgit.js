import React, {Component} from 'react';
import './Header.css'
import {Link, withRouter} from 'react-router-dom'

const url = "https://user-loginapp.herokuapp.com/api/auth/userinfo";
class Header extends Component {

    constructor(){
        super();

        this.state={
            userData:''
        }
    }

    handleLogout = () => {
        sessionStorage.removeItem('userinfo');
        sessionStorage.setItem('loginStatus',false);
        sessionStorage.removeItem('ltk');
        this.props.history.push('/')
    }

    conditionalHeader = () => {
        
        if(sessionStorage.getItem('ltk')){
            let data = this.state.userData;
            let outArray = [data.name, data.email, data.phone, data.role];
            sessionStorage.setItem('userinfo',outArray);
            sessionStorage.setItem('loginStatus',true)
            return(
                <><nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-collapse collapse" id="zomatoNav">
                        <ul className="nav navbar-nav navbar-right">
                        <li><Link to="/" >
                            <span></span> Hi {data.name}
                        </Link></li> &nbsp;
                        {/* <li><button onClick={this.handleLogout} className="btn btn-danger">Logout</button></li> */}
                        </ul>
                    </div>
                    </div>
            </nav>
             
                </>
            )
        }else{
            return(
                <>
                   
                    <div className="navbar-collapse collapse" id="zomatoNav">
                        <ul className="nav navbar-nav">
                            <li><Link to="/" id="nav_a">Add a Restaurant</Link></li>
                        
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                        <li className="social1"> 
                            <Link to="/login" id="nav_a">  <span className="glyphicon glyphicon-log-in"></span> Login</Link></li>
                            <li className="social1" id="nav_a"><Link to="/register"> <span className="glyphicon glyphicon-user"></span>Sign Up</Link></li>
                            <li className="social2" id="nav_a"> <a href="https://github.com/login/oauth/authorize?client_id=8ce44d256625bdef6536">
                                <img src={"../public/images/github.png"}/> Login With Git
                                </a> </li>
                        </ul>
                    </div>
                </>
            )
        }
        
    }

    render(){
        return(
            <>
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    
                    {this.conditionalHeader()}
                </div>
            </nav>
             
            <div className="header">
           <Link to="/" className="name">FoodieBay </Link>
    
            
    
                        <div className="logo">
                            <span> F!</span>
                        </div>
                        <div className="Heading"> Find the Best Restaurants Near You !!</div>
                        </div>
            </>
        )
    }

    //getuser info after login 
    componentDidMount(){
        fetch(url,{
            method: 'GET',
            headers:{
                'x-access-token':sessionStorage.getItem('ltk')
            }
        })
        .then((res) =>  res.json())
        .then((data) => {
            this.setState({
                userData:data
            })
        })
    }
}

export default withRouter(Header)