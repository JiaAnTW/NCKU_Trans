import React, { Component } from 'react';
import {Button,Badge,Spinner} from 'react-bootstrap';
import CommentIndex from './components/commentIndex';
import Content from './components/content';
import Menu from './components/menu';
import MobileFliter from "./components/mobileFliter";
import Progress from "./components/Progress";
import calender from "./img/calendar.png";
import book from "./img/book.png";
import flag from "./img/flag.png";
import Icon from './components/icon';

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
        fliter : {year:"none",in_maj:"none"},
        selectDepartment:"none",
        contentWidth: "800px",
        contentHeight: "500px",
        showContentId: -1,
        scrollData:{isScroll:false,inital:null,moveX:0},
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
        staticWatch: 0,
        resetFliter: false,
        is_fetch:false,
        is_fetch_statis:false,
        passRate:"null",
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
    this.handleMouseDown=this.handleMouseDown.bind(this);
    this.handleMouseUp=this.handleMouseUp.bind(this);
    this.handleMouseMove=this.handleMouseMove.bind(this);
    this.staticScrollTo=this.staticScrollTo.bind(this);
    this.getStatisticData=this.getStatisticData.bind(this)
  }


  getStatisticData(major,year){
    const getData=new Promise(resolve=>{
      this.setState({passRate:"null",is_fetch_statis:false})
      const data={
        major: major,
        year: year
      }
      let formData = Object.keys(data).map(function (keyName) {
        return encodeURIComponent(keyName) + '=' + encodeURIComponent(data[keyName])
        }).join('&');
      fetch(
        'https://script.google.com/macros/s/AKfycbx7m5jeetEwjtZ8vbicrH8VfQ7tBp_hGyTWX7d73a5NQANmTvU/exec',
        {
          method: 'POST',
          body:formData,
          headers: {
            "Content-type": "application/x-www-form-urlencoded"
          },
        }
      )
      .then(res => res.json())
      .then(data => {
          //const infor=JSON.parse(data);
          console.log(data.passRate)
          this.setState({passRate:data.passRate})
          resolve();
          //return infor.passRate;
        }
      ) 
    })
    return getData;   
  }

  handleMouseDown(e){
    const scrollInital=document.getElementById("bar-link").scrollLeft;
    //console.log("Down at "+scrollInital)
    this.setState({scrollData:{isScroll:true,mouseInital:e.changedTouches[0].pageX,scrollInital:scrollInital,moveX:0}})
  }

  handleMouseMove(e){
    if(this.state.scrollData.isScroll==true){
      const change=e.changedTouches[0].pageX-this.state.scrollData.mouseInital;
      //console.log("change is "+change)
      //console.log("now is "+e.changedTouches[0].pageX)
      document.getElementById("bar-link").scrollLeft=this.state.scrollData.scrollInital-change;
      if(this.state.scrollData.moveX*change<=0)
        this.setState({scrollData:{isScroll:true,mouseInital:e.changedTouches[0].pageX,scrollInital:this.state.scrollData.scrollInital,moveX:(change>0)?1:-1}})
    }
  }

  handleMouseUp(e){
    if(this.state.scrollData.isScroll==true){
      //console.log("Up!")
      const changeIsScroll=new Promise((resolve)=>{
        this.setState({scrollData:{isScroll:false,mouseInital:0,moveX:this.state.scrollData.moveX},staticWatch:(this.state.scrollData.moveX>0)?0:1})
        resolve();
      })
      const scrollTo=new Promise((resolve)=>{
        if(this.state.scrollData.moveX==-1)
          this.staticScrollTo(1)
        else if(this.state.scrollData.moveX==1)
          this.staticScrollTo(0)
        resolve();
      })
      changeIsScroll.then((Resolve)=>{scrollTo.then((resolve)=>{
        this.setState({scrollData:{isScroll:false,mouseInital:0,moveX:0}})
      })})
    }
  }

  handleMouseOut(e){
    if(this.state.scrollData.isScroll==true){
      //console.log("Out! With moveX: "+this.state.scrollData.moveX);
      const changeIsScroll=new Promise((resolve)=>{
        this.setState({scrollData:{isScroll:false,mouseInital:0,moveX:this.state.scrollData.moveX,staticWatch:(this.state.scrollData.moveX>0)?0:1}})
        resolve();
      })
      const scrollTo=new Promise((resolve)=>{
        if(this.state.scrollData.moveX==-1){
          this.staticScrollTo(1)
        }
        else if(this.state.scrollData.moveX==1){
          this.staticScrollTo(0)
        }
        resolve();
      })
      changeIsScroll.then((Resolve)=>{scrollTo.then((resolve)=>{
        this.setState({scrollData:{isScroll:false,mouseInital:0,moveX:0}})
      })})
    }   
  }

  staticScrollTo(target){
    const origin=document.getElementById("bar-link").offsetLeft;
    const firstBanner=document.getElementsByClassName("standard")[0].offsetLeft;
    const secondBanner=document.getElementsByClassName("bar-container")[0].offsetLeft;
    if(target==0){
      if(document.getElementById("bar-link").scrollLeft!=0){
        //console.log("scroll to left!")
        if(document.getElementById("bar-link").scrollLeft>=6){
          document.getElementById("bar-link").scrollLeft-=6;
          this.tm=setTimeout(()=>{this.staticScrollTo(0)},1)
        }
        else{
          document.getElementById("bar-link").scrollLeft=0;
          clearTimeout(this.tm);
          this.setState({staticWatch:0})
        }
      }
      else{
        clearTimeout(this.tm);
        this.setState({scrollData:{isScroll:false,mouseInital:0,moveX:0,staticWatch:0}})
      }
    }
    else if(target==1){
      if(document.getElementById("bar-link").scrollLeft<document.getElementById("bar-link").scrollWidth/2){
        //console.log("scroll to right!")
        if(document.getElementById("bar-link").scrollLeft<document.getElementById("bar-link").scrollWidth/2-6){
          document.getElementById("bar-link").scrollLeft+=6;
          this.tm=setTimeout(()=>{this.staticScrollTo(1)},1);
        }
        else{
          document.getElementById("bar-link").scrollLeft=document.getElementById("bar-link").scrollWidth/2;
          clearTimeout(this.tm);
          this.setState({staticWatch:1})
        }
      }
      else{
        clearTimeout(this.tm);
        
      }
    }
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
        setTimeout(()=>{this.setState({staticWatch:1});this.staticScrollTo(1)},1500)
        /*document.getElementById("bar-link").addEventListener('mousedown',this.handleMouseDown.bind(this));
        document.getElementById("bar-link").addEventListener('mouseup',this.handleMouseUp.bind(this));
        document.getElementById("bar-link").addEventListener('mouseout',this.handleMouseOut.bind(this));
        window.addEventListener('mousemove',this.handleMouseMove.bind(this));*/
        document.getElementById("bar-link").addEventListener('touchstart',this.handleMouseDown.bind(this));
        document.getElementById("bar-link").addEventListener('touchend',this.handleMouseUp.bind(this));
        document.getElementById("bar-link").addEventListener('touchcancel',this.handleMouseOut.bind(this));
        window.addEventListener('touchmove',this.handleMouseMove.bind(this));
      })
      .catch(e => console.log('錯誤:', e));
      this.getStatisticData(this.state.fliter.in_maj,this.state.fliter.year).then(data=>{
        this.setState({is_fetch_statis:true})
      });
  }

  countDepartment(name,type){
     var counter=0;
     this.state.datas.forEach(function(item, index, array){
      if(item[type]==name)
        counter++;
    });
    return counter;
  }

  changeFliter(new_fliter,type){
      if(type==="year"){
        var output=[];
        this.state.datas.forEach(element => {
          if(element[type]==new_fliter&&(this.state.fliter.in_maj==="none"||element["department"]===this.state.fliter.in_maj||element["in_maj"]===this.state.fliter.in_maj))
            output.push(element);
          else if(new_fliter==="none"){
            if(this.state.fliter.in_maj==="none"||element["department"]===this.state.fliter.in_maj||element["in_maj"]===this.state.fliter.in_maj)
              output.push(element);
          }
        });
        this.setState({show:output,fliter:{year:new_fliter,in_maj:this.state.fliter.in_maj}});
        this.getStatisticData(this.state.fliter.in_maj,new_fliter).then(data=>{
          this.setState({is_fetch_statis:true})
        });    
      }
      else{
        this.setState({fliter:{year:this.state.fliter.year,in_maj:new_fliter},resetFliter: !this.state.resetFliter});
        if(new_fliter==="none"){
          if(this.state.mobile_display=="none")
            this.setState({fliter:{year:"none",in_maj:new_fliter}});
          var output=[];
          this.state.datas.forEach(element => {
            if(this.state.fliter.year==="none"||element["year"]===this.state.fliter.year||(this.state.mobile_display=="none"&&new_fliter==="none"))
              output.push(element);
          });          
          this.setState({show:output,selectDepartment:"none"});    
        }
        else{
          var output=[];
          this.state.datas.forEach(element => {
          if(element[type]===new_fliter&&(this.state.fliter.year==="none"||element["year"]===this.state.fliter.year))
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
          this.getStatisticData(new_fliter,this.state.fliter.year).then(data=>{
            this.setState({is_fetch_statis:true})
          });  
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
        const number=this.countDepartment(NCKU[ department[i][1] ][j],"in_maj");
        dep_number+=number;
        singleOutput.push(
            <Button variant="light" style={{fontSize:"12px",fontWeight:"300",textAlign:"right",position:"relative",color:"white",backgroundColor:(this.state.fliter.in_maj===NCKU[department[i][1]][j])?"rgba(255,255,255,0.3)":"rgba(0,0,0,0.1)",borderRadius:"0px",width: '100%',outline:"none" }} onClick={this.changeFliter.bind(this,NCKU[department[i][1]][j],"in_maj")} >
              <div style={{ display:(this.state.fliter.in_maj===NCKU[department[i][1]][j])?"block":"none",position:"absolute",height:"100%",backgroundColor:"white",width: '5%',height: '100%',top:"0",left:"0" }}></div>
              {NCKU[department[i][1]][j]}
              <Badge pill variant="light" style={{ position:"relative", marginLeft:"10px",fontWeight:"400",backgroundColor:"white",color:"rgb(229,68,109)" }}>
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

  spawnStatistic(is_fetch,is_fetch_statis){
    if(is_fetch==true){
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
            <div className="board">
              <div style={{width: "190px",height:"auto",border:"1px solid rgb(229,68,109)"}}>
              <h2 style={{color:"rgb(229,68,109)",width:"100%",textAlign:"center"}}>{(this.state.fliter.in_maj==="none")?"全部學系":this.state.fliter.in_maj}</h2>
              <div style={{marginBottom:"0",marginLeft:"0",backgroundColor:"rgb(229,68,109)",lineHeight:"29px",fontSize:"14px",height:"30px",color:"white",textAlign:"center"}}>
                包含年份: {(this.state.fliter.year==="none")?"全部年份":this.state.fliter.year}
              </div>
              </div>
            </div>
            <div class="progress-container" draggable="false" unselectable="on" style={{width: "100%"}}>
              <div id="bar-link" draggable="false" unselectable="on" style={{width: "100%",height:"115px",position:"relative",overflowX:"scroll"}}>
                <div class="bar-container" unselectable="on" style={{width: "100%",height:"100%",position:"absolute",left:"100%"}}>
                  <div>
                    <Progress is_mobile={this.state.mobile_display} title="平均錄取分數" value={(length===0)?"null":count/length}/>
                  </div>
                  <div>
                    <Progress is_mobile={this.state.mobile_display} title="最低錄取分數" value={(this.state.show.length===0)?"null":min}/>
                  </div>
                  <div style={{minWidth:"107.5px"}}>
                    {(this.state.is_fetch_statis===false)?<div><Spinner animation="border" variant="danger" style={{width:"50px",height:"50px",marginTop:"20px",marginLeft:"30px"}}/><div style={{textAlign:"center",marginTop:"5px"}}>讀取中</div></div>:<Progress is_mobile={this.state.mobile_display} title="通過率(官方數據)" value={(this.state.passRate*100).toFixed(1)}/>}
                  </div>
                </div>
                <div className="standard" unselectable="on" style={{left:"0",width: "100%",height:"100%",position:"absolute"}}>
                  <button unselectable="on" onClick={()=>{window.open('https://reurl.cc/ZKn0M', '_blank');}} style={{width: "70%",color:"rgb(229,68,109)",fontSize:"24px",height:"30%",outline: "none",backgroundColor:"transparent",margin:"5% 15%",border:"none"}}>
                    <img src={flag} alt="flag" unselectable="on" style={{height:"100%",margin:"5px"}}/>轉系申請標準按我
                  </button>
                </div>
              </div>
              <div class="progress-btn" style={{height:"10px"}}>
                <button id="circle" style={{backgroundColor:(this.state.staticWatch===0)?"rgb(229,68,109)":"rgba(229,68,109,0.3)"}} onClick={()=>{this.setState({staticWatch:0});this.staticScrollTo(0);}}></button>
                <button id="circle" style={{backgroundColor:(this.state.staticWatch===1)?"rgb(229,68,109)":"rgba(229,68,109,0.3)"}} onClick={()=>{this.setState({staticWatch:1});this.staticScrollTo(1);}}></button>
              </div>
            </div>
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

  componentWillUnmount() {
    if(this.state.is_fetch){
      /*document.getElementById("bar-link").removeEventListener('mousedown',this.handleMouseDown.bind(this));
      document.getElementById("bar-link").removeEventListener('mouseup',this.handleMouseUp.bind(this));
      document.getElementById("bar-link").removeEventListener('mouseout',this.handleMouseOut.bind(this));
      window.removeEventListener('mousemove',this.handleMouseMove.bind(this));*/
      document.getElementById("bar-link").removeEventListener('touchstart',this.handleMouseDown.bind(this));
      document.getElementById("bar-link").removeEventListener('touchend',this.handleMouseUp.bind(this));
      document.getElementById("bar-link").removeEventListener('touchcancel',this.handleMouseOut.bind(this));
      window.removeEventListener('touchmove',this.handleMouseMove.bind(this));
    }
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
            const number=this.countDepartment(i-1911,"year");
            if(i!=clock.getFullYear()||clock.getMonth()>7)
              output.push(
                <Button variant="light" style={{ textAlign:"right",fontWeight:"100",color:(this.state.fliter.year===i-1911)?"rgb(229,68,109)":"white",backgroundColor:(this.state.fliter.year===i-1911)?"white":"transparent",borderRadius:"0px",width: '100%',outline:"none" }} onClick={this.changeFliter.bind(this,i-1911,"year")}>{i-1911}
                  <Badge pill variant="light" style={{ position:"relative", marginLeft:"10px",fontWeight:"400",backgroundColor:"white",color:"rgb(229,68,109)",backgroundColor:"white",color:"rgb(229,68,109)" }}>
                    {number}
                  </Badge>
                </Button>
              );
        }
        return(
          <Menu onClick={this.changeFliter.bind(this,"none","year")} title="全部年份" isSelect={this.state.fliter.year==="none"}>
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
            <Button variant="light" style={{ fontWeight:"100",color:(this.state.selectDepartment==="none")?"rgb(229,68,109)":"white",backgroundColor:(this.state.selectDepartment==="none")?"white":"transparent",borderRadius:"0px",width: '100%',outline:"none" }} onClick={this.changeFliter.bind(this,"none","department")}>全部學系
            </Button>
            {this.sponCommentMenu()}
          </div>
          
      </div>
      <div className="index">
        <CommentIndex datas={this.state.show} is_fetch={this.state.is_fetch} onClick={this.handleOpenModal} handleRWD={this.handleRWD}/>
      </div>
      {this.spawnStatistic(this.state.is_fetch,this.state.is_fetch_statis)}
      <div className="MobileMenu" style={{display: (this.state.mobile_display==="none")?"block":"none"}}>
        <MobileFliter controllArray={this.findMobileFliterShow(this.state.fliter.in_maj)} show={this.state.fliter.in_maj} mobile={this.state.mobile_display} fliter={this.changeFliter} type="依學院/系" value={this.sponMobileMenu()} style={{position:"absolute",top:"0px",left:"6%",width:'59%',backgroundColor:"rgb(229,68,109)",color:"white",lineHeight:"31px",fontSize:"12px",outline:"none"}}/>
        <MobileFliter controllArray={this.findMobileFliterShow("none")} show={this.state.fliter.in_maj} mobile={this.state.mobile_display} reset={this.state.resetFliter} fliter={this.changeFliter} type="申請年" value={fliter_2} style={{position:"absolute",top:"0px",left:"65%",width:'34%',backgroundColor:"rgb(229,68,109)",color:"white",lineHeight:"31px",fontSize:"12px"}}/>
      </div>
      <div ><Content mobile={this.state.mobile_display} height={this.state.contentHeight} data={this.state.showContent} showModal={this.state.showModal} close={this.handleCloseModal} open={this.handleOpenModal} next={this.handleShowContent}/></div>
    </div>
    );

    const landingPage=(
      <div className="loading" style={{position:"absolute",width:"100vw",height:"100vh"}}>
        <Icon style={{marginTop:"0"}}/>
      </div>

    );
  
    return (
      <div className="comment">
        {(this.state.is_fetch)?indexPage:landingPage}
      </div>
    );
  }
}

export default comment;