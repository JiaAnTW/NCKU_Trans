import React, { Component } from 'react';
import TagsInput from 'react-tagsinput'
import CommentIndex from './components/commentIndex'
import QAIndex from './components/major_QAIndex'
import MobileFliter from "./components/mobileFliter";
import 'react-tagsinput/react-tagsinput.css'
import './css/edit.css'
import {Button,ButtonGroup,Dropdown} from 'react-bootstrap';

class edit extends Component {
    constructor(props) {
    super(props)
    this.state = {
        now_handle: "QA",
        id: -1,
        new_id: "不變",
        id_array:[],
        datas: [],
        is_fetch: false,
        rank_1: "",
        rank_2: "",
        year: 106,
        score: 0,
        out_maj: "",
        in_maj: "",
        comment: "",
        qa_datas: [],
        qa_new_id: "不變",
        qa_id_array:[],
        qa_id: -1,
        qa_q:"",
        qa_a:"",
        confirm:"",
        tags:[],
        showContent: [],
        display: "block",
    }
    this.changeFliter=this.changeFliter.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.getData=this.getData.bind(this)
    this.changeNewId=this.changeNewId.bind(this)
    this.changeRank = this.changeRank.bind(this)
    this.changeId=this.changeId.bind(this)
    this.deleteComment=this.deleteComment.bind(this)
    this.handleChange=this.handleChange.bind(this)
    this.handleOpenModal=this.handleOpenModal.bind(this)
    this.handleRWD=this.handleRWD.bind(this)
  }

  changeFliter(new_fliter,type){
    this.setState({now_handle:new_fliter,qa_id:-1,id:-1})
  }

  getData() {
    fetch(
      '/api/get/major/all',{method: 'GET',
      headers: new Headers({
        'Authorization':"Bearer "+this.props.token,
        })
      }
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

  handleRWD(mobile){
    if(mobile)
      this.setState({display:"none"})
    else
      this.setState({display:"block"})
    }

  handleOpenModal (id) {
    const object=(this.state.now_handle==="心得")?this.state.datas:this.state.qa_datas;
    let i=0;
    while(object[i]["id"]!=id)
      i++;
    if(i<object.length){
      this.setState({ showContent:object[i]});
      this.changeId(i);
    } 
  }

  handleClick() {
    if(this.state.now_handle==="心得"){
      const url='/api/post/major/'+this.state.id.toString();
      const data={
          'id': (this.state.new_id!="不變")?this.state.new_id:this.state.id,
          'rank_1':this.state.rank_1,
          'rank_2':this.state.rank_2,
          'year':this.state.year,
          'score': this.state.score,
          'in_maj':this.state.in_maj,
          'out_maj':this.state.out_maj,
          'comment':this.state.comment,
          'confirm':this.state.confirm,
      };
      fetch(
        url, {method: 'PUT',
          body: JSON.stringify(data),
          mode: 'cors',
          credentials: 'include',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization':"Bearer "+this.props.token,
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
            'Content-Type': 'application/json',
            'Authorization':"Bearer "+this.props.token,
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
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization':"Bearer "+this.props.token,
          })
        }
      )
      .then(res => res.json())
      .catch(e => console.log('錯誤:', e))
      }
      else{
        const url='/api/post/major_QA/'+this.state.qa_id.toString();
        fetch(
          url, {method: 'DELETE',
            headers: new Headers({
              'Content-Type': 'application/json',
              'Authorization':"Bearer "+this.props.token,
            })
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


    changeRank(e){
        this.setState({rank: e.target.value});
    }






    changeId(e){
        var i=e;
        if(this.state.now_handle==="心得"){
          var real_i=i;
          this.setState({
            id: i,
            new_id: "不變",
            rank_1:this.state.datas[real_i]["rank_1"],
            rank_2:this.state.datas[real_i]["rank_2"],
            year:this.state.datas[real_i]["year"],
            score: this.state.datas[real_i]["score"],
            in_maj:this.state.datas[real_i]["in_maj"],
            out_maj:this.state.datas[real_i]["out_maj"],
            comment:this.state.datas[real_i]["comment"],
            confirm:this.state.datas[real_i]["confirm"]
          });
        }
        else{
          var real_i=e;
          //this.state.qa_id_array.findIndex(function(value, index, arr){return value.toString()===i});
          var tags=this.state.qa_datas[real_i]["tag"].split(",");
          this.setState({
            qa_id: i,
            new_id: "不變",
            qa_q:this.state.qa_datas[real_i]["question"],
            qa_a:this.state.qa_datas[real_i]["answer"],
            tags:tags,
          });
        }
    }

  render() {
    const fliter=[{
      id: 0,
      now:-1,
      name: "none",
      type: "null",
      option: [["QA",-1],["心得",-1]],
    }];
    const option=(this.state.now_handle==="心得")?this.state.datas.map(data=>{
      return(<option value={data["id"].toString()}>{data["id"]}</option>);
    }):this.state.qa_datas.map(data=>{
      return(<option value={data["id"].toString()}>{data["id"]}</option>);
    });

    const switchIndex=()=>{
      if(this.state.now_handle==="心得"){
        return(<CommentIndex datas={this.state.datas} is_fetch={this.state.is_fetch} onClick={this.handleOpenModal} handleRWD={this.handleRWD}/>);
      }
      else{
        return(<QAIndex datas={this.state.qa_datas} is_fetch={this.state.is_fetch} onClick={this.handleOpenModal} handleRWD={this.handleRWD}/>);
      }
    }

    const form=()=>{
      if(this.state.now_handle==="心得"&&this.state.id!=-1){
        return (
        <div>
            文章的新id:   
            <input id="new_id" type="text" value={this.state.new_id} onChange={this.changeNewId}/>
            <br/>
        排名上: 
            <input id="rank" type="text" value={this.state.rank_1} onChange={(e) => this.setState({ rank_1: e.target.value })}/>
            <br/>下:<input id="rank" type="text" value={this.state.rank_2} onChange={(e) => this.setState({ rank_2: e.target.value })}/>
            <br/> 
            申請年度:   
            <input id="year" type="text" value={this.state.year} onChange={(e) => this.setState({ year: e.target.value })}/>
            <br/>
            <p>
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
            是否確認<select id="confirm" name ="confirm" onChange={(e) =>{ this.setState({ confirm: e.target.value })}}>
                    <option value="false">否</option>
                    <option value="true">是</option>
            </select>
        </div>);
      }
      else if(this.state.qa_id!=-1)
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
      <div className="edit">
        <div className="Menu" style={{height:"auto",position:"absolute",top:"0px",left:"0px",width: "100%"}}>
          <div style={{width:"90%",margin:"5% 5%",display:(this.state.id===-1&&this.state.qa_id===-1)?"none":"block"}}>
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
        <div className="index" style={{display:(this.state.id===-1&&this.state.qa_id===-1)?"block":"none", top:"100px"}}>
          {switchIndex()}
        </div>
        <div className="MobileMenu" style={{marginTop:"55px"}}>
          <MobileFliter mobile={this.state.display} fliter={this.changeFliter} type="編輯類別" value={fliter} style={{marginLeft:"0%",width:'100%',backgroundColor:"rgb(229,68,109)",color:"white",lineHeight:"31px",fontSize:"12px",height:"30px"}}/>
        </div>
      </div>
    );
  }
}

export default edit;
