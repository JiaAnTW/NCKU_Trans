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
        <div className="post">
        <div className="index">
        <h1 style={{width:"100%",textAlign:"center",color: "white", marginTop:"7rem"}}>管理員介面</h1>
        <div className="form_container" style={{position:"absolute",color:"rgb(229,68,109)",boxShadow:"0 0px 12px rgba(0,0,0,.175)",maxWidth:"90%"}}>
            <p style={{width:"100%", marginLeft:"20%", marginTop:"5%"}}>
            <input placeholder="email" id="year" onChange={(e)=>this.setState({email: e.target.value})}/>
            </p>
            <p style={{width:"100%", marginLeft:"20%"}}>
            <input placeholder="password" id="year"  onChange={(e)=>this.setState({password: e.target.value})}/>
            </p>
            <button onClick={this.handleLogin} style={{margin: "5% 10%",width:"80%",borderRadius:"0",border:"0px solid rgb(229,68,109)",color:"white",backgroundColor:"rgb(229,68,109)"}}>登入</button>
            </div>
            </div>
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
