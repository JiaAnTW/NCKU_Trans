import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-theme.min.css';
import {Circle } from 'rc-progress';

class progress extends Component {
    constructor(props) {
    super(props)
    this.state = {
        percent: 100,
        is_finish: false,
        is_Mount: false,
        prevValue:101,
      };
      this.increase = this.increase.bind(this);
      this.decrease = this.decrease.bind(this);
  }

//props must have: number,width

increase() {
    const percent = this.state.percent + 1.1;
    const std=(this.props.value=="null")?100:Number(this.props.value)+0.09;
    if (percent > std) {
        clearTimeout(this.tm);
        if(this.state.prevValue==="null"||Number(this.state.prevValue)>Number(this.props.value))
          this.decrease()
        else
          this.setState({is_finish: true,percent: (this.props.value==="null")?100:Number(this.props.value)})
      return;
    }
    this.setState({ percent });
    this.tm = setTimeout(this.increase, 20);
  }

  decrease() {
    const percent = this.state.percent - 1.1;
    if (this.props.value==="null"||percent < Number(this.props.value)) {
        clearTimeout(this.tm);
      if(this.props.value==="null"||Number(this.state.prevValue)<Number(this.props.value))
        this.increase()
      else
        this.setState({is_finish: true,percent: (this.props.value==="null")?100:Number(this.props.value)});
      return;
    }
    this.setState({ percent });
    this.tm = setTimeout(this.decrease, 20);
  }


  componentDidMount(){
        this.setState({is_Mount:true})
        this.decrease();
        
  }



  componentDidUpdate(prevProps, prevState){
    if(this.state.is_Mount==true){
      if(prevProps.value!=this.props.value)
        this.setState({prevValue:prevProps.value});
    if(this.state.is_finish===true&&(prevProps.value!=this.props.value)){
        this.setState({is_finish: false, prevValue:prevProps.value});
        if(prevProps.value=="null"||Number(prevProps.value)>Number(this.props.value)){
            this.decrease();
        }
        else
            this.increase();
    }
    }
  }


  render() {
    return (
        <div style={{position:"relative",width: "107.5px",height:"auto"}}>
            <Circle style={{width:"90px",margin:"0 11.25px"}} percent={(this.state.percent).toFixed(1).toString()} strokeWidth="4" strokeColor="#E5446D"/>
            <span style={{position:"absolute",margin:"0 10.75px", width:"90px",left:"0px",top:"25.5px",textAlign:"center",fontSize:"25px",color:"#E5446D"}}>{(this.props.value=="null")?" 無":this.state.percent.toFixed(1)}</span>
            <span style={{position:"absolute",top:"103%",width:"100%",margin:"0 1px",textAlign:"center",fontSize:"14px",color:"#E5446D"}}>{this.props.title}</span>
        </div>
    );
  }
}

export default progress;
