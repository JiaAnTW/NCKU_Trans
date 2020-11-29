import React, { useState,useEffect } from 'react';
import {Card,CardDeck,Container,Row,Badge} from 'react-bootstrap';
import './css/major_QAIndex.css';
import Icon from './icon';

function major_QAIndex(props){
    
    const [row,setRow] = useState(1);
    const [cardWidth,setCardWidth] =useState("100vw");
    const [cardHeight,setCardHeight] = useState("auto");
    const [cardPadding,setCardPadding] = useState("0rem");
    const [btnHeight,setBtnHeight] = useState("15rem");
    const [cardTextHeight,setCardTextHeight] = useState("auto");
    const [wordsNumber,setWordsNumber] = useState(35);
    const [fontSize,setFontSize] = useState("2.5rem");
    const [IconX,setIconX] = useState("30vw");
    const [IconY,setIconY] = useState("20vh");
    const [isMobile,setIsMobile] = useState(false);
    
    // this.sponCard=this.sponCard.bind(this);
    // this.sponSingleCard=this.sponSingleCard.bind(this);
    // this.sponManyCard=this.sponManyCard.bind(this);
    // this.changeRowCard=this.changeRowCard.bind(this);
    // this.handleOpenContent=this.handleOpenContent.bind(this);
    //this.handleCardSize=this.handleCardSize.bind(this);
  
  
  const handleOpenContent = (id) => {
    props.onClick(id);
  }

  //handleCardSize(is_mobile){
    //if(is_mobile)
      //this.setState({btnHeight:"11rem",cardWidth:"100vw",cardHeight:"16.5rem",cardPadding:"0rem",cardTextHeight:"2.06rem",wordsNumber: 20});
    //else
      //this.setState({btnHeight:"15rem",cardWidth:"20rem",cardHeight:"20rem",cardPadding:"3rem",cardTextHeight:"6.06rem",wordsNumber: 35});
  //}

  
  
  

  const changeRowCard = () => {
    if(window.innerWidth>860){
      setFontSize("2.5rem");
      setIconX("30vw");
      setIconY("10vw");
      setIsMobile(false);
      // const [fontSize , setFontSize] = useState("2.5rem");
      // const [IconX, setIconX] = useState("30vw");
      // const [IconY, setIconY] = useState("10vw");
      // const [isMobile, setIsMobile] = useState(false);

      //this.setState({fontSize:"2.5rem",IconX:"30vw",IconY:"10vw"});
      //this.setState({isMobile:false})
      if(setIsMobile(true)){
        props.handleRWD(false);
      }
      //this.handleCardSize(false);
    }
    //else if(window.innerWidth>=1140){
      //this.setState({row:4});
      //this.props.handleRWD(false);
      //this.handleCardSize(false);
    //}
    //else if(window.innerWidth>=870){
      //this.setState({row:3});
     /// this.props.handleRWD(false);
      //this.handleCardSize(false);
    //}
    //else if(window.innerWidth>=596){
      //this.setState({row:2});
      //this.props.handleRWD(true);
      //this.handleCardSize(false);
    //}
    else{
      //this.setState({fontSize:"2rem",IconX:"25vw",IconY:"50vw"});
      //this.handleCardSize(true);
      //this.setState({isMobile:true})
      setFontSize("2rem");
      setIconX("25vw");
      setIconY("50vw");
      setIsMobile(true);
      // const [fontSize , setFontSize] = useState("2rem");
      // const [IconX, setIconX] = useState("25vw");
      // const [IconY, setIconY] = useState("50vw");
      // const [isMobile, setIsMobile] = useState(true);

      if(setIsMobile(false)){
        props.handleRWD(true);
      }
    }
  }

  useEffect(()=> {
    changeRowCard();
    window.addEventListener('resize', changeRowCard());

    // return () => {
    //   window.removeEventListener('resize', changeRowCard());
    // }
  } ,[]);


  const sponCard = () => {
    if(props.is_fetch){
    const datas=props.datas;
    var output=[];
    for(var i=0;i<=datas.length/1;++i){
        output.push(sponManyCard(i,datas));
    }
    return <div style={{ width: '100vw',maxWidth:"100%" }}>{output}</div >;
  }
    else
      return <Icon style={{ marginTop: IconY }}/> ;
  }

  const sponSingleCard = (number,datas) => {
    var comment=datas[number]["answer"];
    const tags=datas[number]["tag"].split(",").map(tag=>{
      return(
        <Badge style={{lineHeight:"1.5",fontSize:"13px",fontWeight:"200",margin:"5px 10px",borderRadius:"3px",color:"black",backgroundColor:"rgba(128,128,128,0.4)"}}>
          {tag}
        </Badge>
      );
    });
    return(
      <Card style={{ width: cardWidth,height:"auto",maxWidth:"100%" }}>
      <Card.Body style={{width:"100vw",height:"auto",maxWidth:"100%",backgroundColor:(datas[number]["confirm"]=="false")?"rgba(229,68,109,0.3)":"white"}}>
      <Card.Title style={{fontSize: fontSize, height:"auto" }}><div style={{maxWidth: "95%",textAlign:"justify"}}>{datas[number]["question"]}</div></Card.Title>
      <button className="showBtn" onClick={handleOpenContent.bind(this,datas[number]["id"])} style={{ position:"absolute",top:"0",left:"0",width:"100%",height:"75%",backgroundColor: "rgba(0, 0, 0,0)",border: "none",outline:"none"}}></button>
      {tags}
      </Card.Body>
      </Card>
    );
  }

  const sponManyCard = (numberRow,datas) => {
      var output=[];
      for(var i=0;numberRow*row+i<datas.length && i<row;++i)
        output.push(sponSingleCard(datas.length-numberRow*row-i-1,datas));
      if(row>1)
        return <Row style={{paddingBottom:cardPadding,maxWidth:"100%" }}><CardDeck style={{ height:cardHeight }}>{output}</CardDeck></Row>;
      else
        return <Row style={{paddingBottom:cardPadding,maxWidth:"100%",marginLeft:"0", marginRight:"0"}}>{output}</Row>
  }


  
  
  return (
    <div className="QAIndex">     
        {sponCard()}
    </div>
  );
  
}

export default major_QAIndex;