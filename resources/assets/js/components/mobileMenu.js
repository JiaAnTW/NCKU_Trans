import React, { Component } from 'react';
import './css/mobileMenu.css'
import {Collapse,ListGroup} from 'react-bootstrap';


class mobileMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    };
  }

  render() {
    const { open } = this.state;
    const ListStyleFirst={
        textAlign:"center",
        backgroundColor:"rgb(229,68,109)",
        color:"white",
        backgroundImage:"none",
        textShadow:"none",
        borderRadius: "0px",
        borderTop: "0px solid rgba(243,243,243,0.5)",
        borderBottom: "0.5px solid rgba(243,243,243,0.5)",
        borderLeft: "0px solid rgba(243,243,243,0.5)",
        borderRight: "0px solid rgba(243,243,243,0.5)",
      };
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
      <div className="menu_mobile">
        <button className="menuBtn" style={{outline: "none"}} onClick={() => this.setState({ open: !open })} aria-controls="menu_container" aria-expanded={open}>≡</button>
        <Collapse in={this.state.open}>
          <div className="menu_container" style={{backgroundColor:"rgb(229,68,109)",color:"white",position:"absolute",top:"54px",right:"0",width:"100vw",maxWidth:"100%"}}>
            <ListGroup defaultActiveKey="/#/" style={{border: "none",boxShadow:"none"}}>
              <ListGroup.Item action onClick={(e)=>this.setState({ open: !open })} href="/#/comment" className="list" style={ListStyleFirst}>瀏覽心得</ListGroup.Item>
              <ListGroup.Item action onClick={(e)=>this.setState({ open: !open })} href="/#/QA/~" className="list" style={ListStyle}>常見QA</ListGroup.Item>
              <ListGroup.Item action onClick={(e)=>this.setState({ open: !open })} href="/#/post" className="list" style={ListStyle}>分享心得</ListGroup.Item>
              <ListGroup.Item action onClick={(e)=>this.setState({ open: !open })} href="https://goo.gl/forms/6MkYePHd03P7Nv8w2" target="_blank" className="list" style={ListStyleLast}>聯絡我們</ListGroup.Item>
            </ListGroup>
          </div>
        </Collapse>
        
      </div>
    );
  }
}

export default mobileMenu;
