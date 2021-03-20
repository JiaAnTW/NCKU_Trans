import React, { Component } from 'react';
import '@/css/home.css';
class error extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="App">
                <h1 className="webName">沒有這個頁面耶!</h1>
                <span className="warning">要請你確認一下網址歐</span>
            </div>
        );
    }
}

export default error;
