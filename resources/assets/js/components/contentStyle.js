import React from 'react'


function contentStyle(props){
    return (
        {
        content : {
          top                   : (props.mobile==="none")?"45%":'50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)',
          width: (props.mobile==="none")?"95vw":"800px",
          height: (props.mobile==="none")?"75vh":"500px",
          maxHeight: '500px',
        }
      }
    );
}
    
export default contentStyle;