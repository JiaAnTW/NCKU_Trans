import React, { Component } from 'react';
import TagsInput from 'react-tagsinput'
import CommentIndex from './components/commentIndex'
import QAIndex from './components/major_QAIndex'
import MobileFliter from "./components/mobileFliter";
import 'react-tagsinput/react-tagsinput.css'
import './css/edit.css'
import {Table,Button} from 'react-bootstrap';
import Modal from 'react-modal';

class editComment extends Component {
    constructor(props) {
    super(props)
    this.state = {
        fliter:{year:""},
        id: -1,
        new_id: "不變",
        id_array:[],
        datas: [],
        show:[],
        is_fetch: false,
        rank_1: "",
        rank_2: "",
        year: 106,
        score: 0,
        out_maj: "",
        in_maj: "",
        comment: "",
        confirm:"",
        showContent: [],
        display: "block",
        showModal: false
    }
    this.changeFliter=this.changeFliter.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.getData=this.getData.bind(this)
    this.changeNewId=this.changeNewId.bind(this)
    this.changeRank = this.changeRank.bind(this)
    this.changeId=this.changeId.bind(this)
    this.deleteComment=this.deleteComment.bind(this)
    this.handleOpenModal=this.handleOpenModal.bind(this)
    this.handleRWD=this.handleRWD.bind(this)
  }

  changeFliter(new_fliter,type){
    if(type=="null"){
      this.setState({id:-1,show:this.state.datas})
      //this.props.changeLocation((new_fliter==="QA"?"QA":"comment"),"-1")
    }
      if(type==="confirm"){
        var output=[];
        const condition=(new_fliter==="已審核")?"true":"false";
        this.state.datas.forEach(Element=>{
          if(new_fliter==="全部"||Element["confirm"]==condition)
            output.push(Element);
    })        
      this.setState({show:output})
    }
    
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
  }


  handleRWD(mobile){
    if(mobile)
      this.setState({display:"none"})
    else
      this.setState({display:"block"})
    }

  handleOpenModal (id) {
    const object=this.state.datas;
    let i=0;
    while(object[i]["id"]!=id)
      i++;
    if(i<object.length){
      this.setState({ showContent:object[i]});
      this.changeId(i);
    } 
  }

  handleClick() {
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
    //this.props.changeLocation((this.state.now_handle==="心得"?"comment":"QA"),"-1")
  }

    deleteComment(){
        const url='/api/post/major/'+this.state.id.toString();
        var new_data=this.state.datas;
        new_data.splice(new_data.findIndex((Element)=>{return Element.id===this.state.id}),1);
        fetch(
          url, {method: 'DELETE',
            headers: new Headers({
             'Content-Type': 'application/json',
              'Authorization':"Bearer "+this.props.token,
            })
          }
        )
        .then(res =>{
           res.json(); 
           this.setState({id:-1, datas:new_data,showModal:false});
        })
        .catch(e => console.log('錯誤:', e))  
      //this.props.changeLocation((this.state.now_handle==="心得"?"comment":"QA"),"-1")
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
          var real_i=i;
          this.setState({
            id: this.state.datas[real_i]["id"],
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

  render() {
    const customStyles = {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        padding: "7%",
        backgroundColor:"white"
      }
    };
    const alert=<Modal isOpen={this.state.showModal} style={customStyles} onRequestClose={()=>{this.setState({showModal:false})}} className="Modal" overlayClassName="Overlay">
      <div>確定要刪除嗎?刪除後無法還原歐~</div>
      <div className="btn-container" id="edit" style={{display:"flex",alignItems:"center",justifyContent:"space-around"}}><button onClick={()=>{this.setState({showModal:false})}}>取消</button><button onClick={this.deleteComment}>確定</button></div>
      </Modal>;
    const fliter2=[{
      id: 0,
      now:-1,
      name: "none",
      type: "confirm",
      option: [["",-1],["全部",-1],["已審核",-1],["未審核",-1]],
    }];

    const switchIndex=()=>{
        return(
            <CommentIndex datas={this.state.show} is_fetch={this.state.is_fetch} onClick={this.handleOpenModal} handleRWD={this.handleRWD}/>
        );
    }

    const table=()=>{
        return (<div className="check-container">
        <Button variant="danger" style={{alignSelf:"flex-start"}} onClick={() =>{ this.setState({ id: -1 });}}>← 返回選單</Button>
        <Table striped bordered hover style={{width:"250px",marginTop:"20px"}}>
          <tbody>
          <tr><td>id</td><td>{this.state.id}</td></tr>
          <tr><td>排名上: </td><td>{this.state.rank_1}</td></tr>
          <tr><td>排名下: </td><td>{this.state.rank_2}</td></tr>
          <tr><td>申請年度:</td><td>{this.state.year}</td></tr>
          <tr><td>轉出科系:</td><td>{this.state.out_maj}</td></tr>
          <tr><td>轉入科系:</td><td>{this.state.in_maj}</td></tr>
          </tbody>
        </Table>
        <div style={{width:"70%"}}>{this.state.comment}</div>
          <div className="confirm-container">
            <form>
           是否確認:
            是<input type="radio" name="comfirm" value="true" checked={this.state.confirm==="true"} onChange={(e) =>{ this.setState({ confirm: e.target.value })}}/>
            否<input type="radio" name="comfirm" value="false" checked={this.state.confirm==="false"} onChange={(e) =>{ this.setState({ confirm: e.target.value })}}/>
            </form>
            <button onClick={this.handleClick}>送出</button>
            <br/><br/>
            <button onClick={this.deleteComment}>刪除該文章</button>
          </div>
        </div>);
    } 

    return (
      <div className="edit">
        <div className="Menu" style={{height:"auto",position:"absolute",top:"50px",left:"0px",width: "100%",height:"100%"}}>
          <div style={{width:"90%",margin:"5% 5%",display:(this.state.id===-1)?"none":"block"}}>
            <br/>
            {table()}
            {alert}
            </div>
        </div>
        <div className="index" style={{display:(this.state.id===-1)?"block":"none", top:"100px"}}>
          {switchIndex()}
        </div>
        <div className="MobileMenu" style={{marginTop:"55px",position:"relative",backgroundColor:"rgb(229,68,109)",minHeight:"30px",maxHeight:"60px"}}>
          <MobileFliter show={"全部"} controllArray={[0,-1]} mobile={this.state.display} fliter={this.changeFliter} type="是否審核" value={fliter2} style={{position:"absolute",marginLeft:"170px",width:'150px',backgroundColor:"rgb(229,68,109)",color:"white",lineHeight:"31px",fontSize:"12px",height:"30px"}}/>
        </div>
      </div>
    );
  }
}

export default editComment;
