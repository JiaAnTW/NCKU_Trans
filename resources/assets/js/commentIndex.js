import React, { Component } from 'react';
import {Card,CardDeck,Container,Row,Col} from 'react-bootstrap';
import './css/commentIndex.css';
import Icon from './icon';
class commentIndex extends Component {
    constructor(props) {
    super(props);
    this.state = {row:3};
    this.sponCard=this.sponCard.bind(this);
    this.sponSingleCard=this.sponSingleCard.bind(this);
    this.sponManyCard=this.sponManyCard.bind(this);
    this.changeRowCard=this.changeRowCard.bind(this);
    this.handleOpenContent=this.handleOpenContent.bind(this);
  }
  
  handleOpenContent(id){
    this.props.onClick(id);
  }

  componentDidMount() {
    this.changeRowCard();
    window.addEventListener('resize', this.changeRowCard);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.changeRowCard);
  }

  changeRowCard(){
    if(window.innerWidth>1400)
      this.setState({row:5});
    else if(window.innerWidth>=1140)
      this.setState({row:4});
    else if(window.innerWidth>=870)
      this.setState({row:3});
    else if(window.innerWidth>=596)
      this.setState({row:2});
    else
    this.setState({row:1});
  }



  sponCard(){
    if(this.props.is_fetch){
    const datas=this.props.datas;
    var output=[];
    for(var i=0;i<=datas.length/this.state.row;++i){
        output.push(this.sponManyCard(i,datas));
    }
    return <Container style={{ width: '100%' }}>{output}</Container>;
  }
    else
      return <Icon style={{ position: 'absolute',left: "40%",top: "200px" }}/> ;
  }

  sponSingleCard(number,datas){
    var comment=(datas[number]["comment"].length<35)?datas[number]["comment"]:(datas[number]["comment"].substr(0,34)+"  (...)");
    return(
      <Card style={{ width: '20rem',height:'20rem' }}>
      <Card.Body>
      <Card.Title style={{ fontSize: '3.5rem' }}>{"轉 "+datas[number]["in_maj"]}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">{"由 "+datas[number]["out_maj"]+" 轉出"}</Card.Subtitle>
      <Card.Text  style={{ height: '6.06rem' }}>
        {comment}
      </Card.Text>
      <button className="showBtn" onClick={this.handleOpenContent.bind(this,datas[number]["id"])} style={{ position:"absolute",top:"0",left:"0",width:"100%",height:"15rem",backgroundColor: "rgba(0, 0, 0,0)",border: "none",outline:"none"}}></button>
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
      return <Row style={{ paddingBottom:'3rem' }}><CardDeck>{output}</CardDeck></Row>;
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