
import { useState} from 'react';
function useChangeRowCard(props,setFontSize,setIconX,setIconY,setIsMobile){
    if(window.innerWidth>860){
      
        setFontSize("2.5rem");
        setIconX("30vw");
        setIconY("10vw");
        setIsMobile(false);
        // const [fontSize , setFontSize] = useState("2.5rem");
        // const [IconX, setIconX] = useState("30vw");
        // const [IconY, setIconY] = useState("10vw");
        // const [isMobile, setIsMobile] = useState(false);
  
        //this.setState({fontSize:"2.5rem",IconX:"30vw",IconY:"10vw"});
        //this.setState({isMobile:false})
        if(true){
          setIsMobile(true)
          props.handleRWD(false);
        }
        //this.handleCardSize(false);
      }
      //else if(window.innerWidth>=1140){
        //this.setState({row:4});
        //this.props.handleRWD(false);
        //this.handleCardSize(false);
      //}
      //else if(window.innerWidth>=870){
        //this.setState({row:3});
       /// this.props.handleRWD(false);
        //this.handleCardSize(false);
      //}
      //else if(window.innerWidth>=596){
        //this.setState({row:2});
        //this.props.handleRWD(true);
        //this.handleCardSize(false);
      //}
      else{
        //this.setState({fontSize:"2rem",IconX:"25vw",IconY:"50vw"});
        //this.handleCardSize(true);
        //this.setState({isMobile:true})
        setFontSize("2rem");
        setIconX("25vw");
        setIconY("50vw");
        setIsMobile(true);
        // const [fontSize , setFontSize] = useState("2rem");
        // const [IconX, setIconX] = useState("25vw");
        // const [IconY, setIconY] = useState("50vw");
        // const [isMobile, setIsMobile] = useState(true);
  
        if(setIsMobile(false)){
          props.handleRWD(true);
        }
      }
}
export default useChangeRowCard;