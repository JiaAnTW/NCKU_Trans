import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-theme.min.css';
import './css/home.css'
import {Collapse,ListGroup} from 'react-bootstrap';


class home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    };
  }


  render() {
    const { open } = this.state;
    const ListStyle={
      textAlign:"center",
      backgroundColor:"rgb(229,68,109)",
      color:"white",
      backgroundImage:"none",
      textShadow:"none",
      borderRadius: "0px",
      borderTop: "0.5px solid rgba(243,243,243,0.5)",
      borderBottom: "0.5px solid rgba(243,243,243,0.5)",
      borderLeft: "0px solid rgba(243,243,243,0.5)",
      borderRight: "0px solid rgba(243,243,243,0.5)",
    };
    const ListStyleLast={
      textAlign:"center",
      backgroundColor:"rgb(229,68,109)",
      color:"white",
      backgroundImage:"none",
      textShadow:"none",
      borderRadius: "0px",
      borderTop: "0.5px solid rgba(243,243,243,0.5)",
      borderBottom: "0px solid rgba(243,243,243,0.5)",
      borderLeft: "0px solid rgba(243,243,243,0.5)",
      borderRight: "0px solid rgba(243,243,243,0.5)",
    };
    return (
      <div className="App">
        <button className="menu_btn" style={{position:"absolute",top:"0",right:"0",height:"50px",width:"50px",backgroundColor:"rgb(229,68,109)",color:"white",outline:"none",border:"2px solid white",borderRadius:"10px"}} onClick={() => this.setState({ open: !open })} aria-controls="menu_container" aria-expanded={open}>≡</button>
        <Collapse in={this.state.open}>
          <div className="menu_container" style={{backgroundColor:"rgb(229,68,109)",color:"white",position:"absolute",top:"50px",right:"0",width:"100vw",maxWidth:"100%"}}>
            <ListGroup defaultActiveKey="#link1" style={{border: "none",boxShadow:"none"}}>
              <ListGroup.Item action href="#link1" className="list" style={ListStyle}>瀏覽心得</ListGroup.Item>
              <ListGroup.Item action href="#link2" className="list" style={ListStyle}>常見QA</ListGroup.Item>
              <ListGroup.Item action href="#link2" className="list" style={ListStyle}>分享心得</ListGroup.Item>
              <ListGroup.Item action href="#link2" className="list" style={ListStyleLast}>聯絡我們</ListGroup.Item>
            </ListGroup>
          </div>
        </Collapse>
        
      </div>
    );
  }
}

export default home;
