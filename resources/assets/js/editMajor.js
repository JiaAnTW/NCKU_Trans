import React, { Component } from 'react';
import './css/editMajor.css'
import {Collapse} from 'react-bootstrap';

class editMajor extends Component {
    constructor(props) {
    super(props)
    this.state = {
        college:[],
        department:[],
        watchDepartment: [],
        editCollege:-1,
        editDepartment:-1,
        startEditCol:false,
        startEditDep:false,
        is_fetch:false
    }
    this.handleClick = this.handleClick.bind(this)
    this.getData=this.getData.bind(this)
    this.deleteComment=this.deleteComment.bind(this)
    this.changeNowHandle=this.changeNowHandle.bind(this)
    this.changeColName=this.changeColName.bind(this)
    this.changeDepName=this.changeDepName.bind(this)
  }

  getData() {
    fetch(
        '/api/get/college', {method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization':"Bearer "+this.props.token,
          })
        }
      )
        .then(res => res.json())
        .then(data => {
          this.setState({
              college:data
            });
          getDepartment();
        })
        .catch(e => {
          console.log('錯誤:', e)
         location.href="/#/admin/login"
    });

    const getDepartment=()=>{
        fetch(
            '/api/get/department', {method: 'GET',
            headers: new Headers({
              'Content-Type': 'application/json',
              'Authorization':"Bearer "+this.props.token,
              })
            }
          )
            .then(res => res.json())
            .then(data => {
              this.setState({
                    department:data,
                    is_fetch:true
                });
            })
            .catch(e => {

        });
    }
  }

  changeNowHandle(e){
    var output=[];
    this.state.department.forEach(Element=>{
        if(Element.college===e.target.value)
            output.push(Element)
    })
    this.setState({watchDepartment:output})
  }

  changeColName(e,type){
    var college=this.state.college;
    college[this.state.editCollege][type]=e.target.value;
    this.setState({college:college})
  }

  changeDepName(e,type){
    var department=this.state.department;
    department[this.state.editDepartment][type]=e.target.value;
    this.setState({department:department})
  }

  handleClick() {
      /*const url='/api/post/major_QA/'+this.state.qa_id.toString();
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
        .catch(e => console.log('錯誤:', e))*/
    //this.props.changeLocation((this.state.now_handle==="心得"?"comment":"QA"),"-1")
  }

    deleteComment(){
        /*const url='/api/post/major_QA/'+this.state.qa_id.toString();
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
        .catch(e => console.log('錯誤:', e))*/
      //this.props.changeLocation((this.state.now_handle==="心得"?"comment":"QA"),"-1")
    }


    componentDidMount(){
        this.getData();
    }

  render() {
    const spawnCollege=(data)=>{
        var spawnbtn=data.map((Element,Index)=>{
            return <div className="option-container" style={{backgroundColor:(this.state.editCollege==Index)?"#f77062":"rgb(229,68,109)"}}>
                <button value={Element.name} onClick={(e)=>{this.changeNowHandle(e);this.setState({startEditCol:(this.state.editCollege===Index)?!this.state.startEditCol:false,editCollege:Index})}}>{Element.name}</button>
                <button value={Element.name} className="edit-btn" onClick={(e)=>{this.changeNowHandle(e);this.setState({startEditCol:(this.state.editCollege===Index)?!this.state.startEditCol:true,editCollege:Index})}}></button>
                </div>
        })

        spawnbtn.push(
            <div className="option-container">
                <button onClick={this.changeNowHandle}>+ 新增學院</button>
            </div>
        )
        return(
            <div>
                <div className="select-box">
                    點擊學院，系所選單會自動跳出<br/>
                    點選編輯符號可開始編輯
                <div className="btn-container">
                    {spawnbtn}
                    </div>
                </div>
                <Collapse in={this.state.startEditCol}>
                <div className="edit-box">
                    <div>
                        <p className="input-box">學院名稱<input type="text" onChange={(e)=>{this.changeColName(e,"name")}} value={(this.state.startEditCol)?this.state.college[this.state.editCollege].name:""}/></p>
                        <p className="input-box">英文簡寫<input type="text" onChange={(e)=>{this.changeColName(e,"english")}}  value={(this.state.startEditCol)?this.state.college[this.state.editCollege].english:""} /></p>
                    </div>
                    <div className="send-box">
                        <button>X</button>
                        <button style={{width:"80%"}}>送出</button>
                    </div>
                 </div>
                 </Collapse>
            </div>
        )
    }

    const spawnDepartment=(data)=>{
        var spawnbtn=data.map((Element,Index)=>{
            return <div className="option-container" style={{backgroundColor:(this.state.editDepartment==Index)?"#f77062":"rgb(229,68,109)"}}>
                <button value={Element.name} onClick={(e)=>{this.setState({startEditDep:(this.state.editDepartment===Index)?!this.state.startEditDep:true,editDepartment:Index})}}>{Element.name}</button>
                <button value={Element.name} className="edit-btn" onClick={(e)=>{this.setState({startEditDep:(this.state.editDepartment===Index)?!this.state.startEditDep:true,editDepartment:Index})}}></button>
                </div>
        })

        spawnbtn.push(
            <div className="option-container">
                <button onClick={this.changeNowHandle}>+ 新增學院</button>
            </div>
        )
        return(
            <div>
                <div className="select-box">
                    點擊學院，系所選單會自動跳出<br/>
                    點選編輯符號可開始編輯
                <div className="btn-container">
                    {spawnbtn}
                    </div>
                </div>
                <Collapse in={this.state.startEditDep}>
                <div className="edit-box">
                    <div>
                        <p className="input-box">系所名稱<input type="text" onChange={(e)=>{this.changeDepName(e,"name")}} value={(this.state.startEditDep)?this.state.department[this.state.editDepartment].name:""}/></p>
                        <p className="input-box">所屬學院<input type="text" onChange={(e)=>{this.changeDepName(e,"college")}} value={(this.state.startEditDep)?this.state.department[this.state.editDepartment].college:""}/></p>
                    </div>
                    <div className="send-box">
                        <button>X</button>
                        <button style={{width:"80%"}}>送出</button>
                    </div>
                 </div>
                 </Collapse>
            </div>
        )
    }


    return (
      <div className="editMajor">
          <div className="box">
            <div className="header">
                學院區
            </div>
            {spawnCollege(this.state.college)}
          </div>
          <div className="box">
            <div className="header">
                系所區
            </div>
            {spawnDepartment(this.state.watchDepartment)}
          </div>
      </div>
    );
  }
}

export default editMajor;
