import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import MobileFliter from './components/mobileFliter'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-theme.min.css';
import {Container,Button} from 'react-bootstrap';



class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      pathname: "",
      data:[],
      email:"",
      password:"",
    };
    this.handleClick=this.handleClick.bind(this);
    this.handleTest=this.handleTest.bind(this);
  }

  handleClick(e){
    const url='/home/'+'1';
    console.log(url);
    this.setState({id:url});
    const location = {
      pathname: url,
      state: { id: "1" }
    }
    
    this.props.history.push(location);
  }


  handleTest() {
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
        if (json.data["success"]) {
        console.log("Login Successful!");
      }})
      .catch(e => console.log('錯誤:', e));
  }

  render() {
    const major1=["物理系","化學系"];
    const major2=["生科系","生技系"];
    const depart=[["理學院",[]],["生科院"],[]];
    //const test=[["學系",depart],["id",[]]];
    const test=[
      {
        id:0,
        name: "全部學院",
        now:-1,
        option:[["全部學院",-1],["理學院",1],["生科院",2],["工學院",3]]
      },
      {
        id:1,
        now:-1,
        name: "全部學系",
        option:[["全部學系",-1],["物理系",-1],["化學系",-1]]
      },
      {
        id:2,
        now:-1,
        name: "全部學系",
        option:[["全部學系",-1],["生科系",-1],["生技系",-1]]
      },
      {
        id:3,
        now:-1,
        name: "全部學系",
        option:[["全部學系",-1],["機械系",-1],["化工系",-1],["材料系",-1],["資源系",-1],["土木系",-1],["水利系",-1],["工科系",-1],["系統系",-1],["航太系",-1],["環工系",-1],["測量系",-1],["醫工系",-1],["能源學程",-1]]
      }
    ];
    const test2= [{
      id:0,
      now:-1,
      name: "順序",
      option:[["由大而小",-1],["由小而大",-1]]
    }];

    const btn=()=>{
      var output=[];
      for(var i=0;i<20;++i)
        output.push(
          <Button variant="dark" style={{margin: "5px 10px"}}> 測試 {i} </Button>
        );
      return output;
    }
    return (
      <div className="App">
        <MobileFliter type="依學院/系" value={test} style={{width:'62%',backgroundColor:"rgb(229,68,109)",color:"white",lineHeight:"8vw"}}/>
        <MobileFliter type="依編號" value={test2} style={{position:"absolute",top:"0",left:"60%",width:'40%',backgroundColor:"rgb(229,68,109)",color:"white",lineHeight:"8vw"}}/>
        <Container style={{position:"absolute",top:"20%",left:"30%",width:'20%',backgroundColor:"rgb(229,68,109)",color:"white",height:"auto"}}>
          {btn()}
          
        </Container>
        <input placeholder="email" onChange={(e)=>this.setState({email: e.target.value})}/>
        <input placeholder="password" onChange={(e)=>this.setState({password: e.target.value})}/>
        <button onClick={this.handleTest}>按我啊</button>
        <div>{this.state.data}</div>
      </div>
    );
  }
}

export default home;
