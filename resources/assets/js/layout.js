import React, { Component } from 'react';
import './css/layout.css';
class layout extends Component {
    constructor(props) {
    super(props);
    }

  render() {
    return (
      <div className="layout">
        <nav><a>聯絡我們</a><a href="/#/post">分享心得</a><a>常見QA</a><a href="/#/comment">瀏覽心得</a></nav>
        {this.props.children}
      </div>
    );
  }
}

export default layout;