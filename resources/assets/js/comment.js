import React, { Component } from 'react';
import {Button,Badge,Dropdown,ButtonToolbar} from 'react-bootstrap';
import CommentIndex from './components/commentIndex';
import Content from './components/content';
import Menu from './components/menu';
import MobileFliter from "./components/mobileFliter";
import Progress from "./components/Progress";
import calender from "./img/calendar.png";
import book from "./img/book.png";

import './css/comment.css';
var NCKU=
{
"LIB":["中文系","外文系","台文系"],
"SCE":["數學系","物理系","化學系","地科系","光電系"],
"ENG":["機械系","化工系","材料系","資源系","土木系","水利系","工科系","系統系","航太系","環工系","測量系","醫工系","能源學程"],
"MAN":["工資系","交管系","企管系","統計系","會計系"],
"MC":["醫學系","牙醫系","醫技系","護理系","職治系","物治系","藥學系"],
"SOC":["政治系","經濟系","法律系","心理系"],
"EECS":["電機系","資訊系"],
"CPD":["建築系","都計系","工設系"],
"BIO":["生科系","生技系"],
"NON":["不分系"]
};
const department=[
["文學院","LIB"],
["理學院","SCE"],
["工學院","ENG"],
["管理學院","MAN"],
["醫學院","MC"],
["社會科學院","SOC"],
["電資學院","EECS"],
["規設院","CPD"],
["生科院","BIO"],
["其他","NON"]
];
const fliter_2= [{
  id:0,
  now:-1,
  name: "申請年",
  type: "year",
  option:[["全部年度",-1],[107,-1],[106,-1],[105,-1],[104,-1]]
}];

class comment extends Component {
    constructor(props) {
    super(props);
    this.state = {
        is_home: true,
        showModal: false,
        mobile_display: "block",
        fliter :"none",
        selectDepartment:"none",
        contentWidth: "800px",
        contentHeight: "500px",
        showContentId: -1,
        showContent:{
          comment:"",
          department:"",
          id:-1,
          in_maj:"",
          out_maj:"",
          type:"",
          year:-1,
        },
        show:[],
        resetFliter: false,
        is_fetch:false,
        datas: [],
    };
    this.findMobileFliterShow=this.findMobileFliterShow.bind(this)
    this.handleInitalMajorFliter =this.handleInitalMajorFliter.bind(this)
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleShowContent=this.handleShowContent.bind(this);
    this.spawnStatistic-this.spawnStatistic.bind.bind(this)
    this.handleClick = this.handleClick.bind(this);
    this.handleRWD =this.handleRWD.bind(this);
    this.sponCommentMenu= this.sponCommentMenu.bind(this);
    this.countDepartment = this.countDepartment.bind(this);
    this.changeFliter=this.changeFliter.bind(this);
    this.sponMobileMenu=this.sponMobileMenu.bind(this);
  }

  findMobileFliterShow(fliter){
      for(var i=0; i<department.length;++i){
        var controllArray=[0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
        if(department[i][0]===fliter){
          controllArray[0]=i+1;
          controllArray[i+1]=0;
          return controllArray;
        }
        else{
          for(var j=0;j<NCKU[department[i][1]].length;++j)
            if(NCKU[department[i][1]][j]===fliter){
              controllArray[0]=i+1;
              controllArray[i+1]=j+1;
              return controllArray;
            }
        }
      }
      return [0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
  }

  handleRWD(is_mobile){
    if(is_mobile)
      this.setState({
        mobile_display: "none",
        contentWidth: "85vw",
      contentHeight: "800px",
    });
    else
      this.setState({
        mobile_display: "block",
        contentWidth: "800px",
        contentHeight: "500px",
    });
  }

  handleShowContent(type){
    const data=this.state.show;
    const find=this.state.showContentId;
    const value=(type==="next")?1:-1;
    
      const nowIndex=data.findIndex(function(element,index,array){
          return element["id"]==find.toString();
      });
      if(nowIndex-value<data.length && nowIndex-value>=0)
        this.setState({showContent: this.state.show[nowIndex-value],showContentId: this.state.show[nowIndex-value]["id"]});
  }

  handleOpenModal (id) {
    let i=0;
    while(this.state.show[i]["id"]!=id)
      i++;
    if(i<this.state.show.length)
      this.setState({ showContent:this.state.show[i],showContentId: id,showModal: true });
  }
  
  handleCloseModal () {

    this.setState({ showModal: false });
  }

  handleClick() {
    fetch(
      '/api/get/major'
    )
      .then(res => res.json())
      .then(data => {
        this.setState({
            datas: data,
            is_fetch:true,
            show:data})
      })
      .catch(e => console.log('錯誤:', e));
  }

  countDepartment(name){
     var counter=0;
     this.state.datas.forEach(function(item, index, array){
      if(item["in_maj"]==name)
        counter++;
    });
    return counter;
  }

  changeFliter(new_fliter,type){
      if(type==="year"){
        var output=[];
        this.state.datas.forEach(element => {
        if(element[type]==new_fliter&&(this.state.fliter==="none"||element["department"]===this.state.fliter||element["in_maj"]===this.state.fliter))
          output.push(element);
        });
        this.setState({show:output});
      }
      else{
        this.setState({fliter:new_fliter,resetFliter: !this.state.resetFliter});
        if(new_fliter==="none"){
          this.setState({show:this.state.datas,selectDepartment:"none"});    
        }
        else{
          var output=[];
          this.state.datas.forEach(element => {
          if(element[type]===new_fliter)
            output.push(element);
          });
          this.setState({show:output});
        }
        if(type=="in_maj"){
          department.forEach((Element,Index)=>{
            NCKU[Element[1]].forEach((Item,index)=>{
              if(Item===new_fliter)
              this.setState({selectDepartment:Element[0]})
            })
          })
        }
        else if(type==="department")
          this.setState({selectDepartment:new_fliter})
    }
  }

  sponCommentMenu(){
    var output=[];
    for(var i=0;i<department.length;++i){
      let singleOutput=[];
      var dep_number=0;
      for(var j=0;j<NCKU[department[i][1]].length;++j){
        const number=this.countDepartment(NCKU[ department[i][1] ][j]);
        dep_number+=number;
        singleOutput.push(
            <Button variant="light" style={{fontSize:"12px",fontWeight:"300",textAlign:"right",position:"relative",color:"white",backgroundColor:(this.state.fliter===NCKU[department[i][1]][j])?"rgba(255,255,255,0.3)":"transparent",borderRadius:"0px",width: '100%',outline:"none" }} onClick={this.changeFliter.bind(this,NCKU[department[i][1]][j],"in_maj")} >
              <div style={{ display:(this.state.fliter===NCKU[department[i][1]][j])?"block":"none",position:"absolute",height:"100%",backgroundColor:"white",width: '5%',height: '100%',top:"0",left:"0" }}></div>
              {NCKU[department[i][1]][j]}
              <Badge pill variant="light" style={{ position:"relative", marginLeft:"10px",fontWeight:"400" }}>
                {number}
              </Badge>
            </Button>
        );
      }
      output.push(
          <Menu id={department[i][1]} title={department[i][0]} number={dep_number} onClick={this.changeFliter} isSelect={this.state.selectDepartment===department[i][0]} >
          {singleOutput}
          </Menu>
      );
    }
    return output;
  }

  sponMobileMenu(){
    var object=[];
    object.push(
      {
        id:0,
        name: "none",
        type: "department",
        now:-1,
        option:[["全部學院",-1],["文學院",1],["理學院",2],["工學院",3],["管理學院",4],["醫學院",5],["社會科學院",6],["電資學院",7],["規設院",8],["生科院",9]]
      }
    );
    for(var i=0;i<department.length;++i){
      let singleObject=[];
      singleObject.push(
        ["全部學系",-1]
      );
      for(var j=0;j<NCKU[department[i][1]].length;++j){
        singleObject.push(
          [NCKU[ department[i][1] ][j],-1]
        );
      }
      object.push(
          {
            id: i+1,
            now:-1,
            name: ["department",department[i][0]],
            type: "in_maj",
            option: singleObject,
          }
      );
    }
    return object;
  }

  spawnStatistic(){
    if(this.state.is_fetch==true){
      var count=0;
      var min=100;
      var array=[];
      var length=this.state.show.length;
      for(let i=0;i<this.state.show.length;++i){
        count=count+Number(this.state.show[i]["score"]);
        array.push(this.state.show[i]["score"]);
        if(this.state.show[i]["score"]<min)
          min=this.state.show[i]["score"];
      }
      array.sort(function(a, b) {
        return a-b;
      });
      return(
        <div className="statistic">
          <ul>
            <li className="board">
              <div style={{width: "190px",height:"auto",border:"1px solid rgb(229,68,109)"}}>
              <h2 style={{color:"rgb(229,68,109)",width:"100%",textAlign:"center"}}>{(this.state.fliter==="none")?"全部心得":this.state.fliter}</h2>
              <div style={{marginBottom:"0",marginLeft:"0",backgroundColor:"rgb(229,68,109)",lineHeight:"29px",fontSize:"14px",height:"30px",color:"white"}}>
                <MobileFliter controllArray={this.findMobileFliterShow("none")} mobile={this.state.mobile_display} reset={this.state.resetFliter} fliter={this.changeFliter} type="包含年份" value={fliter_2} style={{marginLeft:"12%",width:'76%',backgroundColor:"rgb(229,68,109)",color:"white",lineHeight:"31px",fontSize:"12px",height:"30px"}}/>
              </div>
              </div>
            </li>
            <li>
              <Progress is_mobile={this.state.mobile_display} title="平均錄取分數" value={(length===0)?"null":count/length}/>
            </li>
            <li>
              <Progress is_mobile={this.state.mobile_display} title="第一四分位數" value={(this.state.show.length<4)?"null":array[Math.round(this.state.show.length/4)-1]}/>
            </li>
            <li>
              <Progress is_mobile={this.state.mobile_display} title="最低錄取分數" value={(this.state.show.length===0)?"null":min}/>
            </li>


          </ul>
        </div>
      );
    }

  }

  componentDidMount(){
    this.handleClick();
    var output=[];
    this.state.datas.forEach(element => {
      if(element["department"]==="文學院")
        output.push(element);
      });
    this.setState({show:output});
  }

  handleInitalMajorFliter(value){
    var i=0;
    while(i<department.length&&department[i][0]!=value){
      i++;
    }
    const type=(i===department.length)?"in_maj":"department";
    this.changeFliter(value,type);
  }


  render() {
    const spawnDepartment=department.map(option=>{
      return<option value={option[0]}>{option[0]}</option>
    });
    const spawnMajor=(fliter)=>{
      if(fliter==="none")
          return <option value="none">請選擇學院</option>
      var i=0;
        while(i<department.length&&department[i][0]!=fliter){
          i++;
        }
        if(i==department.length){
          for(i=0;i<department.length;++i){
            var j=0
            while(j<NCKU[department[i][1]].length && NCKU[department[i][1]][j]!=fliter){
              j++;
            }
            if(j<NCKU[department[i][1]].length)
              break;
          }
        }
        var output=[];
        output.push(<option value={department[i][0]}>全部科系</option>);
        for(var j=0;j<NCKU[department[i][1]].length;++j)
        output.push(<option value={NCKU[department[i][1]][j]}>{NCKU[department[i][1]][j]}</option>);
        return output;
    }
    const spawnYear=()=>{
        var output=[];
        var clock=new Date();
          for(var i=clock.getFullYear();i>2014;--i){
            if(i!=clock.getFullYear()||clock.getMonth()>7)
              output.push(
                <Button variant="light" style={{ textAlign:"right",fontWeight:"100",color:"white",backgroundColor:"transparent",borderRadius:"0px",width: '100%',outline:"none" }} onClick={this.changeFliter.bind(this,i-1911,"year")}>{i-1911}
                </Button>
              );
        }
        return(
          <Menu onClick={this.changeFliter.bind(this,"none","year")} title="全部年份" >
          {output}
          </Menu>
        );
    }

    const indexPage=(
      <div>
        <div className="Menu" style={{display: this.state.mobile_display}}>
          <div style={{position:"relative", marginTop:"0%", width: '100%'}}>
            <div style={{position:"relative", marginTop:"0%", width: '100%',fontSize:"16px",height:"40px",lineHeight:"40px",color:"white"}}>
              <img src={calender} alt="year" style={{ margin:"0% 4%",height:"40%",lineHeight:"40px"}} />
              依年份篩選:
              </div>
            {spawnYear()}
          </div>
          <div style={{position:"relative", marginTop:"30px", width: '100%'}}>
            <div style={{position:"relative", marginTop:"0%", width: '100%',fontSize:"16px",height:"40px",lineHeight:"40px",color:"white"}}>
              <img src={book} alt="year" style={{ margin:"0% 4%",height:"50%",lineHeight:"40px"}} />
              依學系篩選:
            </div>
            <Button variant="light" style={{ fontWeight:"100",color:(this.state.selectDepartment==="none")?"rgb(229,68,109)":"white",backgroundColor:(this.state.selectDepartment==="none")?"white":"transparent",borderRadius:"0px",width: '100%',outline:"none" }} onClick={this.changeFliter.bind(this,"none","department")}>全部心得
            </Button>
            {this.sponCommentMenu()}
          </div>
          
      </div>
      <div className="index">
        <CommentIndex datas={this.state.show} is_fetch={this.state.is_fetch} onClick={this.handleOpenModal} handleRWD={this.handleRWD}/>
      </div>
      {this.spawnStatistic()}
      <div className="MobileMenu" style={{display: (this.state.mobile_display==="none")?"block":"none"}}>
        <MobileFliter controllArray={this.findMobileFliterShow(this.state.fliter)} show={this.state.fliter} mobile={this.state.mobile_display} fliter={this.changeFliter} type="依學院/系" value={this.sponMobileMenu()} style={{position:"absolute",top:"0px",left:"6%",width:'59%',backgroundColor:"rgb(229,68,109)",color:"white",lineHeight:"31px",fontSize:"12px",outline:"none"}}/>
        <MobileFliter controllArray={this.findMobileFliterShow("none")} show={this.state.fliter} mobile={this.state.mobile_display} reset={this.state.resetFliter} fliter={this.changeFliter} type="申請年" value={fliter_2} style={{position:"absolute",top:"0px",left:"65%",width:'34%',backgroundColor:"rgb(229,68,109)",color:"white",lineHeight:"31px",fontSize:"12px"}}/>
      </div>
      <div ><Content mobile={this.state.mobile_display} height={this.state.contentHeight} data={this.state.showContent} showModal={this.state.showModal} close={this.handleCloseModal} open={this.handleOpenModal} next={this.handleShowContent}/></div>
    </div>
    );

    const landingPage=(
      <div className="App" style={{backgroundImage:(this.state.is_mobile!="none")?"linear-gradient(to right, #f77062 0%, #fe5196 100%)":"linear-gradient(to right, rgb(229,68,109) 0%, rgb(229,68,109) 100%)"}}>
        <h1 className="webName">選擇想查詢的學院/學系</h1>
        <div className="warning">
          <select onChange={(e)=>this.changeFliter(e.target.value,"department")} style={{outline:"none",color:"rgb(229,68,109)",fontWeight:300,border:"none",width:"120px",marginLeft:"0%",backgroundColor:"white"}}>
            <option value="none">全部學院</option>
          {spawnDepartment}
          </select>
          <select style={{outline:"none",color:"rgb(229,68,109)",border:"none",width:"120px",backgroundColor:"white",marginLeft:"5%"}} onChange={(e)=>this.handleInitalMajorFliter(e.target.value)}>{spawnMajor(this.state.fliter)}</select>
        </div>
        <button className="know" onClick={(e)=>this.setState({is_home:true})}>確認送出</button>
      </div>

    );
  
    return (
      <div className="comment">
        {(this.state.is_home)?indexPage:landingPage}
      </div>
    );
  }
}

export default comment;