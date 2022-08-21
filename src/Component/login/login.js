import React,{Component} from 'react';
import Header from '../../header'
const url = "https://user-loginapp.herokuapp.com/api/auth/login";

class Login extends Component {

    constructor(props){
        super(props)

        this.state={
            email:'a@a.com',
            password:'123',
            message:''
        }
    }

    handleChange =(event)=>{
        this.setState({[event.target.name]:event.target.value})
    }

    handleSubmit = () => {
        fetch(url,{
            method:'POST',
            headers:{
                'accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(this.state)
        })
        .then((res) => res.json())
        .then((data) => {
            if(data.auth === false){
                this.setState({message:data.token})
            }else{
                sessionStorage.setItem('ltk',data.token)
                this.props.history.push('/')
            }
        })
    }

    render(){
        return(
            <>
                <Header/>
                <div className="container">
                    <hr/>
                    <div style={{marginTop: '7%', marginBottom: '150px'}}className="panel panel-danger">
                        <div className="panel-heading">
                            <h3>Login</h3>
                        </div>
                        <div className="panel-body">
                            <h3 style={{color:'red'}}>{this.state.message}</h3>
                            <div className="form-group col-md-6">
                                <label htmlFor="email">Email</label>
                                <input id="email" name="email" className="form-control"
                                value={this.state.email} onChange={this.handleChange}/>
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="fname">Password</label>
                                <input id="password" name="password" className="form-control"
                                value={this.state.password} onChange={this.handleChange}/>
                            </div>
                            <button className="btn btn-info" onClick={this.handleSubmit}>Login</button>
                        </div>
                    </div>
                </div>
            </>
            
        )
    }
}

export default Login;