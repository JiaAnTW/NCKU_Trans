import React, { Component } from 'react';
import {Card} from 'react-bootstrap';
import './css/layout.css';
class comment extends Component {
    constructor(props) {
    super(props);
    this.state = {};
    this.sponCard=this.sponCard.bind(this);
  }
  
  sponCard(){
    if(this.props.is_fetch){
    var output=this.props.datas.map(data=>{
    return(
      <div className="comment">
      <Card style={{ width: '30rem' }}>
      <Card.Body>
      <Card.Title>{data["type"]}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">{data["year"]}</Card.Subtitle>
      <Card.Text>
        {data["comment"]}
      </Card.Text>
      <Card.Link href="#">{data["out_maj"]}</Card.Link>
      <Card.Link href="#">{data["in_maj"]}</Card.Link>
      </Card.Body>
      </Card>
      </div>
    );
    });
    return output;
  }
    else{
      var output =0;
      return output;
    }
  }


  
  render() {
    return (
      <div>
        {this.sponCard()}
      </div>
    );
  }
}

export default comment;