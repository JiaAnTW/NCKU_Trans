import React, { Component } from 'react';
import {Button,ButtonGroup,Dropdown} from 'react-bootstrap';
import './css/post.css';
import Icon from './icon';

const NCKU=
{
"LIB":["中文系","外文系","台文系"],
"SCE":["數學系","物理系","化學系","地科系","光電系"],
"ENG":["機械系","化工系","材料系","資源系","土木系","水利系","工科系","系統系","航太系","環工系","測量系","醫工系","能源學程"],
"MAN":["工資系","交管系","企管系","統計系","會計系"],
"MC":["醫學系","醫技系","護理系","職治系","物治系","藥學系"],
"SOC":["政治系","經濟系","法律系","心理系"],
"EECS":["電機系","資訊系"],
"CPD":["建築系","都計系","工設系"],
"BIO":["生科系","生技系"]
};


class post extends Component {
    constructor(props) {
    super(props)
    this.state = {
        type: "轉系",
        year: "",
        out_maj: "",
        in_maj: "",
        comment: ""
    }
    this.handleClick = this.handleClick.bind(this)
    this.changeType = this.changeType.bind(this)
    this.changeYear = this.changeYear.bind(this)
    this.changeOut = this.changeOut.bind(this)
    this.changeIn = this.changeIn.bind(this)
    this.changeComment = this.changeComment.bind(this)
  }
  handleClick() {
    const data={
        'trans_type':this.state.type,
        'year':this.state.year,
        'in_maj':this.state.in_maj,
        'out_maj':this.state.out_maj,
        'comment':this.state.comment,
    };
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
  }


    changeType(e){
        this.setState({type: e.target.value});
    }

    changeYear(e){
        this.setState({year: e.target.value});
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
    return (
      <div className="post">
                <nav><a>聯絡我們</a><a href="/#/post">分享心得</a><a>常見QA</a><a href="/#/comment">瀏覽心得</a></nav>
        <div className="index">
            <div className="form_container" style={{boxShadow:"0 0px 12px rgba(0,0,0,.175)",width:"500px",height:"500px",maxWidth:"90%"}}>
            <div style={{position:"absolute",margin: "3% 10%",color:"rgb(229,68,109)"}}>
            <h1 style={{}}>分享你的心得吧!</h1>
            <p style={{marginLeft: "5%",marginRight: "5%"}}>
              轉系/轉學:<br/>
              <select id="trans_type" name ="trans_type" onChange={this.changeType} style={{color:"black"}}>
  	            <option value="轉系">轉系</option>
                <option value="轉學">轉學</option>
              </select>
            </p>
            <p style={{marginLeft: "5%",marginRight: "5%"}}>
            <br/>    
            <input id="year" type="text" placeholder="申請年度:" onChange={this.changeYear}/>
            </p>
            <p style={{marginLeft: "5%",marginRight: "5%"}}>
            <br/>    
            <input id="out_maj" placeholder="轉出科系:" type="text" onChange={this.changeOut} />
            </p>
            <p style={{marginLeft: "5%",marginRight: "5%"}}>
            <br/>    
            <input id="in_maj" type="text" placeholder="轉入科系:" onChange={this.changeIn} />
            </p>
            <p style={{marginLeft: "5%",marginRight: "5%"}}> 
            <br/> 
            <textarea id="comment" placeholder="心得:" onChange={this.changeComment} ></textarea>
            </p>
            <button onClick={this.handleClick} style={{marginLeft: "10%",marginRight: "10%",width:"80%",borderRadius:"0",border:"0px solid rgb(229,68,109)",color:"white",backgroundColor:"rgb(229,68,109)"}}>送出</button>
            </div>
            </div>
        </div>
      </div>
    );
  }
}

export default post;
