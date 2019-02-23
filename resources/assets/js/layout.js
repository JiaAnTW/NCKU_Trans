import React, { Component } from 'react';
import {Button,ButtonGroup,Dropdown} from 'react-bootstrap';
import Comment from './comment';
import './css/layout.css';
class layout extends Component {
    constructor(props) {
    super(props);
    this.state = {
        is_fetch:false,
        users: []
    };
    this.handleClick = this.handleClick.bind(this);
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

  componentDidMount(){
    this.handleClick();
  }

  render() {
    return (
      <div className="layout">
        <nav><a>聯絡我們</a><a>分享心得</a><a>常見QA</a><a>瀏覽心得</a></nav>
        <div className="Menu">
            <Dropdown.Menu show>
                <Dropdown.Item>文學院</Dropdown.Item>
                <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
                <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
                <Dropdown as={ButtonGroup}>
                    <Button variant="light" className="Split_btn">Split Button</Button>
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
            <Comment datas={this.state.users} is_fetch={this.state.is_fetch}/>
        </div>
      </div>
    );
  }
}

export default layout;