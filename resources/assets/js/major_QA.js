import React, { Component } from 'react';
import {Button,Badge} from 'react-bootstrap';
import QAIndex from './major_QAIndex';
import QA from './QA';
import Menu from './menu';
import './css/major_QA.css';
class maj_QA extends Component {
    constructor(props) {
    super(props);
    this.state = {
        mobile_display: "block",
        fliter :"none",
        showContentId: -1,
        show:[],
        showContent:{
          question:"",
          answer:"",
          id:-1,
        },
        is_fetch:false,
        datas: [],
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleRWD =this.handleRWD.bind(this);
    this.handleOpenQA =this.handleOpenQA.bind(this);
    this.handleShowContent=this.handleShowContent.bind(this);
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

  handleOpenQA (id) {
    let i=0;
    while(this.state.show[i]["id"]!=id)
      i++;
    if(i<this.state.show.length)
      this.setState({ showContent:this.state.show[i],showContentId: id,showModal: true });
    const url='/QA/'+id;
    const location = {
      pathname: url,
      state: { id: id }
    }
    
    this.props.history.push(location);  
  }

  handleShowContent(type){
    const data=this.state.show;
    const find=Number(this.props.match.params.id);
    const value=(type==="next")?1:-1;
    
      const nowIndex=data.findIndex(function(element,index,array){
          return element["id"]==find.toString();
      });
      if(nowIndex-value<data.length && nowIndex-value>=0){
        this.setState({showContent: this.state.show[nowIndex-value],showContentId: this.state.show[nowIndex-value]["id"]});
        const url='/QA/'+this.state.show[nowIndex-value]["id"];
        const location = {
          pathname: url,
          state: { id: find }
        }
        
        this.props.history.push(location);
      }
  }

  handleClick() {
    fetch(
      '/api/get/major_QA'
    )
      .then(res => res.json())
      .then(data => {
        this.setState({
            datas: data,
            is_fetch:true,
            show:data,
            showContent:data[Number(this.props.match.params.id)],
          })
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
    const show=(this.props.location.pathname==="/QA/~")?
    <QAIndex datas={this.state.show} is_fetch={this.state.is_fetch} onClick={this.handleOpenQA} handleRWD={this.handleRWD}/>
    :
    <QA  data={this.state.showContent} is_fetch={this.state.is_fetch} next={this.handleShowContent}/>;
    return (
      <div className="major_QA">
          <div className="Menu">
              <div style={{position:"relative", top:"0%", width: '100%'}}>
                <Button variant="light" style={{ borderRadius:"0px",width: '100%',outline:"none" }} onClick={this.changeFliter.bind(this,"不分系","in_maj")} >不分系
                  <Badge pill variant="secondary" style={{ position:"relative", marginLeft:"10px",fontWeight:"400" }}>
                    {this.countDepartment("不分系")}
                  </Badge>
                </Button>
              </div>
          </div>
        <div className="index">
            {show}
        </div>
      </div>
    );
  }
}

export default maj_QA;