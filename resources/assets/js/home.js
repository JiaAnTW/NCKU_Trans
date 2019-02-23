import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-theme.min.css';

class home extends Component {
    constructor(props) {
    super(props)
    this.state = {users: []}
    this.handleClick = this.handleClick.bind(this)
    this.printData = this.printData.bind(this)
  }
  handleClick() {
    fetch(
      '/api/getAll'
    )
      .then(res => res.json())
      .then(data => {
        this.setState({users: data})
      })
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
    return (
      <div className="App">
      hey
        {this.printData()}
        <button onClick={this.handleClick}>我在比較上面啦</button>
      </div>
    );
  }
}

export default home;
