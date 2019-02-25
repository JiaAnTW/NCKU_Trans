import React, { Component } from 'react';
import {Card,CardDeck,Container,Row,Col} from 'react-bootstrap';
import './css/comment.css';
class comment extends Component {
    constructor(props) {
    super(props);
    this.state = {row:3};
    this.sponCard=this.sponCard.bind(this);
    this.sponSingleCard=this.sponSingleCard.bind(this);
    this.sponManyCard=this.sponManyCard.bind(this);
    this.changeRowCard=this.changeRowCard.bind(this);
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
    var output=[];
    for(var i=0;i<=this.props.datas.length/this.state.row;++i){
        output.push(this.sponManyCard(i));
    }
    return <Container style={{ width: '100%' }}>{output}</Container>;
  }
    else
      return "讀取中......";
  }

  sponSingleCard(number){
    var comment=(this.props.datas[number]["comment"].length<35)?this.props.datas[number]["comment"]:(this.props.datas[number]["comment"].substr(0,34)+"  (...)");
    return(
      <Card style={{ width: '20rem',height:'20rem' }}>
      <Card.Body>
      <Card.Title style={{ fontSize: '3.5rem' }}>{"轉 "+this.props.datas[number]["in_maj"]}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">{"由 "+this.props.datas[number]["out_maj"]+" 轉出"}</Card.Subtitle>
      <Card.Text>
        {comment}
      </Card.Text>
      <Card.Link href="#">{"#"+this.props.datas[number]["id"]}</Card.Link>
      <Card.Link href="#">{this.props.datas[number]["year"]}</Card.Link>
      <Card.Link href="#">{this.props.datas[number]["type"]}</Card.Link>
      </Card.Body>
      </Card>
    );
  }

  sponManyCard(numberRow){
      var output=[];
      for(var i=0;numberRow*this.state.row+i<this.props.datas.length && i<this.state.row;++i)
        output.push(this.sponSingleCard(this.props.datas.length-numberRow*this.state.row-i-1));
      return <Row style={{ paddingBottom:'3rem' }}><CardDeck>{output}</CardDeck></Row>;
  }


  
  render() {
    return (
      <div className="comment">     
          {this.sponCard()}
      </div>
    );
  }
}

export default comment;