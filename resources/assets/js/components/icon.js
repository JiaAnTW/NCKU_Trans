import React, { Component } from 'react';
import './css/icon.css'


class icon extends Component {
    constructor(props) {
        super(props)
      }
  render() {
    return (
        <div className="lds-css-ng-scope"><div style={{width:"100%",height:"100%"}} className="lds-ripple"><div></div><div></div></div>
        </div>
    );
  }
}

export default icon;
