import React, { Component } from 'react';
import TagsInput from 'react-tagsinput'
import Edit from './edit';
import 'react-tagsinput/react-tagsinput.css'
import {Button,ButtonGroup,Dropdown} from 'react-bootstrap';
import { hostname } from 'os';

class admin extends Component {
    constructor(props) {
    super(props)
    this.state = {
        email:"",
        password:"",
        token:"",
        is_login: false,
        data:"",
    }
    this.handleLogin=this.handleLogin.bind(this);
    this.handleGet=this.handleGet.bind(this);
    this.handleLogout=this.handleLogout.bind(this);
  }

  handleLogin() {
    const user={"email":this.state.email,"password":this.state.password};
    fetch(
      '/api/post/user/login', {method: 'POST',
        body: JSON.stringify(user),
        headers: new Headers({
            'Content-Type': 'application/json'
          })
        }
    )
      .then(res => res.json())
      .then(json =>{  
        if (json["success"]) {
        console.log("Login Successful!");
        this.setState({is_login:true,token: json.data["remember_token"]})
      }})
      .catch(e => console.log('錯誤:', e));
  }

  handleGet() {
    fetch(
      '/api/get/users/list', {method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization':"Bearer "+this.state.token,
          })
        }
    )
      .then(res => res.json())
      .then(json =>{  
        if (json["success"]) {
        console.log("Login Successful!");
        console.log(json);
      }})
      .catch(e => console.log('錯誤:', e));
  }

  handleLogout(){
    fetch(
        '/post/user/logout', {method: 'POST',
          headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization':"Bearer "+this.state.token,
            })
          }
      )
        .then(res => res.json())
        .then(json =>{  
          if (json["success"]) {
          console.log("Logout Successful!");
          console.log(json);
        }})
        .catch(e => console.log('錯誤:', e));
  }

  render() {
      const loginForm=()=>{
          return(
        <div style={{position:"absolute",width:"80%",margin:"20% 10%"}}>
            <input placeholder="email" onChange={(e)=>this.setState({email: e.target.value})}/>
            <input placeholder="password" onChange={(e)=>this.setState({password: e.target.value})}/>
            <button onClick={this.handleLogin}>按我啊</button>
        </div>
      );
    }
    return (
      <div className="admin">
        {(this.state.is_login===false)?loginForm():<Edit token={this.state.token}/>}
      </div>
    );
  }
}

export default admin;
