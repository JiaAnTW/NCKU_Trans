import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-theme.min.css';
import {Container,Collapse,Button,ListGroup} from 'react-bootstrap';


class menu extends Component {
    constructor(props) {
    super(props)
    this.state = {open: false}
  }

//props must have: number,width


  render() {
    const { open } = this.state;
    return (
        <div style={{position:"relative", top:"0%", width: '100%' }}>
            <Button style={{ borderRadius:"0px",width: '80%',paddingLeft: '0%',outline:"none",height:"34px",padding:"0px 0px" }} variant="light">{this.props.title}</Button>
            <Button onClick={() => this.setState({ open: !open })} aria-controls={this.props.id} aria-expanded={open} style={{position: 'relative',left:'0',borderRadius:"0px",width: '20%',outline:"none",fontSize:"10px",height:"34px",padding:"0px 0px"}} variant="light">{open?"▲":"▼"}</Button>
                <Collapse in={this.state.open}>
                    <div style={{ width: '100%' }} id={this.props.id} > 
                        {this.props.children}
                    </div>
                </Collapse>
        </div>
    );
  }
}

export default menu;
