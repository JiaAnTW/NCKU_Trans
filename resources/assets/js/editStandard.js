import React, { Component } from 'react';
import {
    Dropdown,
    InputGroup,
    DropdownButton,
    Button,
    Spinner,
} from 'react-bootstrap';
import './css/editStandard.css';

class editStandard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            target: 0,
            year: '',
            link: '',
            data: [],
            is_new: 0,
            is_fetch: false,
            is_send: false,
        };
        this.handleClick = this.handleClick.bind(this);
        this.getData = this.getData.bind(this);
        this.changeData = this.changeData.bind(this);
    }

    getData() {
        fetch('/api/get/standard', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.props.token,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                var clock = new Date();
                var newData = data;
                /*newData.sort((front,back)=>{
              return Number(back.year)-Number(front.year);
          })
          for(var i=0;i<data.length;++i){

            if(data[data.length-1-i].year!=(clock.getFullYear()-1911-i).toString()){
                newData.push({year:clock.getFullYear()-1911-i,link:"",newData:true});
                this.setState({is_new:this.state.is_new+1});
            }
            else
                break;
          }*/

                this.setState({
                    data: newData,
                    is_fetch: true,
                    link: newData[newData.length - 1].link,
                    target: newData.length - 1,
                    year: clock.getFullYear() - 1911,
                });
            })
            .catch((e) => {
                console.log('錯誤:', e);
                location.href = '/#/admin/login';
            });
    }

    handleClick() {
        this.setState({ is_send: true });
        var url = '/api/post/standard';
        var method = '';
        //if(this.state.target<this.state.data.length-this.state.is_new-1){
        url = url + '/' + '1';
        method = 'PUT';
        // }
        //else{
        //method='POST'
        //}
        var data = {
            year: this.state.data[this.state.target].year,
            link: this.state.data[this.state.target].link,
        };
        fetch(url, {
            method: method,
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.props.token,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                this.setState({ is_send: false });
                console.log(data);
            })
            .catch((e) => {
                this.setState({ is_send: false });
                console.log('錯誤:', e);
            });
        //this.props.changeLocation((this.state.now_handle==="心得"?"comment":"QA"),"-1")
    }

    changeData(e) {
        var data = this.state.data;
        data[this.state.target].link = e.target.value;
        this.setState({ data: data, link: e.target.value });
    }

    componentDidMount() {
        this.getData();
    }

    componentWillMount() {
        if (this.props.token === '') location.href = '/#/admin/login';
    }

    render() {
        const content = () => {
            if (this.state.is_fetch) {
                return (
                    <div className="input-box">
                        <input
                            value={this.state.link}
                            style={{ height: '34px' }}
                            onChange={this.changeData}
                        />
                        <Button
                            variant="light"
                            onClick={this.handleClick}
                            style={{ borderRadius: '0' }}
                            disabled={this.state.is_send}
                        >
                            {this.state.is_send ? (
                                <div>
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                        style={{
                                            width: '18px',
                                            height: '18px',
                                        }}
                                    />
                                    傳送中
                                </div>
                            ) : (
                                '送出'
                            )}
                        </Button>
                    </div>
                );
            }
        };

        return (
            <div className="editStandard">
                <div
                    style={{
                        color: 'white',
                        fontSize: '16px',
                        width: '350px',
                        marginBottom: '20px',
                        textAlign: 'center',
                    }}
                >
                    放學校公布的轉系標準規定網址的地方
                </div>
                {content()}
            </div>
        );
    }
}

export default editStandard;
