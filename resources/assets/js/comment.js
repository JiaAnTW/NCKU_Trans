import React, { Component } from 'react';
import {Button,Badge} from 'react-bootstrap';
import CommentIndex from './commentIndex';
import Content from './content';
import Menu from './menu';
import './css/comment.css';
class comment extends Component {
    constructor(props) {
    super(props);
    this.state = {
        showModal: false,
        mobile_display: "block",
        fliter :"none",
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
        is_fetch:false,
        datas: [],
        NCKU: {
          "LIB":[["中文系",0],["外文系",0],["台文系",0]],
          "SCE":[["數學系",0],["物理系",0],["化學系",0],["地科系",0],["光電系",0]],
          "ENG":[["機械系",0],["化工系",0],["材料系",0],["資源系",0],["土木系",0],["水利系",0],["工科系",0],["系統系",0],["航太系",0],["環工系",0],["測量系",0],["醫工系",0],["能源學程"]],
          "MAN":[["工資系",0],["交管系",0],["企管系",0],["統計系",0],["會計系",0]],
          "MC":[["醫學系",0],["醫技系",0],["護理系",0],["職治系",0],["物治系",0],["藥學系",0]],
          "SOC":[["政治系",0],["經濟系",0],["法律系",0],["心理系",0]],
          "EECS":[["電機系",0],["資訊系",0]],
          "CPD":[["建築系",0],["都計系",0],["工設系",0]],
          "BIO":[["生科系",0],["生技系",0]]
        },
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleShowContent=this.handleShowContent.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleRWD =this.handleRWD.bind(this);
    this.sponCommentMenu= this.sponCommentMenu.bind(this);
    this.countDepartment = this.countDepartment.bind(this);
    this.changeFliter=this.changeFliter.bind(this);
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
      '/api/getAll'
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
      this.setState({fliter:new_fliter});
      if(new_fliter==="none")
        this.setState({show:this.state.datas});
      else{
        var output=[];
        this.state.datas.forEach(element => {
        if(element[type]===new_fliter)
          output.push(element);
        });
        this.setState({show:output});
    }
  }

  sponCommentMenu(){
    var NCKU=
      {
      "LIB":["中文系","外文系","台文系"],
      "SCE":["數學系","物理系","化學系","地科系","光電系"],
      "ENG":["機械系","化工系","材料系","資源系","土木系","水利系","工科系","系統系","航太系","環工系","測量系","醫工系","能源學程"],
      "MAN":["工資系","交管系","企管系","統計系","會計系"],
      "MC":["醫學系","醫技系","護理系","職治系","物治系","藥學系"],
      "SOC":["政治系","經濟系","法律系","心理系"],
      "EECS":["電機系","資訊系"],
      "CPD":["建築系","都計系","工設系"],
      "BIO":["生科系","生技系"]
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
      ["生科院","BIO"]
    ];
    var output=[];
    for(var i=0;i<department.length;++i){
      let singleOutput=[];
      var dep_number=0;
      for(var j=0;j<NCKU[department[i][1]].length;++j){
        const number=this.countDepartment(NCKU[ department[i][1] ][j]);
        dep_number+=number;
        singleOutput.push(
            <Button variant="light" style={{ borderRadius:"0px",width: '100%',outline:"none" }} onClick={this.changeFliter.bind(this,NCKU[department[i][1]][j],"in_maj")} >{NCKU[department[i][1]][j]}
              <Badge pill variant="secondary" style={{ position:"relative", marginLeft:"10px",fontWeight:"400" }}>
                {number}
              </Badge>
            </Button>
        );
      }
      output.push(
          <Menu id={department[i][1]} title={department[i][0]} number={dep_number} onClick={this.changeFliter} >
          {singleOutput}
          </Menu>
      );
    }
    return output;
  }

  componentDidMount(){
    this.handleClick();
  }


  render() {
    return (
      <div className="comment">
          <div className="Menu" style={{display: this.state.mobile_display}}>
              <div style={{position:"relative", top:"0%", width: '100%'}}>
                <Button variant="light" style={{ borderRadius:"0px",width: '100%',outline:"none" }} onClick={this.changeFliter.bind(this,"none","department")}>全部心得
                </Button>
                <Button variant="light" style={{ borderRadius:"0px",width: '100%',outline:"none" }} onClick={this.changeFliter.bind(this,"不分系","in_maj")} >不分系
                  <Badge pill variant="secondary" style={{ position:"relative", marginLeft:"10px",fontWeight:"400" }}>
                    {this.countDepartment("不分系")}
                  </Badge>
                </Button>
              </div>
              {this.sponCommentMenu()}
          </div>
        <div className="index">
            <CommentIndex datas={this.state.show} is_fetch={this.state.is_fetch} onClick={this.handleOpenModal} handleRWD={this.handleRWD}/>
        </div>
        <div className="content_container"><Content mobile={this.state.mobile_display} height={this.state.contentHeight} data={this.state.showContent} showModal={this.state.showModal} close={this.handleCloseModal} open={this.handleOpenModal} next={this.handleShowContent}/></div>
      </div>
    );
  }
}

export default comment;