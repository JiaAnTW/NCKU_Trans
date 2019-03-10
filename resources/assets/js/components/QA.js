import React, { Component } from 'react';
import {Container,Button,Table,Card} from 'react-bootstrap';
import Modal from 'react-modal';
import './css/QA.css'

class QA extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
        showModal: false
      };
      this.sponFB=this.sponFB.bind(this);
    }
    
    sponFB(){
        var targetId = "demo", // 留言框出現的位置 id
            ver = "3.2", // API 版本
            url = "//connect.facebook.net/zh_TW/sdk.js#xfbml=1&version=v" + ver,
            script = document.createElement("script"),
            elem = document.getElementById("fb-comments"),
            target = document.getElementById(targetId);
        elem.setAttribute("data-href", location.protocol + "//" + location.hostname + location.pathname.split("?")[0]);
        if (target) {
            target.parentNode.insertBefore(elem, target);
        }
        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);      
    }

    componentDidMount(){
        this.sponFB();
    }
    
    render () {
        const  cardHeight= "500px";
        const cardBodyWidth="800px";
        const containerMargin="30px 80px";
        const show=(this.props.is_fetch===true)?this.props.data:{
            id:"",
            question:"",
            answer:"",
        };
      return (
        <Container className="QA_container">
              <Card className="card-box" style={{ height: "auto",border:"none",transform:"translate(0,0)"}}>
              <Card.Body className="QA_cardBody">  
              <div className="QA_card_container" style={{maxWidth: "100%",margin:containerMargin}}>
                <div className="id_container">{"#"+show["id"]}</div>
                <Card.Title className="title2" >{show["question"]}</Card.Title>
                <Card.Text>
                  <span>
                    {show["answer"]}
                  </span>
                </Card.Text>
                </div>
                </Card.Body> 
                <div id="fb-comments" className="fb-comments" data-href="" data-colorscheme="light" data-numposts="5" style={{maxWidth: "100%",margin:containerMargin}}></div>
                 
            </Card>
            <button className="contentBtn" onClick={this.props.next.bind(this,"next")} id="rightBtn" ><div className="Arrow" id="rightArrow"></div><div className="btnText" id="next">下一篇</div></button>
            <button className="contentBtn" onClick={this.props.next.bind(this,"before")} id="leftBtn" ><div className="Arrow" id="leftArrow"></div><div className="btnText" id="before">上一篇</div></button>
        </Container>
      );
    }
  }
  
  export default QA;