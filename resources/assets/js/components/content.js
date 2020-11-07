import React, { Component,useState } from 'react';
import {Card,Button,Table,thead,tr,th} from 'react-bootstrap';
import Modal from 'react-modal';
import './css/content.css'
import  contentStyle from './contentStyle'
import TitleBar from './TitleBar'



function content (props) {
  

    const [showModal,setShowModal] = useState(false); 
    

  
      const cardHeight= (props.mobile==="none")?"75vh":"500px";
      const cardBodyWidth=(props.mobile==="none")?"95vw":"800px";
      const  containerMargin=(props.mobile==="none")?"30px 11vw":"30px 80px";

      let TitleBarData = [{type:"申請年度",value:props.data["year"]},{type:"排名",value:props.data["rank_1"]+" / "+props.data["rank_2"]},{type:"學年分數",value:props.data["score"]},{type:"轉出科系",value:props.data["out_maj"]}];
      


      return (
        <div className="content_container">
          <Modal 
             isOpen={props.showModal}
             contentLabel="Minimal Modal Example" style={contentStyle(props)} className="Modal"
             overlayClassName="Overlay" onRequestClose={props.close}
          >
            
            <Card className="card-box" style={{position:"absolute",top: "0px",height: cardHeight, overflowX: 'inline',overflowY: 'auto', left: "0px",backgroundColor: "#F5F5F5",border:"none",transform:"translate(0,0)"}}>
              <Card.Body className="cardBody" style={{width:cardBodyWidth}}>  
              <div className="card_container" style={{maxWidth: "100%", margin: containerMargin}}>
                <h1 className="title">{"轉: "+props.data["in_maj"]}</h1>
                <div className="id_container">{"心得編號: "+props.data["id"]}</div>
                <Table striped bordered hover  className="type_table" >
                  <TitleBar items = {TitleBarData} mobile ={props.mobile}/>
                </Table>
              <Card.Text style={{position:"relative",top: "5px",textAlign:"justify"}}>
                <div>
                {props.data["comment"]}
                </div>
                <p style={{width:"100%",height:"70px"}}>
                </p>
                </Card.Text>
                </div>
                </Card.Body>  
            </Card>
            <button className="contentBtn" id="rightBtn" onClick={props.next.bind(this,"next")}><div className="Arrow" id="rightArrow"></div></button>
            <button className="contentBtn" id="leftBtn" onClick={props.next.bind(this,"before")}><div className="Arrow" id="leftArrow"></div></button>
          </Modal>
        </div>
      );
    
  }
  
  Modal.setAppElement('body')
  export default content;