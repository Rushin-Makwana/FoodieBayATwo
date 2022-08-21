import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './search.css';
import {withRouter} from 'react-router-dom';

const url = "https://foodiebay-backend.herokuapp.com/location";
const restUrl = "https://foodiebay-backend.herokuapp.com/restaurants"

class Search extends Component {

    constructor(props){
        super(props)

        this.state={
            location:'',
            restaurants:''
        }
    }

    renderCity = (data) => {
        if(data){
            return data.map((item) => {
                return(
                    <option value={item.state_id} key={item.state_id}>{item.state}</option>
                )
            })
        }
    }

    renderRest = (data) => {
        if(data){
            return data.map((item) => {
                return(
                    <option value={item.restaurant_id} key={item.restaurant_id}>{item.restaurant_name} | {item.address}</option>
                )
            })
        }
    }

    handleCity = (event) => {
        let stateId = event.target.value;
        console.log(stateId)
        fetch(`${restUrl}?stateId=${stateId}`,{method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({restaurants:data})
        })
    }

    handleRest = (event) => {
        const restId = event.target.value;
        this.props.history.push(`/details?restId=${restId}`)
    }


    render(){
        console.log(">>>search>>>",this.props)
        return(
            <>
               <div className="header">
                     <Link to="/" className="name">FoodieBay </Link>
     
                                {/* <nav className="navbar navbar-inverse"> */}
                 {/* <div className="container-fluid">
                     <div className="navbar-header">
                         <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#zomatoNav">
                             <span className="icon-bar"></span>
                             <span className="icon-bar"></span>
                             <span className="icon-bar"></span>
                         </button>
                         </div>
                     
                    </div> */}
                    {/* </nav> */}
     
             <div className="logo">
                 <span> F!</span>
             </div>
             <div className="Heading"> Find the Best Restaurants Near You !!</div>
             
                    <div className="dropdown">
                        <select onChange={this.handleCity}>
                            <option>----SELECT YOUR CITY-----</option>
                           {this.renderCity(this.state.location)}
                        </select>
                        <select className="restSelect" onChange={this.handleRest}>
                            <option>----SELECT YOUR Restaurants-----</option>
                            {this.renderRest(this.state.restaurants)}
                        </select>
                    </div>
                </div>
            </>
        )
    }

    // api calling on page load
    componentDidMount() {
        fetch(url,{method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({location:data})
        })
    }
}

export default withRouter(Search);