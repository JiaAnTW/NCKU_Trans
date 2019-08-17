import React, { Component } from 'react';
import QAIndex from './components/major_QAIndex'
import MobileFliter from "./components/mobileFliter";
import 'react-tagsinput/react-tagsinput.css'
import './css/edit.css'
import {Button,Card,Badge} from 'react-bootstrap';
import Modal from 'react-modal';
import Search from "./img/search.png";
import Can from "./img/can.png";
import Toggle from 'react-toggle';
import "./components/css/toggle.css";

class editQA extends Component {
    constructor(props) {
    super(props)
    this.state = {
        confirmFliter:"全部",
        fliterByWord:'',
        new_id: "不變",
        id_array:[],
        datas: [],
        show:[],
        is_fetch: false,
        qa_datas: [],
        qa_new_id: "不變",
        qa_id_array:[],
        qa_id: -1,
        qa_q:"",
        qa_a:"",
        qa_confirm:"",
        tags:[],
        showContent: [],
        total_tags: [],
        display: "block",
        showModal: false,
        openFliter: false
    }
    this.changeFliter=this.changeFliter.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.getData=this.getData.bind(this)
    this.changeNewId=this.changeNewId.bind(this)
    this.deleteComment=this.deleteComment.bind(this)
    this.handleChange=this.handleChange.bind(this)
    this.handleOpenModal=this.handleOpenModal.bind(this)
    this.handleRWD=this.handleRWD.bind(this)
    this.spawnTags=this.spawnTags.bind(this);
    this.changeSelectBtn=this.changeSelectBtn.bind(this)
    this.changeFliterByWord=this.changeFliterByWord.bind(this)
    this.changeConfirm=this.changeConfirm.bind(this)
  }

  changeConfirm(e){
    if(e.target.checked){
      this.setState({qa_confirm:"true"})
    }
    else{
      this.setState({qa_confirm:"false"})
    }
  }


  changeFliterByWord(e){
    //this.setState({fliterByWord: e.target.value});
    const changeState=()=>new Promise((resolve,reject)=>this.setState({fliterByWord: e.target.value},()=>resolve()));
    changeState().then((value)=>{this.changeFliter("none")})
    //this.changeFliter()
  }

  changeSelectBtn(index){
    var new_tags=this.state.total_tags;
    new_tags[index][1]=!new_tags[index][1];
    this.setState({total_tags:new_tags})
  }

  spawnTags(datas){
    var total_tags=[];
    datas.forEach((element)=>{
        if(element["tag"]!=""){
          element["tag"].split(",").forEach((tag)=>{
            for(var i=0;i<total_tags.length;++i){
              if(total_tags[i][0]===tag)
                return;
            }
            total_tags.push([tag,false]);
          });
        }
    });
    this.setState({total_tags:total_tags});
  }

  changeFliter(new_fliter,type){
    if(this.state.display==="none")
      this.setState({openFliter: false})
    var show=[];
    var tag=[];
    var rst_tag=this.state.total_tags;
    
    if(type==="none"){
      rst_tag.forEach(element => {
        element[1]=false
        }
      );
    }
    for(var i=0;i<this.state.total_tags.length;++i){
      if(this.state.total_tags[i][1]===true)
        tag.push(this.state.total_tags[i][0]);
    }

    if(type==="confirm"){
      if(new_fliter==="全部")
        var condition="全部"
      else
        var condition=(new_fliter==="已審核")?"true":"false"
      this.setState({confirmFliter:condition})
    }
    else
      var condition=this.state.confirmFliter;

    if(type!="none" && tag.length>0){  
      this.state.qa_datas.forEach(element => {
        const array=element["tag"].split(",");
        var isFind=true;
        for(var i=0;i<array.length&&isFind;++i){
          for(var j=0;j<tag.length&& isFind;++j){
            if(array.findIndex((Element)=>{ return Element===tag[j];})==-1){
              isFind=false;
            }
          }
        }
        if(isFind&& (this.state.fliterByWord==="" || element["question"].search(this.state.fliterByWord)!=-1)){
          if(condition==="全部"||element["confirm"]==condition){
            show.push(element);
            return;
          }
        }
      });
      this.setState({show:show});
    }
    else{
      this.state.qa_datas.forEach(element => {
        if(this.state.fliterByWord==='' || element["question"].search(this.state.fliterByWord)!=-1){
          if(condition==="全部"||element["confirm"]==condition){
            show.push(element);
            return;
          }
        }
      });
    }
    this.setState({show:show,total_tags: rst_tag});
    
  }

  getData() {
    fetch(
        '/api/get/major_QA/all', {method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
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
              qa_datas: data,
              is_fetch:true,
              qa_id_array: input,
              show:data
            });
          this.spawnTags(data);
        })
        .catch(e => {
          console.log('錯誤:', e)
         location.href="/#/admin/login"
    });
  }


  handleChange(tags) {
    this.setState({tags})
  }

  handleRWD(mobile){
    if(mobile)
      this.setState({display:"none",openFliter: false})
    else
      this.setState({display:"block",openFliter: true})
    }

  handleOpenModal (id) {
    const object=this.state.qa_datas;
    let i=0;
    while(object[i]["id"]!=id)
      i++;
    if(i<object.length){
      this.setState({ showContent:object[i]});
      this.changeId(i);
    } 
  }

  handleClick() {
      const url='/api/post/major_QA/'+this.state.qa_id.toString();
      const data={
          'id': (this.state.qa_new_id!="不變")?this.state.qa_new_id:this.state.qa_id,
          'question':this.state.qa_q,
          'answer':this.state.qa_a,
          'confirm':this.state.qa_confirm,
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
    //this.props.changeLocation((this.state.now_handle==="心得"?"comment":"QA"),"-1")
  }

    deleteComment(){
        const url='/api/post/major_QA/'+this.state.qa_id.toString();
        var new_data=this.state.qa_datas;
        new_data.splice(new_data.findIndex((Element)=>{return Element.id===this.state.qa_id}),1);
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
          this.setState({qa_id:-1, qa_datas:new_data,showModal:false});
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


    changeId(e){
        var i=e;
          var real_i=e;
          //this.state.qa_id_array.findIndex(function(value, index, arr){return value.toString()===i});
          var tags=this.state.qa_datas[real_i]["tag"].split(",");
          this.setState({
            qa_id: this.state.qa_datas[real_i]["id"],
            new_id: "不變",
            qa_q:this.state.qa_datas[real_i]["question"],
            qa_a:this.state.qa_datas[real_i]["answer"],
            qa_confirm: this.state.qa_datas[real_i]["confirm"],
            tags:tags,
          });
        //this.props.changeLocation((this.state.now_handle==="心得"?"comment":"QA"),e)
          
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
      <div style={{fontSize:"17px"}}>確定要刪除嗎?刪除後無法還原歐~</div>
      <div className="btn-container" id="edit" style={{display:"flex",alignItems:"center",justifyContent:"space-around",marginTop:"30px"}}>
        <button onClick={()=>{this.setState({showModal:false})}} style={{fontWeight:"100",backgroundColor:"rgb(229,68,109)",width:"40%",color:"white",border:"none",padding:"2%"}}>取消</button>
        <button onClick={this.deleteComment} style={{fontWeight:"100",backgroundColor:"rgb(229,68,109)",width:"40%",color:"white",border:"none",padding:"2%"}}>確定</button></div>
      </Modal>;
    const fliter=[{
      id: 0,
      now:-1,
      name: "none",
      type: "null",
      option: [["",-1],["QA",-1],["心得",-1]],
    }];
    const fliter2=[{
      id: 0,
      now:-1,
      name: "none",
      type: "confirm",
      option: [["",-1],["全部",-1],["已審核",-1],["未審核",-1]],
    }];

    const switchIndex=()=>{
        return(<QAIndex datas={this.state.show} is_fetch={this.state.is_fetch} onClick={this.handleOpenModal} handleRWD={this.handleRWD}/>);
    }

    const table=(id)=>{
      if(id!=-1)
        return (<div className="check-container">
        <Card>
        <button style={{width:"50px",height:"50px",alignSelf:"flex-start",padding:"6px 6px",fontWeight:"100",borderRadius:"50px",position:"absolute",top:"-20px",left:"-20px",backgroundColor:"rgb(229,68,109)",border:"none",color:"white"}} onClick={() => {this.setState({ qa_id: -1 })}}>←</button>
        <div style={{width:"100%",padding:"10% 15%"}}>
          <table style={{width:"100%"}}>
            <tbody>
              <tr><td style={{display:"flex"}}><Badge variant="danger" style={{fontWeight:"100",backgroundColor:"rgb(229,68,109)",minWidth:"70px"}}>id:</Badge></td><td style={{paddingBottom:"10px"}}>{this.state.qa_id}</td></tr>
              <tr><td style={{display:"flex"}}><Badge variant="danger" style={{fontWeight:"100",backgroundColor:"rgb(229,68,109)",minWidth:"70px"}}>問題</Badge></td><td>{this.state.qa_q}</td></tr>
            </tbody>
          </table>
        </div>
        <div style={{width:"100%",fontWeight:"100",lineHeight:"30px",minHeight:"125px",fontSize:"17px",letterSpacing:"3px"}}>{this.state.qa_a}</div>
          <div className="confirm-container">
            <form>
              <div className="toggle-container">
                <div style={{marginRight:"10px"}}>是否確認:</div>
                <div><Toggle defaultChecked={this.state.qa_confirm==="true"} onChange={this.changeConfirm}/> </div>
              </div>  
            </form>
            <div className="btn-container">
              <button onClick={()=>{this.setState({showModal:true})}} style={{width:"20%"}}>刪除</button>
              <button onClick={this.handleClick} style={{width:"70%"}}>送出</button>
            </div>
          </div>
          </Card>
        </div>);
    }
    
    const Menu=()=>{
      var output=[];
      for(var i=0;i<this.state.total_tags.length;++i){
        output.push(<Button variant="light" onClick={this.changeSelectBtn.bind(this,i)} style={{fontWeight:"300",outline:"none",margin:"5px 2px",color:(this.state.total_tags[i][1]==false)?"white":"#F8BBD0",backgroundColor:(this.state.total_tags[i][1]==false)?"transparent":"rgba(0,0,0,0.1)",borderColor:"rgba(243,243,243,0.5)",borderRadius:"0"}}>{this.state.total_tags[i][0]}</Button>);
      }
      return output;
    }

    return (
      <div className="edit">
        <div className="Menu" style={{height:"auto",position:"absolute",top:"50px",left:"0px",width: "100%",height:"100%"}}>
          <div style={{width:"90%",margin:"5% 5%",display:(this.state.qa_id===-1)?"none":"block"}}>
            <br/>
            {table(this.state.qa_id)}
            {alert}
            </div>
        </div>
        <div className="index" style={{display:(this.state.qa_id===-1)?"block":"none", top:"100px"}}>
          {switchIndex()}
        </div>
        <div className="MobileFliter" style={{display:(this.state.qa_id!=-1||this.state.display==="block")?"none":"block"}}> 
          <Button onClick={()=>this.setState({openFliter:!this.state.openFliter})} style={{outline:"none",width:"60%",margin:"0px 20%",backgroundColor:"transparent",border:"none",boxShadow:"none"}}>{(this.state.openFliter===true)?"X 關閉":"+添加篩選"}</Button>
        </div>
        <div className="fliter" style={{boxShadow:"none",border:"none",display:(this.state.openFliter===true && (this.state.is_fetch))?"block":"none"}}>
          <MobileFliter show={"全部"} controllArray={[0,-1]} mobile={this.state.display} fliter={this.changeFliter} type="是否審核" value={fliter2} style={{marginLeft:"25px",width:'150px',backgroundColor:"rgb(229,68,109)",color:"white",lineHeight:"31px",fontSize:"12px",height:"30px"}}/>
          {Menu()}
          <input type="text" border="none" placeholder="查詢標題" onChange={this.changeFliterByWord} style={{border:"none",width:"80%",margin:"15px 10%",padding:"2% 7%",borderRadius:"10px"}}/>  
            <Button onClick={this.changeFliter.bind(this,"tag","tag")} style={{outline:"none",width:"86%",margin:"5px 7%",backgroundColor:"white",border:"none",color:"rgb(229,68,109)",textShadow:"none"}}>
              <img src={Search} alt="search" style={{marginRight:"7px",height:"17px"}}/>
              送出篩選
            </Button>
            <Button onClick={this.changeFliter.bind(this,"tag","none")} style={{outline:"none",width:"86%",margin:"5px 7%",backgroundColor:"transparent",borderColor:"white",textShadow:"none"}}>
            <img src={Can} alt="search" style={{marginRight:"7px",height:"17px"}}/>
            清除篩選</Button>
        </div>
      </div>
    );
  }
}

export default editQA;
