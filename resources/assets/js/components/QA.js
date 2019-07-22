import React, { Component } from 'react';
import {Container,Badge,Card,Button} from 'react-bootstrap';
import Modal from 'react-modal';
import './css/QA.css'

class QA extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
        showModal: false
      };
      this.handleBackIndex=this.handleBackIndex.bind(this)
    }
    

    handleBackIndex(){
      this.props.handleBackIndex();
    }

    componentDidMount(){
    }
    
    render () {
        const  cardHeight= "500px";
        const cardBodyWidth="800px";
        const containerMargin=(this.props.is_mobile==="none")?"30px 40px":"30px 80px";
        const show=(this.props.is_fetch===true)?this.props.data:{
            id:"",
            question:"",
            answer:"",
        };

      return (
        <div className="QA_container">
              <Card className="card-box" style={{ height: "80vh",border:"none",overflowY: 'auto',maxHeight:"80vh",transform:"translate(0,0)"}}>
              <Card.Body className="QA_cardBody">  
              <div className="QA_card_container" style={{maxWidth: "100%",margin:containerMargin}}>
                <div className="id_container">{"QA編號: "+show["id"]}</div>
                <Card.Title className="title2" >{show["question"]}</Card.Title>
                <Card.Text>
                  <span>
                    {show["answer"]}
                  </span>
                </Card.Text>
                </div>
                </Card.Body>
                 
            </Card>
            <Button variant="light" className="closeBtn" onClick={this.handleBackIndex.bind(this)}>返回</Button>
        </div>
      );
    }
  }
  
  export default QA;