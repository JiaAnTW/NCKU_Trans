import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-theme.min.css';
import {Container,Collapse,Button,Badge} from 'react-bootstrap';
import { throws } from 'assert';


class menu extends Component {
    constructor(props) {
    super(props)
    this.state = {open: false}
    this.onClickHandle=this.onClickHandle.bind(this);
  }

//props must have: number,width

onClickHandle(value){
  this.props.onClick(value,"department");
}


  render() {
    const { open } = this.state;
    return (
        <div style={{position:"relative", top:"0%", width: '100%' }}>
            <Button type="button" style={{borderRadius:"0px",width: '70%',paddingLeft: '0%',outline:"none",height:"34px",padding:"0px 0px" }} variant="light" onClick={this.onClickHandle.bind(this,this.props.title)} value={this.props.title}>
            {this.props.title}
            </Button>
            <Button onClick={() => this.setState({ open: !open })} aria-controls={this.props.id} aria-expanded={open} style={{position: 'relative',left:'0',borderRadius:"0px",width: '30%',outline:"none",fontSize:"10px",height:"34px",padding:"0px 0px"}} variant="light">
              {open?" ▲":" ▼"}
            </Button>
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
