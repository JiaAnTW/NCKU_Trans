import React, { Component } from 'react';
import {Tab,Tabs} from 'react-bootstrap';
import './css/post.css';
import Icon from './components/icon';

const NCKU=
["中文系","外文系","台文系",
"數學系","物理系","化學系","地科系","光電系",
"機械系","化工系","材料系","資源系","土木系","水利系","工科系","系統系","航太系","環工系","測量系","醫工系","能源學程",
"工資系","交管系","企管系","統計系","會計系"
,"醫學系","醫技系","護理系","職治系","物治系","藥學系",
"政治系","經濟系","法律系","心理系",
"電機系","資訊系",
"建築系","都計系","工設系",
"生科系","生技系"];


class post extends Component {
    constructor(props) {
    super(props)
    this.state = {
        rank_1: "",
        rank_2: "",
        year: 107,
        score: 0,
        out_maj: "中文系",
        in_maj: "中文系",
        comment: "",
        question:"",
        answer:"",
        is_send: 1,
        editObject: "comment",
        start: false,
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleSendQA= this.handleSendQA.bind(this)
    this.changeRank = this.changeRank.bind(this)
    this.changeYear = this.changeYear.bind(this)
    this.changeOut = this.changeOut.bind(this)
    this.changeScore=this.changeScore.bind(this)
    this.changeIn = this.changeIn.bind(this)
    this.changeComment = this.changeComment.bind(this)
  }
  handleClick() {
    const data={
        'rank_1':this.state.rank_1,
        'rank_2':this.state.rank_2,
        'year':this.state.year,
        'score':this.state.score,
        'in_maj':this.state.in_maj,
        'out_maj':this.state.out_maj,
        'comment':this.state.comment,
    };
    this.setState({is_send:3})
    fetch(
      '/api/create/major', {method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
          })
        }
    )
      .then(res => res.json())
      .catch(e => console.log('錯誤:', e))
    this.setState({is_send:4})
  }

  handleSendQA(){
    const data={
      'question':this.state.question,
      'answer':this.state.answer,
  };
  this.setState({is_send:3})
  fetch(
    '/api/post/major_QA', {method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
          'Content-Type': 'application/json'
        })
      }
  )
    .then(res => res.json())
    .catch(e => console.log('錯誤:', e))
  this.setState({is_send:4})
}

    changeRank(e){
        this.setState({rank: e.target.value});
    }

    changeYear(e){
        this.setState({year: e.target.value});
    }

    changeScore(e){
      this.setState({score: e.target.value});
  }

    changeOut(e){
        this.setState({out_maj: e.target.value});
    }

    changeIn(e){
        this.setState({in_maj: e.target.value});
    }

    changeComment(e){
        this.setState({comment: e.target.value});
    }

  render() {
    const spawnYear=()=>{
      var output=[];
      var clock=new Date();
        for(var i=clock.getFullYear();i>2014;--i){
        if(i!=clock.getFullYear()||clock.getMonth()>7)
          output.push(
            <option value={i-1911}>{i-1911}</option>
          );
      }
      return(
        <select id="year" onChange={this.changeYear} style={{color:"black",textAlign:"center"}}>
          {output}
        </select>
      );
  }
    const maj_option=NCKU.map(department=>{return(
      <option value={department} style={{textAlign:"center"}}>{department}</option>
    );});


      const startContext=<div style={{height:"80%",display:(this.state.start===true)?"none":"block"}}><div className="start-context">
          <div className="type-box">
            <p><h1>心得</h1><div style={{width:"50%",marginBottom:"15px",height:"1px",backgroundColor:"white"}}></div><p>主要是針對個別科系分享平均分數以及修課等內容</p></p>
            <p><h1>常見問答</h1><div style={{width:"50%",marginBottom:"15px",height:"1px",backgroundColor:"white"}}></div><p>主要是解答轉系在行政、審查等流程和規則上的模糊點</p></p>
          </div>
          <span style={{width:"50%",marginTop:"30px"}}>感謝你願意為未來以轉系為目標的學弟妹們，留下一條更好走的路。</span>
          <button onClick={(e)=>this.setState({is_send:2})}>開始填寫</button>
          </div>
      </div>

      const QA_display=<div className="form_container" style={{color:"rgb(229,68,109)",boxShadow:"0 0px 12px rgba(0,0,0,.175)",width:"100%"}}>
      <div style={{padding:"7% 7%"}}>
        <p>
          Q: 
          <input id="rank" placeholder="簡單描述遇到的狀況" type="text" step="1" min="1" max="200" onChange={(e)=>this.setState({question:e.target.value})} style={{color:"black",width:"90%"}}/>
        </p>
        A:<br/>   
        <textarea id="comment" placeholder="簡單描述解決的方法" onChange={(e)=>this.setState({answer:e.target.value})} ></textarea>
        <button onClick={this.handleSendQA} style={{marginLeft: "10%",marginRight: "10%",width:"80%",borderRadius:"0",border:"0px solid rgb(229,68,109)",color:"white",backgroundColor:"rgb(229,68,109)"}}>送出</button>
        </div>
      </div>


    const display=<div className="form_container" style={{color:"rgb(229,68,109)",boxShadow:"0 0px 12px rgba(0,0,0,.175)",width:"100%"}}>
    <div style={{padding:"7% 7%"}}>
    <p>
      排名上:  
      <input id="rank" type="number" step="1" min="1" max="200" onChange={(e)=>this.setState({rank_1:e.target.value})} style={{color:"black"}}/>
      </p>
    <p>
      排名下:  
      <input id="rank" type="number" step="1" min="1" max="200" onChange={(e)=>this.setState({rank_2:e.target.value})} style={{color:"black"}}/>
    </p>
    <p >
     
    申請年度:{spawnYear()}
    </p>
    <p >
    <br/>    
    學年分數:<input id="score" type="number" step="0.1" min="1" max="200" onChange={this.changeScore}/>
    </p>
    <p>
    <br/>    
    轉出科系:
    <select id="out_maj"  onChange={this.changeOut} style={{color:"black"}}>
        {maj_option}
      </select>
    </p>
    <p >
    <br/>
    轉入科系:<select id="in_maj"  onChange={this.changeIn} style={{color:"black"}}>
        {maj_option}
      </select>    
    </p>
    心得:<br/>   
    <textarea id="comment" placeholder="" onChange={this.changeComment} ></textarea>
    <button onClick={this.handleClick} style={{marginLeft: "10%",marginRight: "10%",width:"80%",borderRadius:"0",border:"0px solid rgb(229,68,109)",color:"white",backgroundColor:"rgb(229,68,109)"}}>送出</button>
    </div>
    </div>
    ;

    const postStage=()=>{
      if(this.state.is_send==1){
        return startContext;
      }
      else if(this.state.is_send==2){
        return(<div className="input-container">
        <div className="btn-container">
          <button style={(this.state.editObject==="comment")?{backgroundColor:"white",color:"rgb(229,68,109)"}:{backgroundColor:"rgba(255,255,255,0.4)",color:"#555"}} onClick={()=>this.setState({editObject:"comment"})}>心得</button>
          <button style={(this.state.editObject==="QA")?{backgroundColor:"white",color:"rgb(229,68,109)"}:{backgroundColor:"rgba(255,255,255,0.4)",color:"#555"}} onClick={()=>this.setState({editObject:"QA"})}>常見問答</button>
        </div>
        {(this.state.editObject==="comment")?display:QA_display}
      </div>)
      }
      else if(this.state.is_send==3){
        return <Icon style={{ marginTop: "30vh" }} isWhite={true}/>;
      }
      else{
        return <h1 style={{color:"white",textAlign:"center",marginTop:"33vh",maxWidth:"70%",marginLeft:"0%"}}>感謝你的填寫<br/>審查通過後就會看到你的心得囉!</h1>;
      }
    }

    return (
      <div className="post">
        <div className="index">
          {postStage()}
        </div>
      </div>
    );
  }
}

export default post;
