import React, { Component } from 'react';
import './css/layout.css';
import MobileMenu from './components/mobileMenu.js' 
class layout extends Component {
    constructor(props) {
    super(props);

    }

  render() {
    const normalNav=(
      <nav id="layout-nav">
        <button className="logo" onClick={(e)=>location.href='/#/'} style={{border: "none",outline: "none"}}>Logo</button>
        <a href="https://goo.gl/forms/6MkYePHd03P7Nv8w2" target="_blank" className="navItem" style={{textDecoration:"none"}}>聯絡我們</a><a href="/#/post" className="navItem" style={{textDecoration:"none"}}>分享心得</a><a href="/#/QA/~" className="navItem" style={{textDecoration:"none"}}>常見QA</a><a href="/#/comment" className="navItem" style={{textDecoration:"none"}}>瀏覽心得</a>
        <MobileMenu isAdmin={false}/>
      </nav>
    );
    const adminNav=(
      <nav id="layout-nav">
        <button className="logo" onClick={(e)=>location.href='/#/'} style={{border: "none",outline: "none"}}>Logo</button>
        <a href="/#/admin/major" className="navItem" style={{textDecoration:"none"}}>編輯學系</a><a href="/#/admin/QA" className="navItem" style={{textDecoration:"none"}}>審查QA</a><a href="/#/admin/comment" className="navItem" style={{textDecoration:"none"}}>審查心得</a>
        <MobileMenu isAdmin={true}/>
      </nav>
    );

    return (
      <div className="layout">
        {this.props.children}
        {(this.props.location.pathname.indexOf('admin')!=-1)?adminNav:normalNav}
      </div>
    );
  }
}

export default layout;