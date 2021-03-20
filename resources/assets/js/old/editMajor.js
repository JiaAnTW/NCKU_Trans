import React, { Component } from 'react';
import '@/css/editMajor.css';
import { Collapse, Spinner } from 'react-bootstrap';
import Can from '@/img/can.png';

class editMajor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            college: [],
            department: [],
            watchDepartment: [],
            editCollege: -1,
            editDepartment: -1,
            startEditCol: false,
            startEditDep: false,
            is_fetch: false,
            is_fetch_2: false,
        };
        this.handleClick = this.handleClick.bind(this);
        this.getData = this.getData.bind(this);
        this.getDepartment = this.getDepartment.bind(this);
        this.deleteData = this.deleteData.bind(this);
        this.changeNowHandle = this.changeNowHandle.bind(this);
        this.changeColName = this.changeColName.bind(this);
        this.changeDepName = this.changeDepName.bind(this);
    }

    getData() {
        fetch('/api/get/college', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.props.token,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                var newData = data;
                newData.push({
                    id: -1,
                    name: '',
                    english: '',
                });
                this.setState({
                    college: newData,
                    is_fetch: true,
                });
                this.getDepartment();
                if (this.state.editCollege != -1) {
                    const event = {
                        target: {
                            value: this.state.college[this.state.editCollege]
                                .name,
                        },
                    };
                    this.changeNowHandle(event);
                }
            })
            .catch((e) => {
                console.log('錯誤:', e);
                location.href = '/#/admin/login';
            });
    }

    getDepartment() {
        fetch('/api/get/department', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.props.token,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                var newData = data;
                newData.push({
                    id: -1,
                    name: '',
                    college: '',
                });
                this.setState({
                    department: newData,
                    is_fetch_2: true,
                });
                if (this.state.editCollege != -1) {
                    const event = {
                        target: {
                            value: this.state.college[this.state.editCollege]
                                .name,
                        },
                    };
                    this.changeNowHandle(event);
                }
            })
            .catch((e) => {});
    }

    changeNowHandle(e) {
        var output = [];
        this.state.department.forEach((Element) => {
            if (Element.college === e.target.value) output.push(Element);
        });

        output.push({
            id: -1,
            name: '',
            college: '',
        });
        this.setState({ watchDepartment: output });
    }

    changeColName(e, type) {
        var college = this.state.college;
        college[this.state.editCollege][type] = e.target.value;
        this.setState({ college: college });
    }

    changeDepName(e, type) {
        var department = this.state.watchDepartment;
        department[this.state.editDepartment][type] = e.target.value;
        this.setState({ watchDepartment: department });
    }

    handleCreateData(type) {
        if (type == 'college') {
            const url = '/api/post/college';
            const data = {
                id:
                    this.state.qa_new_id != '不變'
                        ? this.state.qa_new_id
                        : this.state.qa_id,
                question: this.state.qa_q,
                answer: this.state.qa_a,
                confirm: this.state.qa_confirm,
                tags: this.state.tags,
            };
        }
    }

    handleClick(type) {
        if (type == 'college') {
            this.setState({ is_fetch: false });
            var focus = this.state.editCollege;
            var url = '/api/post/college';
            if (focus != this.state.college.length - 1)
                url = url + '/' + this.state.college[focus].id.toString();
            var data = {
                id: this.state.college[focus].id,
                name: this.state.college[focus].name,
                english: this.state.college[focus].english,
            };
            fetch(url, {
                method: focus == this.state.college.length - 1 ? 'POST' : 'PUT',
                body: JSON.stringify(data),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + this.props.token,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    this.getData();
                    console.log(data);
                })
                .catch((e) => {
                    this.getData();
                    console.log('錯誤:', e);
                });
        } else {
            this.setState({ is_fetch_2: false });
            var focus = this.state.editDepartment;
            var url = '/api/post/department';
            if (focus != this.state.watchDepartment.length - 1)
                url =
                    url + '/' + this.state.watchDepartment[focus].id.toString();
            var data = {
                id: this.state.watchDepartment[focus].id,
                name: this.state.watchDepartment[focus].name,
                college: this.state.college[this.state.editCollege].name,
            };
            fetch(url, {
                method:
                    focus == this.state.watchDepartment.length - 1
                        ? 'POST'
                        : 'PUT',
                body: JSON.stringify(data),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + this.props.token,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    this.getDepartment();
                    console.log(data);
                })
                .catch((e) => {
                    this.getDepartment();
                    console.log('錯誤:', e);
                });
        }
        //this.props.changeLocation((this.state.now_handle==="心得"?"comment":"QA"),"-1")
    }

    deleteData(type) {
        if (type == 'college') {
            this.setState({ is_fetch: false });
            var focus = this.state.editCollege;
            var url = '/api/post/college';
            url = url + '/' + this.state.college[focus].id.toString();
            fetch(url, {
                method: 'DELETE',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + this.props.token,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    this.getData();
                    console.log(data);
                })
                .catch((e) => {
                    this.getData();
                    console.log('錯誤:', e);
                });
        } else {
            this.setState({ is_fetch_2: false });
            var focus = this.state.editDepartment;
            var url = '/api/post/department';
            url = url + '/' + this.state.watchDepartment[focus].id.toString();
            fetch(url, {
                method: 'DELETE',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + this.props.token,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    this.getDepartment();
                    console.log(data);
                })
                .catch((e) => {
                    this.getDepartment();
                    console.log('錯誤:', e);
                });
        }
    }

    componentDidMount() {
        this.getData();
    }

    componentWillMount() {
        if (this.props.token === '') location.href = '/#/admin/login';
    }

    render() {
        const spawnCollege = (data, is_fetch) => {
            if (is_fetch) {
                var spawnbtn = data.map((Element, Index) => {
                    if (Index != data.length - 1)
                        return (
                            <div
                                className="option-container"
                                style={{
                                    backgroundColor:
                                        this.state.editCollege == Index
                                            ? '#f77062'
                                            : 'rgb(229,68,109)',
                                }}
                            >
                                <button
                                    value={Element.name}
                                    onClick={(e) => {
                                        this.changeNowHandle(e);
                                        this.setState({
                                            editDepartment: -1,
                                            startEditDep: false,
                                            startEditCol:
                                                this.state.editCollege === Index
                                                    ? !this.state.startEditCol
                                                    : false,
                                            editCollege: Index,
                                        });
                                    }}
                                >
                                    {Element.name}
                                </button>
                                <button
                                    value={Element.name}
                                    className="edit-btn"
                                    onClick={(e) => {
                                        this.changeNowHandle(e);
                                        this.setState({
                                            editDepartment: -1,
                                            startEditDep: false,
                                            startEditCol:
                                                this.state.editCollege === Index
                                                    ? !this.state.startEditCol
                                                    : true,
                                            editCollege: Index,
                                        });
                                    }}
                                ></button>
                            </div>
                        );
                });

                spawnbtn.push(
                    <div className="option-container">
                        <button
                            value={''}
                            style={{
                                backgroundColor:
                                    this.state.editCollege ==
                                    this.state.college.length - 1
                                        ? '#f77062'
                                        : 'rgb(229,68,109)',
                            }}
                            onClick={(e) => {
                                this.changeNowHandle(e);
                                this.setState({
                                    watchDepartment: [],
                                    editDepartment: -1,
                                    startEditDep: false,
                                    startEditCol: !this.state.startEditCol,
                                    editCollege: data.length - 1,
                                });
                            }}
                        >
                            + 新增學院
                        </button>
                    </div>
                );
                return (
                    <div className="box-container">
                        <div className="select-box">
                            點擊學院，系所選單會自動跳出
                            <br />
                            點選編輯符號可開始編輯
                            <div className="btn-container">{spawnbtn}</div>
                        </div>
                        <Collapse in={this.state.startEditCol}>
                            <div className="edit-box">
                                <div>
                                    <p className="input-box">
                                        學院名稱
                                        <input
                                            type="text"
                                            onChange={(e) => {
                                                this.changeColName(e, 'name');
                                            }}
                                            value={
                                                this.state.startEditCol
                                                    ? this.state.college[
                                                          this.state.editCollege
                                                      ].name
                                                    : ''
                                            }
                                        />
                                    </p>
                                    <p className="input-box">
                                        英文簡寫
                                        <input
                                            type="text"
                                            onChange={(e) => {
                                                this.changeColName(
                                                    e,
                                                    'english'
                                                );
                                            }}
                                            value={
                                                this.state.startEditCol
                                                    ? this.state.college[
                                                          this.state.editCollege
                                                      ].english
                                                    : ''
                                            }
                                        />
                                    </p>
                                </div>
                                <div className="send-box">
                                    <button
                                        onClick={(e) => {
                                            this.deleteData('college');
                                        }}
                                    >
                                        <img
                                            src={Can}
                                            alt="search"
                                            style={{ height: '17px' }}
                                        />
                                    </button>
                                    <button
                                        style={{ width: '80%' }}
                                        onClick={(e) => {
                                            this.handleClick('college');
                                        }}
                                    >
                                        送出
                                    </button>
                                </div>
                            </div>
                        </Collapse>
                    </div>
                );
            } else {
                return (
                    <div style={{ height: '150px' }}>
                        <Spinner
                            animation="border"
                            variant="danger"
                            style={{
                                width: '50px',
                                height: '50px',
                                margin: '50px 150px',
                            }}
                        />
                    </div>
                );
            }
        };

        const spawnDepartment = (data, is_fetch) => {
            if (is_fetch && data.length > 1) {
                var spawnbtn = data.map((Element, Index) => {
                    if (Index != data.length - 1)
                        return (
                            <div
                                className="option-container"
                                style={{
                                    backgroundColor:
                                        this.state.editDepartment == Index
                                            ? '#f77062'
                                            : 'rgb(229,68,109)',
                                }}
                            >
                                <button
                                    value={Element.name}
                                    onClick={(e) => {
                                        this.setState({
                                            startEditDep:
                                                this.state.editDepartment ===
                                                Index
                                                    ? !this.state.startEditDep
                                                    : true,
                                            editDepartment: Index,
                                        });
                                    }}
                                >
                                    {Element.name}
                                </button>
                                <button
                                    value={Element.name}
                                    className="edit-btn"
                                    onClick={(e) => {
                                        this.setState({
                                            startEditDep:
                                                this.state.editDepartment ===
                                                Index
                                                    ? !this.state.startEditDep
                                                    : true,
                                            editDepartment: Index,
                                        });
                                    }}
                                ></button>
                            </div>
                        );
                });

                spawnbtn.push(
                    <div className="option-container">
                        <button
                            value={''}
                            style={{
                                backgroundColor:
                                    this.state.editDepartment ==
                                    this.state.watchDepartment.length - 1
                                        ? '#f77062'
                                        : 'rgb(229,68,109)',
                            }}
                            onClick={(e) => {
                                this.setState({
                                    startEditDep:
                                        this.state.editDepartment ===
                                        this.state.watchDepartment.length - 1
                                            ? !this.state.startEditDep
                                            : true,
                                    editDepartment:
                                        this.state.watchDepartment.length - 1,
                                });
                            }}
                        >
                            + 新增系所
                        </button>
                    </div>
                );
                return (
                    <div>
                        <div className="select-box">
                            點選編輯符號可開始編輯
                            <div className="btn-container">{spawnbtn}</div>
                        </div>
                        <Collapse in={this.state.startEditDep}>
                            <div className="edit-box">
                                <div>
                                    <p className="input-box">
                                        所屬學院:{' '}
                                        {this.state.startEditDep
                                            ? this.state.college[
                                                  this.state.editCollege
                                              ].name
                                            : ''}
                                    </p>
                                    <p className="input-box">
                                        系所名稱
                                        <input
                                            type="text"
                                            onChange={(e) => {
                                                this.changeDepName(e, 'name');
                                            }}
                                            value={
                                                this.state.startEditDep
                                                    ? this.state
                                                          .watchDepartment[
                                                          this.state
                                                              .editDepartment
                                                      ].name
                                                    : ''
                                            }
                                        />
                                    </p>
                                </div>
                                <div className="send-box">
                                    <button
                                        onClick={(e) => {
                                            this.deleteData('department');
                                        }}
                                    >
                                        <img
                                            src={Can}
                                            alt="search"
                                            style={{
                                                marginRight: '7px',
                                                height: '17px',
                                            }}
                                        />
                                    </button>
                                    <button
                                        style={{ width: '80%' }}
                                        onClick={(e) => {
                                            this.handleClick('department');
                                        }}
                                    >
                                        送出
                                    </button>
                                </div>
                            </div>
                        </Collapse>
                    </div>
                );
            } else if (data.length > 1) {
                return (
                    <div style={{ height: '150px' }}>
                        <Spinner
                            animation="border"
                            variant="danger"
                            style={{
                                width: '50px',
                                height: '50px',
                                margin: '50px 150px',
                            }}
                        />
                    </div>
                );
            }
        };

        return (
            <div className="editMajor">
                <div className="box">
                    <div className="header">學院區</div>
                    {spawnCollege(this.state.college, this.state.is_fetch)}
                </div>
                <div className="box">
                    <div className="header">
                        {'編輯學院: '}
                        {this.state.editCollege != -1 &&
                        this.state.editCollege != this.state.college.length - 1
                            ? this.state.college[this.state.editCollege].name
                            : '無'}
                    </div>
                    {spawnDepartment(
                        this.state.watchDepartment,
                        this.state.is_fetch_2
                    )}
                </div>
            </div>
        );
    }
}

export default editMajor;
