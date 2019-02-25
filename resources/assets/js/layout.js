import React, { Component } from 'react';
import {Button,ButtonGroup,Dropdown} from 'react-bootstrap';
import Comment from './comment';
import Menu from './menu';
import './css/layout.css';
class layout extends Component {
    constructor(props) {
    super(props);
    this.state = {
        is_fetch:false,
        users: []
    };
    this.handleClick = this.handleClick.bind(this);
    this.sponCommentMenu= this.sponCommentMenu.bind(this);
  }


  handleClick() {
    fetch(
      '/api/getAll'
    )
      .then(res => res.json())
      .then(data => {
        this.setState({
            users: data,
            is_fetch:true})
      })
      .catch(e => console.log('錯誤:', e));
  }

  sponCommentMenu(){
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
    const department=[
      ["文學院","LIB"],
      ["理學院","SCE"],
      ["工學院","ENG"],
      ["管理學院","MAN"],
      ["醫學院","MC"],
      ["社會科學院","SOC"],
      ["電資學院","EECS"],
      ["規設院","CPD"],
      ["生科院","BIO"]
    ];
    var output=[];
    for(var i=0;i<department.length;++i){
      let singleOutput=[];
      for(var j=0;j<NCKU[department[i][1]].length;++j)
        singleOutput.push(
            <Button variant="light" style={{ borderRadius:"0px",width: '100%',outline:"none" }}>{NCKU[department[i][1]][j]}</Button>
        );
      output.push(
          <Menu id={department[i][1]} title={department[i][0]}>
          {singleOutput}
          </Menu>
      );
    }
    return output;
  }

  componentDidMount(){
    this.handleClick();
  }

  render() {
    return (
      <div className="layout">
        <nav><a>聯絡我們</a><a href="/#/post">分享心得</a><a>常見QA</a><a href="/#/comment">瀏覽心得</a></nav>
          <div className="Menu" style={{}}>
              <div style={{position:"relative", top:"0%", width: '100%' }}>
                <Button variant="light" style={{ borderRadius:"0px",width: '100%',outline:"none" }}>不分系</Button>
              </div>
              {this.sponCommentMenu()}
          </div>
        <div className="index">
            <Comment datas={this.state.users} is_fetch={this.state.is_fetch}/>
        </div>
      </div>
    );
  }
}

export default layout;