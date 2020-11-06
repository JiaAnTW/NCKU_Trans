import React from 'react'

function TitleBarItem(props){
    return <th>{props.type + " : " + props.value}</th>
}

export default TitleBarItem;