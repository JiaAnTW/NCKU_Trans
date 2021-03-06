import React, { Component } from 'react';
import { Dropdown, ButtonToolbar } from 'react-bootstrap';

class mobileFliter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            select: [],
            value: [[]],
            type: [],
            styleBtn: [],
            showTag: [],
            data: [],
        };
        this.spawnDropdown = this.spawnDropdown.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(name, next, id, now, type) {
        var new_now = -1;
        for (var i = 0; i < this.state.data[id]['option'].length; ++i) {
            if (this.state.data[id]['option'][i][0] === name) {
                new_now = i;
                break;
            }
        }

        if (new_now === 0) {
            if (id === 0) this.props.fliter('none', type);
            else
                this.props.fliter(
                    this.state.data[id]['name'][1],
                    this.state.data[id]['name'][0]
                );
        } else {
            this.props.fliter(name, type);
        }
        var showTag = this.state.showTag;
        showTag[id] = name;
        this.setState({ showTag: showTag });
        if (next != -1) {
            var new_style = this.state.styleBtn;
            new_style[next] = { display: 'block' };
            this.setState({ styleBtn: new_style });
        }
        var new_data = this.state.data;
        if (now != -1 && now != 0) {
            var blockItem = now;
            var checkItem = id;
            while (new_data[checkItem]['option'][1][1] != -1) {
                var new_style = this.state.styleBtn;
                const next_id = new_data[checkItem]['option'][blockItem][1];
                new_style[next_id] = { display: 'none' };
                new_data[checkItem]['now'] = -1;
                showTag[next_id] = new_data[next_id]['option'][0][0];
                this.setState({ styleBtn: new_style, showTag: showTag });
                blockItem = new_data[next_id]['option']['now'];
                checkItem = new_data[next_id]['id'];
            }
        }
        new_data[id]['now'] = new_now;
        this.setState({ data: new_data });
    }

    componentWillMount() {
        const test = this.props.value;
        const showId = this.props.controllArray;
        var new_style = [];
        var showTag = [];
        for (var i = 0; i < test.length; ++i) {
            var style = {};
            var tag = '';
            if (showId[i] === -1) {
                style = {
                    display: 'none',
                    backgroundColor: 'rgb(229,68,109)',
                    outline: 'none',
                    height: '85%',
                };
                tag = test[i]['option'][0][0];
            } else {
                style = {
                    display: 'block',
                    backgroundColor: 'rgb(229,68,109)',
                    outline: 'none',
                    height: '85%',
                };
                tag = test[i]['option'][showId[i]][0];
                test[i]['now'] = showId[i];
            }
            new_style.push(style);
            showTag.push(tag);
        }
        this.setState({ styleBtn: new_style, showTag: showTag, data: test });
    }

    spawnDropdown() {
        const width = this.props.mobile === 'none' ? '20.5vw' : '85px';
        const itemWidth = this.props.mobile === 'none' ? '20.2vw' : '80px';
        const data = this.state.data;
        var output = [];
        for (var i = 0; i < data.length; ++i) {
            var object = data[i];
            const o_output = object['option'].map((option) => {
                return (
                    <Dropdown.Item
                        style={{
                            outline: 'none',
                            backgroundColor: 'rgb(229,68,109)',
                            color: 'white',
                            fontSize: '12px',
                            width: itemWidth,
                            textAlign: 'center',
                            padding: '0.25rem 0.4rem',
                        }}
                        onClick={this.handleClick.bind(
                            this,
                            option[0],
                            option[1],
                            object['id'],
                            object['now'],
                            object['type']
                        )}
                    >
                        {option[0]}
                    </Dropdown.Item>
                );
            });
            output.push(
                <Dropdown style={this.state.styleBtn[i]}>
                    <Dropdown.Toggle
                        variant="Info"
                        id="dropdown-basic"
                        style={{
                            margin: '2px 0px',
                            height: '85%',
                            outline: 'none',
                            backgroundColor: 'rgb(229,68,109)',
                            color: 'white',
                            fontSize: '12px',
                            width: width,
                        }}
                    >
                        {this.state.showTag[i]}
                    </Dropdown.Toggle>
                    <Dropdown.Menu
                        style={{
                            backgroundColor: 'rgb(229,68,109)',
                            color: 'white',
                            width: '80px',
                            minWidth: width,
                        }}
                    >
                        {o_output}
                    </Dropdown.Menu>
                </Dropdown>
            );
        }
        return output;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.reset != this.props.reset) {
            var output = [];
            var style = [];
            for (var i = 0; i < this.state.data.length; i++) {
                output.push(this.state.data[i]['option'][0][0]);
                if (i != 0)
                    style.push({
                        display: 'none',
                        backgroundColor: 'rgb(229,68,109)',
                        outline: 'none',
                        height: '85%',
                    });
                else
                    style.push({
                        display: 'block',
                        backgroundColor: 'rgb(229,68,109)',
                        outline: 'none',
                        height: '85%',
                    });
            }
            this.setState({ showTag: output, styleBtn: style });
        }
    }

    render() {
        return (
            <ButtonToolbar style={this.props.style}>
                {this.props.type + ': '}
                {this.spawnDropdown()}
            </ButtonToolbar>
        );
    }
}

export default mobileFliter;
