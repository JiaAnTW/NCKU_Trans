import React, { Component } from 'react';
import {Card,CardDeck,Container,Row,CardGroup} from 'react-bootstrap';
import './css/commentIndex.css';
import Icon from './icon';
class commentIndex extends Component {
    constructor(props) {
    super(props);
    this.state = {
      row:3,
      cardWidth:"20rem",
      cardHeight:"20rem",
      cardPadding:"3rem",
      fontSize:"3.5rem",
      btnHeight:"15rem",
      cardTextHeight:"6.06rem",
      wordsNumber: 35,
    };
    this.sponCard=this.sponCard.bind(this);
    this.sponSingleCard=this.sponSingleCard.bind(this);
    this.sponManyCard=this.sponManyCard.bind(this);
    this.changeRowCard=this.changeRowCard.bind(this);
    this.handleOpenContent=this.handleOpenContent.bind(this);
    this.handleCardSize=this.handleCardSize.bind(this);
  }
  
  handleOpenContent(id){
    this.props.onClick(id);
  }

  handleCardSize(is_mobile){
    if(is_mobile)
      this.setState({fontSize:"2.5rem",btnHeight:"11rem",cardWidth:"100vw",cardHeight:"14.5rem",cardPadding:"0rem",cardTextHeight:"2.06rem",wordsNumber: 20});
    else
      this.setState({fontSize:"3.5rem",btnHeight:"15rem",cardWidth:"20rem",cardHeight:"20rem",cardPadding:"3rem",cardTextHeight:"6.06rem",wordsNumber: 35});
  }

  componentDidMount() {
    this.changeRowCard();
    window.addEventListener('resize', this.changeRowCard);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.changeRowCard);
  }

  changeRowCard(){
    if(window.innerWidth>1400){
      this.setState({row:5});
      this.props.handleRWD(false);
      this.handleCardSize(false);
    }
    else if(window.innerWidth>=1140){
      this.setState({row:4});
      this.props.handleRWD(false);
      this.handleCardSize(false);
    }
    else if(window.innerWidth>=870){
      this.setState({row:3});
      this.props.handleRWD(false);
      this.handleCardSize(false);
    }
    else if(window.innerWidth>=596){
      this.setState({row:2});
      this.props.handleRWD(true);
      this.handleCardSize(false);
    }
    else{
      this.setState({row:1});
      this.handleCardSize(true);
      this.props.handleRWD(true);
    }
  }



  sponCard(){
    if(this.props.is_fetch){
    const datas=this.props.datas;
    var output=[];
    for(var i=0;i<=datas.length/this.state.row;++i){
        output.push(this.sponManyCard(i,datas));
    }
    return <Container style={{ width: '100%',maxWidth:"100%" }}>{output}</Container>;
  }
    else
      return <Icon/> ;
  }

  sponSingleCard(number,datas){
    var comment=(datas[number]["comment"].length<this.state.wordsNumber)?datas[number]["comment"]:(datas[number]["comment"].substr(0,this.state.wordsNumber-1)+"  (...)");
    return(
      <Card style={{ width: this.state.cardWidth,height:this.state.cardHeight,maxWidth:"100%" }}>
      <Card.Body style={{maxHeight: "100%"}}>
      <Card.Title style={{ fontSize: this.state.fontSize }}>{"轉 "+datas[number]["in_maj"]}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">{"由 "+datas[number]["out_maj"]+" 轉出"}</Card.Subtitle>
      <Card.Text  style={{ height: this.state.cardTextHeight }}>
        {comment}
      </Card.Text>
      <button className="showBtn" onClick={this.handleOpenContent.bind(this,datas[number]["id"])} style={{ position:"absolute",top:"0",left:"0",width:"100%",height:this.state.btnHeight,backgroundColor: "rgba(0, 0, 0,0)",border: "none",outline:"none"}}></button>
      <Card.Link style={{ color: 'rgb(30,144,255)' }}>{"#"+datas[number]["id"]}</Card.Link>
      <Card.Link style={{ color:'rgb(30,144,255)' }}>{datas[number]["year"]}</Card.Link>
      <Card.Link style={{ color: 'rgb(30,144,255)' }}>{datas[number]["department"]}</Card.Link>
      </Card.Body>
      </Card>
    );
  }

  sponManyCard(numberRow,datas){
      var output=[];
      for(var i=0;numberRow*this.state.row+i<datas.length && i<this.state.row;++i)
        output.push(this.sponSingleCard(datas.length-numberRow*this.state.row-i-1,datas));
      if(this.state.row>1)
        return <Row style={{ paddingBottom:this.state.cardPadding }}><CardDeck style={{ height:this.state.cardHeight }}>{output}</CardDeck></Row>;
      else
        return <Row style={{ paddingBottom:this.state.cardPadding }}>{output}</Row>
  }


  
  render() {
    return (
      <div className="commentIndex">     
          {this.sponCard()}
      </div>
    );
  }
}

export default commentIndex;