import React, { Component } from 'react';
import {Card,Button,Table,thead,tr,th} from 'react-bootstrap';
import Modal from 'react-modal';
import './css/content.css'

class content extends React.Component {
    constructor () {
      super();
      this.state = {
        showModal: false
      };
      
      this.handleOpenModal = this.handleOpenModal.bind(this);
      this.handleCloseModal = this.handleCloseModal.bind(this);
    }
    

    handleOpenModal () {
      this.props.open();
    }
    
    handleCloseModal () {
      this.props.close();
    }
    
    render () {
      const customStyles = {
        content : {
          top                   : (this.props.mobile==="none")?"45%":'50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)',
          width: (this.props.mobile==="none")?"95vw":"800px",
          height: (this.props.mobile==="none")?"75vh":"500px",
          maxHeight: '500px',
        }
      };

      const cardHeight= (this.props.mobile==="none")?"75vh":"500px";
      const cardBodyWidth=(this.props.mobile==="none")?"95vw":"800px";
      const  containerMargin=(this.props.mobile==="none")?"30px 11vw":"30px 80px";

      const tableType=(this.props.mobile==="none")?
      <thead>
      <tr><th>{"申請年度: "+this.props.data["year"]}</th></tr>
      <tr><th>{"排名: "+this.props.data["rank_1"]+" / "+this.props.data["rank_2"]}</th></tr>
      <tr><th>{"學年分數: "+this.props.data["score"]}</th></tr>
      <tr><th>{"轉出科系: "+this.props.data["out_maj"]}</th></tr>
    </thead>
      //PC
      :<thead>
      <tr>
        <th>{"申請年度: "+this.props.data["year"]}</th>
        <th>{"排名: "+this.props.data["rank_1"]+" / "+this.props.data["rank_2"]}</th>
        <th>{"學年分數: "+this.props.data["score"]}</th>
        <th>{"轉出科系: "+this.props.data["out_maj"]}</th>
      </tr>
    </thead>;

      const tableStyle=(this.props.mobile==="none")?{position:"relative",top: "15px",fontSize: "5vw",fontWeight: 100}:{position:"relative",top: "15px",fontSize: "20px",fontWeight: 100};


      return (
        <div className="content_container">
          <Modal 
             isOpen={this.props.showModal}
             contentLabel="Minimal Modal Example" style={customStyles} className="Modal"
             overlayClassName="Overlay"
          >
            
            <Card className="card-box" style={{position:"absolute",top: "0px",height: cardHeight, overflowX: 'inline',overflowY: 'auto', left: "0px",backgroundColor: "#F5F5F5",border:"none",transform:"translate(0,0)"}}>
              <Card.Body className="cardBody" style={{width:cardBodyWidth}}>  
              <div className="card_container" style={{maxWidth: "100%", margin: containerMargin}}>
                <div className="id_container">{"#"+this.props.data["id"]}</div>
                <h1 className="title">{"轉入科系: "+this.props.data["in_maj"]}</h1>
                <Table striped bordered hover  className="type_table" >
                  {tableType}
                </Table>
              <Card.Text style={{position:"relative",top: "5px",textAlign:"justify"}}>
                <span>
                {this.props.data["comment"]}
                </span>
                <p style={{width:"100%",height:"70px"}}>
                <Button variant="light" className="closeBtn2" style={{position:"absolute",left:"45%" }} onClick={this.handleCloseModal}>關閉</Button>
                </p>
                </Card.Text>
                </div>
                </Card.Body>  
            </Card>
            <Button variant="light" className="closeBtn" onClick={this.handleCloseModal}>關閉</Button>
            <button className="contentBtn" id="rightBtn" onClick={this.props.next.bind(this,"next")}><div className="Arrow" id="rightArrow"></div><div className="btnText" id="next">下一篇</div></button>
            <button className="contentBtn" id="leftBtn" onClick={this.props.next.bind(this,"before")}><div className="Arrow" id="leftArrow"></div><div className="btnText" id="before">上一篇</div></button>
          </Modal>
        </div>
      );
    }
  }
  
  Modal.setAppElement('body')
  export default content;