import React, {Component} from 'react';
import './Header.css'
import {Link, withRouter} from 'react-router-dom'
const url = "https://user-loginapp.herokuapp.com/api/auth/userinfo";
class Header extends Component {

    constructor(){
        super();

        this.state={
            userData:'',
            userImg:'',
            userName:''
        }
    }

    handleLogout = () => {
        sessionStorage.removeItem('userinfo');
        sessionStorage.setItem('loginStatus',false);
        sessionStorage.removeItem('ltk');
        sessionStorage.removeItem('uName');
        sessionStorage.removeItem('uImg');
        this.setState({userData:''})
        this.props.history.push('/')
    }

    conditionalHeader = () => {
        if(this.state.userData.name ||  sessionStorage.getItem('uName') !== null){
            if(sessionStorage.getItem('uName') !== null){
                let name =  sessionStorage.getItem('uName');
                let image = sessionStorage.getItem('uImg');
                return(
                    <>
                      <ul className="nav navbar-nav navbar-right">  <div className="btnlogin">
                            <Link to="/" className="btn btn-success">
                                <span className="glyphicon glyphicon-user"></span>
                                 Hi <img src={image} style={{height:50,width:50}}/> {name}
                            </Link> &nbsp;
                            <button onClick={this.handleLogout} className="btn btn-danger">Logout</button>
                        </div>
                        </ul>
                    </>
                )
            }else{
                let data = this.state.userData;
                let outArray = [data.name, data.email, data.phone, data.role];
                sessionStorage.setItem('userinfo',outArray);
                sessionStorage.setItem('loginStatus',true)
                return(
                    <><nav style={{backgroundColor:'#dedcd3'}}className="navbar navbar-inverse">
                    <div className="container-fluid">
                    <ul className="nav navbar-nav navbar-right">
                    <Link to="/" className="btn btn-success">
                        <span className="glyphicon glyphicon-user"></span> Hi {data.name}
                    </Link> &nbsp;
                    <button onClick={this.handleLogout} className="btn btn-outline-danger">Logout</button>
                    </ul>
                    </div>
            </nav>
                    </>
                )
            }

        }else{
            return(
                <><nav style={{backgroundColor:'#dedcd3'}}className="navbar navbar-inverse">
                <div className="container-fluid">
                <div id="zomatoNav">
                <ul className="nav navbar-nav">
                            {/* <li><Link to="/" id="nav_a">Add a Restaurant</Link></li> */}
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                 
                            <li> 
                            <Link  to="/login" id="nav_a"><span className="glyphicon glyphicon-log-in"></span> Login</Link></li>
                            <li><Link to="/register" id="nav_a"> <span className="glyphicon glyphicon-user"></span>Sign Up</Link></li> 
                            <li>
                            <a  id="nav_a" href="https://github.com/login/oauth/authorize?     client_id=9176b4958929e2c28dd6">Login with &nbsp;  
                            <img src={"https://i.postimg.cc/wvRX512T/github.png"}/>
                            </a></li>
                        </ul>
                    </div>
                    </div>
            </nav>
                </>
            )
        }
        
    }

    render(){
        return(

           
                       <div id="">{this.conditionalHeader()}</div>
                     
        )
    }

    //getuser info after login 
    componentDidMount(){
        /* Login With GIT */
        if(this.props.location.search){
            if(this.props.location.search.split('=')[0] == '?code'){
                var code = this.props.location.search.split('=')[1]
            }

            if(code){
                let requestedData={
                    code:code
                }
                fetch(`http://localhost:9800/oauth`,{
                    method: 'POST',
                    headers:{
                        'Accept':'application/json',
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify(requestedData)
                })
                .then((res) => res.json())
                .then((data) => {
                    let username = data.name;
                    let img = data.avatar_url;
                    sessionStorage.setItem('uName',username)
                    sessionStorage.setItem('uImg',img);
                    sessionStorage.setItem('loinStatus',true)
                    this.setState({username:username,userImg:img})
                })
            }
        }
        /* Login With JWT */
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