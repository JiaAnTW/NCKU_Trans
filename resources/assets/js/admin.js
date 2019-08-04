import React, { Component } from 'react';
import 'react-tagsinput/react-tagsinput.css'


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
    this.changeLocation=this.changeLocation.bind(this);
  }

  changeLocation(type,id){
    const location = {
      pathname: '/admin/'+type+"/"+id,
    }
    this.props.history.push(location);  
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
        /*const location = {
          pathname: '/admin/QA/-1',
        }
        this.props.history.push(location);*/  
        this.setState({is_login:true,token: json.data["remember_token"]})
        this.props.setToken(json.data["remember_token"])
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
        <div className="form_container" style={{position:"absolute",marginTop:"4%",width:"400px",color:"rgb(229,68,109)",boxShadow:"0 0px 12px rgba(0,0,0,.175)",maxWidth:"90%",borderTopLeftRadius:"5px",borderTopRightRadius:"5px",padding:"15rem 2rem",paddingTop:"4rem"}}>
          <h1 style={{width:"100%",textAlign:"center",color: "black", marginBottom:"7rem",fontWeight:"500"}}>管理員介面</h1>
            <p style={{width:"100%", marginLeft:"10%", marginTop:"5%"}}>
              Email:<br/>
            <input  id="year" onChange={(e)=>this.setState({email: e.target.value})} style={{width:"80%",borderBottom:"1px solid rgb(229,68,109)",backgroundColor:"transparent"}}/>
            </p>
            <p style={{width:"100%", marginLeft:"10%"}}>
              Password:<br/>
            <input  id="year"  onChange={(e)=>this.setState({password: e.target.value})} style={{width:"80%",borderBottom:"1px solid rgb(229,68,109)",backgroundColor:"transparent"}}/>
            </p>
            <button onClick={this.handleLogin} style={{margin: "5% 10%",width:"80%",borderRadius:"0",border:"0px solid rgb(229,68,109)",color:"white",backgroundColor:"rgb(229,68,109)",padding:"15px 0px"}}>登入</button>
            </div>
            </div>
        </div>
      );
    }
    return (
      <div className="admin">
        {loginForm()}  
      </div>
    );
  }
}

export default admin;
