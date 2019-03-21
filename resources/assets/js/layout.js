import React, { Component } from 'react';
import './css/layout.css';
import MobileMenu from './components/mobileMenu.js' 
class layout extends Component {
    constructor(props) {
    super(props);
    }

  render() {
    return (
      <div className="layout">
        {this.props.children}
        <nav>
          <a href="https://goo.gl/forms/6MkYePHd03P7Nv8w2" target="_blank" className="navItem">聯絡我們</a><a href="/#/post" className="navItem">分享心得</a><a href="/#/QA/~" className="navItem">常見QA</a><a href="/#/comment" className="navItem">瀏覽心得</a>
          <MobileMenu/>
        </nav>
      </div>
    );
  }
}

export default layout;