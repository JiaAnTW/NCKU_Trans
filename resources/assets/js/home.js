import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-theme.min.css';
import Content from './content'


class home extends Component {
    constructor(props) {
    super(props)
    this.state = {users: [],open: false}
  }

  render() {
    const { open } = this.state;
    return (
      <div className="App">
        <div style={{width:"100vw",height:"100vw",maxWidth:"100%"}} id="test">
          <Content/>
        </div>
      </div>
    );
  }
}

export default home;
