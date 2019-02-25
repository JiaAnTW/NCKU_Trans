import React, { Component } from 'react';
import {Button,ButtonGroup,Dropdown} from 'react-bootstrap';
import './css/layout.css';

class home extends Component {
    constructor(props) {
    super(props)
    this.state = {
        id: 0,
        new_id: 0,
        datas: [],
        is_fetch: false,
        type: "轉系",
        year: 106,
        out_maj: "",
        in_maj: "",
        comment: ""
    }
    this.handleClick = this.handleClick.bind(this)
    this.getData=this.getData.bind(this)
    this.changeNewId=this.changeNewId.bind(this)
    this.changeType = this.changeType.bind(this)
    this.changeId=this.changeId.bind(this)
    this.deleteComment=this.deleteComment.bind(this)
  }


  getData() {
    fetch(
      '/api/getAll'
    )
      .then(res => res.json())
      .then(data => {
        this.setState({
            datas: data,
            is_fetch:true})
      })
      .catch(e => console.log('錯誤:', e));
  }


  handleClick() {
    const url='/api/post/'+this.state.id.toString();
    const data={
        'id': this.state.new_id,
        'trans_type':this.state.type,
        'year':this.state.year,
        'in_maj':this.state.in_maj,
        'out_maj':this.state.out_maj,
        'comment':this.state.comment,
    };
    fetch(
      url, {method: 'PUT',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
          })
        }
    )
      .then(res => res.json())
      .catch(e => console.log('錯誤:', e))
  }

    deleteComment(){
      const url='/api/post/'+this.state.id.toString();
      fetch(
        url, {method: 'DELETE',
        }
      )
      .then(res => res.json())
      .catch(e => console.log('錯誤:', e))
    }

    componentDidMount(){
        this.getData();
    }

    changeNewId(e){
      this.setState({new_id: e.target.value});
    }


    changeType(e){
        this.setState({type: e.target.value});
    }


    changeComment(e){
        this.setState({comment: e.target.value});
        e.preventDefault();
    }

    changeId(e){
        var i=e.target.value;
        this.setState({
          id: i,
          type:this.state.datas[i]["type"],
          year:this.state.datas[i]["year"],
          in_maj:this.state.datas[i]["in_maj"],
          out_maj:this.state.datas[i]["out_maj"],
          comment:this.state.datas[i]["comment"]
        });
    }

  render() {
    const option=this.state.datas.map(data=>{
      return(<option value={data["id"].toString()}>{data["id"]}</option>);
    });
    return (
      <div className="post">
                <nav><a>聯絡我們</a><a href="/#/post">分享心得</a><a>常見QA</a><a href="/#/comment">瀏覽心得</a></nav>
        <div className="Menu">

        </div>
        <div className="index">
        要編輯的文章id:   
            <select id="comment_id" name ="comment_id" onChange={this.changeId}>
  	            {option}
            </select>
            <br/>
            文章的新id:   
            <input id="new_id" type="text" value={this.state.id} onChange={this.changeNewId}/>
            <br/>
        轉系/轉學: 
            <select id="trans_type" name ="trans_type" onChange={this.changeType}>
  	            <option selected value="轉系">轉系</option>
                <option value="轉學">轉學</option>
            </select>
            <br/> 
            申請年度:   
            <input id="year" type="text" value={this.state.year} onChange={(e) => this.setState({ year: e.target.value })}/>
            <br/>
            轉出科系:   
            <input id="out_maj"  type="text" value={this.state.out_maj}  onChange={(e) => this.setState({ out_maj: e.target.value })}/>
            <br/>
            轉入科系:   
            <input id="in_maj" type="text" value={this.state.in_maj} onChange={(e) => this.setState({ in_maj: e.target.value })}/>
            <br/>
            心得:
            <textarea id="comment" value={this.state.comment} onChange={(e) => this.setState({ comment: e.target.value})}></textarea>
            <br/>
            <button onClick={this.handleClick}>送出</button>
            <br/><br/>
            <button onClick={this.deleteComment}>刪除該文章</button>
        </div>
      </div>
    );
  }
}

export default home;
