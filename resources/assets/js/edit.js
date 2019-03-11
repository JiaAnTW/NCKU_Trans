import React, { Component } from 'react';
import TagsInput from 'react-tagsinput'

import 'react-tagsinput/react-tagsinput.css'
import {Button,ButtonGroup,Dropdown} from 'react-bootstrap';

class edit extends Component {
    constructor(props) {
    super(props)
    this.state = {
        now_handle: "心得",
        id: 0,
        new_id: "不變",
        id_array:[],
        datas: [],
        is_fetch: false,
        type: "轉系",
        year: 106,
        score: 0,
        out_maj: "",
        in_maj: "",
        comment: "",
        qa_datas: [],
        qa_new_id: "不變",
        qa_id_array:[],
        qa_id: 0,
        qa_q:"",
        qa_a:"",
        tags:[],
    }
    this.handleClick = this.handleClick.bind(this)
    this.getData=this.getData.bind(this)
    this.changeNewId=this.changeNewId.bind(this)
    this.changeType = this.changeType.bind(this)
    this.changeId=this.changeId.bind(this)
    this.deleteComment=this.deleteComment.bind(this)
    this.handleChange=this.handleChange.bind(this)
  }


  getData() {
    fetch(
      '/api/get/major'
    )
      .then(res => res.json())
      .then(data => {
        let input=[];
            for(var i=0;i<data.length;++i)
              input.push(data[i]["id"]);
        this.setState({
            datas: data,
            id_array: input});
          
      })
      .catch(e => console.log('錯誤:', e));
      fetch(
        '/api/get/major_QA'
      )
        .then(res => res.json())
        .then(data => {
          let input=[];
              for(var i=0;i<data.length;++i)
                input.push(data[i]["id"]);
          this.setState({
              qa_datas: data,
              is_fetch:true,
              qa_id_array: input});
            
        })
        .catch(e => console.log('錯誤:', e));
  }


  handleChange(tags) {
    this.setState({tags})
  }

  handleClick() {
    if(this.state.now_handle==="心得"){
      const url='/api/post/major/'+this.state.id.toString();
      const data={
          'id': (this.state.new_id!="不變")?this.state.new_id:this.state.id,
          'trans_type':this.state.type,
          'year':this.state.year,
          'score': this.state.score,
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
        .then(data => {
          console.log(data)
        })
        .catch(e => console.log('錯誤:', e))
    }
    else{
      const url='/api/post/major_QA/'+this.state.qa_id.toString();
      const data={
          'id': (this.state.qa_new_id!="不變")?this.state.qa_new_id:this.state.qa_id,
          'question':this.state.qa_q,
          'answer':this.state.qa_a,
          'tags':this.state.tags,
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
        .then(data => {
          console.log(data)
        })
        .catch(e => console.log('錯誤:', e))
    }
  }

    deleteComment(){
      if(this.state.now_handle==="心得"){
      const url='/api/post/major/'+this.state.id.toString();
      fetch(
        url, {method: 'DELETE',
        }
      )
      .then(res => res.json())
      .catch(e => console.log('錯誤:', e))
      }
      else{
        const url='/api/post/major_QA/'+this.state.qa_id.toString();
        fetch(
          url, {method: 'DELETE',
          }
        )
        .then(res => res.json())
        .catch(e => console.log('錯誤:', e))
      }
    }

    componentDidMount(){
        this.getData();
    }

    changeNewId(e){
      if(e.target.value!="不變")
        this.setState({new_id: e.target.value});
    }


    changeType(e){
        this.setState({type: e.target.value});
    }






    changeId(e){
        var i=e.target.value;
        if(this.state.now_handle==="心得"){
          var real_i=this.state.id_array.findIndex(function(value, index, arr){return value.toString()===i});
          this.setState({
            id: i,
            new_id: "不變",
            type:this.state.datas[real_i]["type"],
            year:this.state.datas[real_i]["year"],
            score: this.state.datas[real_i]["score"],
            in_maj:this.state.datas[real_i]["in_maj"],
            out_maj:this.state.datas[real_i]["out_maj"],
            comment:this.state.datas[real_i]["comment"]
          });
        }
        else{
          var real_i=this.state.qa_id_array.findIndex(function(value, index, arr){return value.toString()===i});
          this.setState({
            qa_id: i,
            new_id: "不變",
            qa_q:this.state.qa_datas[real_i]["question"],
            qa_a:this.state.qa_datas[real_i]["answer"],
          });
        }
    }

  render() {
    const option=(this.state.now_handle==="心得")?this.state.datas.map(data=>{
      return(<option value={data["id"].toString()}>{data["id"]}</option>);
    }):this.state.qa_datas.map(data=>{
      return(<option value={data["id"].toString()}>{data["id"]}</option>);
    });

    const form=()=>{
      if(this.state.now_handle==="心得"){
        return (
        <div>
            文章的新id:   
            <input id="new_id" type="text" value={this.state.new_id} onChange={this.changeNewId}/>
            <br/>
        轉系/轉學: 
            <select id="trans_type" name ="trans_type" onChange={this.changeType}>
  	            <option value="轉系">轉系</option>
                <option value="轉學">轉學</option>
            </select>
            <br/> 
            申請年度:   
            <input id="year" type="text" value={this.state.year} onChange={(e) => this.setState({ year: e.target.value })}/>
            <br/>
            <p style={{marginLeft: "5%",marginRight: "5%"}}>
            學年分數:
            <br/>    
            <input id="score" type="text" value={this.state.score} onChange={(e) => this.setState({ score: e.target.value })}/>
            </p>
            轉出科系:   
            <input id="out_maj"  type="text" value={this.state.out_maj}  onChange={(e) => this.setState({ out_maj: e.target.value })}/>
            <br/>
            轉入科系:   
            <input id="in_maj" type="text" value={this.state.in_maj} onChange={(e) => this.setState({ in_maj: e.target.value })}/>
            <br/>
            心得:
            <textarea id="comment" value={this.state.comment} onChange={(e) => this.setState({ comment: e.target.value})}></textarea>
            <br/>

        </div>);
      }
      else
        return(<div>
            文章的新id:   
            <input id="new_id" type="text" value={this.state.new_id} onChange={this.changeNewId}/>
            <br/>
            <textarea id="comment" value={this.state.qa_q} onChange={(e) => this.setState({ qa_q: e.target.value})}></textarea>
            <br/>
            <textarea id="comment" value={this.state.qa_a} onChange={(e) => this.setState({ qa_a: e.target.value})}></textarea>
            <br/>
            <TagsInput value={this.state.tags} onChange={this.handleChange}/>
            <br/>
        </div>);
    }
    return (
      <div className="post">
        <div className="index">
        編輯的類別:<select id="comment_id" name ="comment_id" onChange={(e) =>{ this.setState({ now_handle: e.target.value });this.changeId}}>
                    <option value="心得">心得</option>
                    <option value="QA">QA</option>
            </select>
            <br/>
        要編輯的文章id:   
            <select id="comment_id" name ="comment_id" onChange={this.changeId}>
  	            {option}
            </select>
            <br/>
            {form()}
            <button onClick={this.handleClick}>送出</button>
            <br/><br/>
            <button onClick={this.deleteComment}>刪除該文章</button>
        </div>
      </div>
    );
  }
}

export default edit;
