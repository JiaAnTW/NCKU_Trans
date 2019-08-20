import React, { Component } from 'react';
import './css/post.css';
import Icon from './components/icon';
import Man from "./img/man.png";
import Question from "./img/question.png";
import { getCollege, getDepartment} from "./components/http";


class post extends Component {
    constructor(props) {
    super(props)
    this.state = {
        rank_1: "",
        rank_2: "",
        year: 107,
        score: 0,
        NCKU:[],
        secondNCKU:[],
        out_maj: "中文系",
        in_maj: "中文系",
        comment: "",
        question:"",
        answer:"",
        is_send: 1,//1 is index, 2~4 is comment , 5~6 is QA ,7 is loading
        is_fetch:false,
        editObject: "comment",
        start: false,
    }
    this.getData=this.getData.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleSendQA= this.handleSendQA.bind(this)
    this.changeRank = this.changeRank.bind(this)
    this.changeYear = this.changeYear.bind(this)
    this.changeOut = this.changeOut.bind(this)
    this.changeScore=this.changeScore.bind(this)
    this.changeIn = this.changeIn.bind(this)
    this.changeComment = this.changeComment.bind(this)
  }

  getData(){
    const getPromise=new Promise(resolve=>{
      getDepartment.then(data=>{
        var NCKU;
        NCKU=data.map(Element=>{
          return Element.name;
        })
        this.setState({NCKU:NCKU})
        var secondNCKU;
        getCollege.then(dataTwo=>{
            secondNCKU=[];
            NCKU.forEach(Element=>{
              secondNCKU.push(Element)
            })
            dataTwo.forEach(Element=>{
              secondNCKU.push(Element.name);
            })
            this.setState({secondNCKU:secondNCKU})
            resolve();
          }
        )
      })
    })
    return getPromise;
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
    this.setState({is_send:4})
    fetch(
      '/api/create/major', {method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
          })
        }
    )
      .then(res => res.json())
      .then(data=>{
        this.setState({is_send:5})
      })
      .catch(e => {
        console.log('錯誤:', e)
        this.setState({is_send:5})
      })
    
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
    .then(data=>{
      this.setState({is_send:4})
    })
    .catch(e => {
      console.log('錯誤:', e)
    this.setState({is_send:4})
  })
  
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

  componentDidMount(){
    this.getData().then(data=>{
      this.setState({is_fetch:true})
    })
  }

  render() {
    const spawnYear=()=>{
      var output=[];
      var clock=new Date();
        for(var i=clock.getFullYear();i>2014;--i){
        if(i!=clock.getFullYear()||clock.getMonth()+1>7)
          output.push(
            <option value={i-1911}>{i-1911}</option>
          );
      }
      return(
        <select id="year" onChange={this.changeYear} style={{textAlign:"center"}}>
          {output}
        </select>
      );
  }
    const maj_option=(this.state.is_fetch)?this.state.NCKU.map(department=>{return(
      <option value={department} style={{textAlign:"center"}}>{department}</option>
    );}):<option style={{textAlign:"center"}}></option>;

    const maj_option2=(this.state.is_fetch)?this.state.secondNCKU.map(department=>{return(
      <option value={department} style={{textAlign:"center"}}>{department}</option>
    );}):<option style={{textAlign:"center"}}></option>;

      const startContext=<div style={{height:"80%",display:(this.state.start===true)?"none":"block"}}><div className="start-context">
          <div className="type-box">
            <div className="card-box"><div className="header-box"><img src={Man} alt="man"/><h1 style={{fontWeight:"500"}}>心得</h1></div><p>主要是針對個別科系分享平均分數以及修課等內容<button onClick={(e)=>this.setState({is_send:2,editObject:"comment"})}>開始填寫</button></p></div>
            <div className="card-box"><div className="header-box"><img src={Question} alt="Question"/><h1 style={{fontWeight:"500"}}>常見問答</h1></div><p>主要是解答轉系在行政、審查等流程和規則上的模糊點<button onClick={(e)=>this.setState({is_send:2,editObject:"QA"})}>開始填寫</button></p></div>
          </div>
          </div>
      </div>

      const QA_display=()=>{
      if(this.state.is_send===2){
        return(
      <div className="form_container" style={{color:"rgb(229,68,109)",boxShadow:"0 0px 12px rgba(0,0,0,.175)",width:"100%"}}>
      <div style={{padding:"7% 7%"}}>
        <p>
          Q: 
          <input id="rank" placeholder="簡單描述遇到的狀況" type="text" step="1" min="1" max="200" onChange={(e)=>this.setState({question:e.target.value})} style={{width:"90%",padding:"10px"}}/>
        </p>
        A:<br/>   
        <textarea id="comment" placeholder="簡單描述解決的方法" onChange={(e)=>this.setState({answer:e.target.value})} ></textarea>
        <div className="send-box">
            <button onClick={()=>{this.setState({is_send:1})}} style={{padding:"5px 5px",marginRight: "4%",width:"30%",borderRadius:"4px",border:"0px solid rgb(229,68,109)",color:"black",backgroundColor:"lightgray"}}>返回</button>
            <button onClick={()=>{this.handleSendQA;this.setState({is_send:3})}} style={{marginRight:"20px",padding:"5px 5px",width:"30%",borderRadius:"4px",border:"0px solid rgb(229,68,109)",color:"white",backgroundColor:"rgb(229,68,109)"}}>送出</button>
          </div>
        </div>
      </div>);
        }
        else if(this.state.is_send===3){
          return(
          <div className="form_container" style={{color:"rgb(229,68,109)",boxShadow:"0 0px 12px rgba(0,0,0,.175)",width:"100%"}}>
            <Icon style={{ marginTop: "15vh" }} isWhite={false}/>
          </div> 
          )         
        }
        else{
          return(
          <div className="form_container" style={{color:"rgb(229,68,109)",boxShadow:"0 0px 12px rgba(0,0,0,.175)",width:"100%"}}>
            <h1 style={{color:"rgb(229,68,109)",textAlign:"center",marginTop:"15vh",maxWidth:"70%",marginLeft:"15%"}}>感謝你的填寫<br/>審查通過後就會看到你的分享囉!</h1>
            <div className="send-box">
                <button onClick={()=>{this.setState({is_send:1,editObject:""})}} style={{marginRight:"35%",padding:"5px 5px",width:"30%",borderRadius:"4px",border:"0px solid rgb(229,68,109)",color:"white",backgroundColor:"rgb(229,68,109)"}}>返回</button>
              </div>
          </div>
          )        
        }
      }

    const display=()=>{
    if(this.state.is_send===2 && this.state.is_fetch===true){
      return(
        <div className="form_container" style={{color:"rgb(229,68,109)",boxShadow:"0 0px 12px rgba(0,0,0,.175)",width:"100%"}}>
        <div style={{padding:"7% 7%"}}>
        <p>排名上:<input id="rank" type="number" step="1" min="1" max="200" onChange={(e)=>this.setState({rank_1:e.target.value})} /></p>
        <p>排名下: <input id="rank" type="number" step="1" min="1" max="200" onChange={(e)=>this.setState({rank_2:e.target.value})} /></p>
        <p>申請年度:{spawnYear()}</p>
        <p>學年分數:<input id="score" type="number" step="0.1" min="1" max="200" onChange={this.changeScore}/></p>
        <p><br/>轉出科系:
        <select id="out_maj"  onChange={this.changeOut}>
            {maj_option2}
          </select>
        </p>
        <p ><br/>轉入科系:<select id="in_maj"  onChange={this.changeIn}>
            {maj_option}
          </select>    
        </p>
        <div className="send-box">
          <button onClick={()=>{this.setState({is_send:1})}} style={{padding:"5px 5px",marginRight: "4%",width:"30%",borderRadius:"4px",border:"0px solid rgb(229,68,109)",color:"black",backgroundColor:"lightgray"}}>返回</button>
          <button onClick={()=>{this.setState({is_send:3})}} style={{marginRight:"20px",padding:"5px 5px",width:"30%",borderRadius:"4px",border:"0px solid rgb(229,68,109)",color:"white",backgroundColor:"rgb(229,68,109)"}}>下一步</button>
        </div>
        </div>
        </div>
      )
    }
    else if(this.state.is_send===3){
      return(
        <div className="form_container" style={{color:"rgb(229,68,109)",boxShadow:"0 0px 12px rgba(0,0,0,.175)",width:"100%"}}>
          <div style={{padding:"7% 7%"}}>
            心得:<br/>   
          <textarea id="comment" placeholder="" onChange={this.changeComment} ></textarea>
          <div className="send-box">
            <button onClick={()=>{this.setState({is_send:2})}} style={{padding:"5px 5px",marginRight: "4%",width:"30%",borderRadius:"4px",border:"0px solid rgb(229,68,109)",color:"black",backgroundColor:"lightgray"}}>上一步</button>
            <button onClick={()=>{this.handleClick();this.setState({is_send:4})}} style={{marginRight:"20px",padding:"5px 5px",width:"30%",borderRadius:"4px",border:"0px solid rgb(229,68,109)",color:"white",backgroundColor:"rgb(229,68,109)"}}>送出</button>
          </div>
        </div>
      </div>        
      )
    }
    else if(this.state.is_send===4){
      return(
      <div className="form_container" style={{color:"rgb(229,68,109)",boxShadow:"0 0px 12px rgba(0,0,0,.175)",width:"100%"}}>
        <Icon style={{ marginTop: "15vh" }} isWhite={false}/>
      </div> 
      )         
    }
    else{
      return(
      <div className="form_container" style={{color:"rgb(229,68,109)",boxShadow:"0 0px 12px rgba(0,0,0,.175)",width:"100%"}}>
        <h1 style={{color:"rgb(229,68,109)",textAlign:"center",marginTop:"15vh",maxWidth:"70%",marginLeft:"15%"}}>感謝你的填寫<br/>審查通過後就會看到你的心得囉!</h1>
        <div className="send-box">
            <button onClick={()=>{this.setState({is_send:1,editObject:""})}} style={{marginRight:"35%",padding:"5px 5px",width:"30%",borderRadius:"4px",border:"0px solid rgb(229,68,109)",color:"white",backgroundColor:"rgb(229,68,109)"}}>返回</button>
          </div>
      </div>
      )        
    }
}

    const postStage=()=>{
      if(this.state.is_send==1){
        return startContext;
      }
      else if(this.state.is_send>1 && this.state.editObject==="comment"){
        const notHereStyle={border:"3px solid white",color:"white"};
        const hereStyle={border:"3px solid rgba(0,0,0,0.2)",color:"rgba(0,0,0,0.2)"};
        return(<div className="input-container">
        <div className="btn-container" style={{position:"relative",backgroundColor:"rgb(229,68,109)",padding:"20px 0px"}}>
          <div className="step-container">
            <div className="step-box" >
              <div className="step" style={(this.state.is_send>1)?notHereStyle:hereStyle}>1</div>
              <div className="remark" style={{marginTop:"5px",color:(this.state.is_send<2)?"rgba(0,0,0,0.2)":"white"}}>寫個基本資料</div></div>
            <div style={{position:"absolute",height:"5px",backgroundColor:(this.state.is_send<3)?"rgba(0,0,0,0.2)":"white",width:"27%",marginTop:"12px",marginLeft:"-16.6%"}}></div>
            <div className="step-box" >
              <div className="step" style={(this.state.is_send>2)?notHereStyle:hereStyle}>2</div>
              <div className="remark" style={{marginTop:"5px",color:(this.state.is_send<3)?"rgba(0,0,0,0.2)":"white"}}>填寫心得本文</div></div>
            <div style={{position:"absolute",height:"5px",backgroundColor:(this.state.is_send<4)?"rgba(0,0,0,0.2)":"white",width:"27%",marginTop:"12px",marginLeft:"16.6%"}}></div>
            <div className="step-box" >
              <div className="step" style={(this.state.is_send===5)?notHereStyle:hereStyle}>3</div>
              <div className="remark" style={{marginTop:"5px",color:(this.state.is_send!=5)?"rgba(0,0,0,0.2)":"white"}}>等待送出成功</div></div>
          </div>
        </div>
        {display()}
      </div>)
      }
      else if(this.state.is_send>1){
        const notHereStyle={border:"3px solid white",color:"white"};
        const hereStyle={border:"3px solid rgba(0,0,0,0.2)",color:"rgba(0,0,0,0.2)"};
        return(<div className="input-container">
        <div className="btn-container" style={{position:"relative",backgroundColor:"rgb(229,68,109)",padding:"20px 0px"}}>
          <div className="step-container">
            <div className="step-box" >
              <div className="step" style={(this.state.is_send>1)?notHereStyle:hereStyle}>1</div>
              <div className="remark" style={{marginTop:"5px",color:(this.state.is_send<2)?"rgba(0,0,0,0.2)":"white"}}>填寫問題和答案</div></div>
            <div style={{position:"absolute",height:"5px",backgroundColor:(this.state.is_send<3)?"rgba(0,0,0,0.2)":"white",width:"43%",marginTop:"12px",marginLeft:"0%"}}></div>
            <div className="step-box" >
              <div className="step" style={(this.state.is_send>3)?notHereStyle:hereStyle}>2</div>
              <div className="remark" style={{marginTop:"5px",color:(this.state.is_send<4)?"rgba(0,0,0,0.2)":"white"}}>等待送出成功</div></div>
          </div>
        </div>
        {QA_display()}
        </div>  )      
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
