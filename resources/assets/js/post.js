import React, { Component } from 'react';
import {Button,ButtonGroup,Dropdown} from 'react-bootstrap';
import './css/layout.css';
import Icon from './icon';

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
      '/api/create', {method: 'POST',
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
        <div className="Menu">
            <Dropdown.Menu show>
                <Dropdown.Item>文學院</Dropdown.Item>
                <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
                <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
                <Dropdown as={ButtonGroup}>
                    <Button variant="light" className="Split_btn" style={{ borderRadius: '0rem',width: '85%' }}>Split Button</Button>
                    <Dropdown.Toggle  split variant="light" id="dropdown-split-basic"/>
                    <Dropdown.Menu alignRight >
                        <Dropdown.Item hred="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item hred="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item hred="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Dropdown.Menu>
        </div>
        <div className="index">
        轉系/轉學: 
            <select id="trans_type" name ="trans_type" onChange={this.changeType}>
  	            <option value="轉系">轉系</option>
                <option value="轉學">轉學</option>
            </select>
            <br/> 
            申請年度:   
            <input id="year" type="text" onChange={this.changeYear}/>
            <br/>
            轉出科系:   
            <input id="out_maj"  type="text" onChange={this.changeOut}/>
            <br/>
            轉入科系:   
            <input id="in_maj" type="text" onChange={this.changeIn}/>
            <br/>
            心得:
            <textarea id="comment" onChange={this.changeComment}></textarea>
            <br/>
            <button onClick={this.handleClick}>送出</button>
        </div>
        <Icon style={{ position: 'absolute',margin: "50% 50%" }}/>
      </div>
    );
  }
}

export default post;
