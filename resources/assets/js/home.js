import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-theme.min.css';
import {Container,Collapse,Button,ListGroup} from 'react-bootstrap';
import Icon from './icon';


class home extends Component {
    constructor(props) {
    super(props)
    this.state = {users: [],open: false}
    this.handleClick = this.handleClick.bind(this)
    this.printData = this.printData.bind(this)
  }
  handleClick() {
    var id=3;
    const url='/api/post/'+id.toString();
    fetch(
      url, {method: 'DELETE',
        }
    )
      .then(res => res.json())
      .catch(e => console.log('錯誤:', e))
  }

  printData(){
    const list= this.state.users.map(person=>{

        return (<li>
            轉系/轉學: {person["轉系/轉學"]}<br/>
            申請年度: {person["申請年度"]}<br/>
            轉出系所: {person["轉出系所"]}<br/>
            轉入系所: {person["轉入系所"]}<br/>
            心得: {person["心得"]}<br/>
        </li>)
    });
    return <ul>{list}</ul>;

  }

  render() {
    const { open } = this.state;
    return (
      <div className="App">
        <button onClick={this.handleClick}>測試刪除</button>
 
      </div>
    );
  }
}

export default home;
