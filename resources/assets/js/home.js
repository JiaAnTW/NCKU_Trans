import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-theme.min.css';
import './css/home.css'



class home extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }


  render() {
    return (
      <div className="App">
          <h1 className="webName">成大轉系生心得平台</h1>
          <span className="warning">本網站內統計數字為學生提供，僅供參考<br/>與實際狀況可能有出入</span>
          <button className="know" onClick={(e)=>location.href='/#/comment'}>我知道了</button>
      </div>
    );
  }
}

export default home;
