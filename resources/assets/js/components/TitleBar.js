import React from 'react'
import TitleBarItem from './TitleBarItem'


function TitleBar(props){
    if(props.mobile==="none"){
        const titleBarItemArr = props.items.map((item)=> <tr><TitleBarItem type={item.type} value={item.value}/></tr>)
    return(<thead>{titleBarItemArr}</thead>);
    }
      //PC
    else{ 
        const titleBarItemArr = props.items.map((item)=> <TitleBarItem type={item.type} value={item.value}/>)
        return(<thead><tr>{titleBarItemArr}</tr></thead>);
    }

}
export default TitleBar;