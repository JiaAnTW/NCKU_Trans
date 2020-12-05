import React, { Component } from 'react';
import './css/icon.css';

class icon extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const outsideColor = this.props.isWhite ? 'white' : '#cc3d61';
        const insideColor = this.props.isWhite
            ? 'rgba(255,255,255,0.6)'
            : '#cc3d61';
        return (
            <div className="lds-css-ng-scope" style={this.props.style}>
                <div
                    style={{ width: '100%', height: '100%' }}
                    className="lds-ripple"
                >
                    <div style={{ borderColor: outsideColor }}></div>
                    <div style={{ borderColor: insideColor }}></div>
                </div>
            </div>
        );
    }
}

export default icon;
