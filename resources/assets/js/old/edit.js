import React, { Component } from 'react';
import TagsInput from 'react-tagsinput';
import CommentIndex from '@/components/commentIndex';
import QAIndex from '@/components/major_QAIndex';
import MobileFliter from '@/components/mobileFliter';
import 'react-tagsinput/react-tagsinput.css';
import '@/css/edit.css';
import { Table, Button } from 'react-bootstrap';
import Modal from 'react-modal';

class edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            now_handle: 'QA',
            fliter: { year: '' },
            id: -1,
            new_id: '不變',
            id_array: [],
            datas: [],
            show: [],
            is_fetch: false,
            rank_1: '',
            rank_2: '',
            year: 106,
            score: 0,
            out_maj: '',
            in_maj: '',
            comment: '',
            qa_datas: [],
            qa_new_id: '不變',
            qa_id_array: [],
            qa_id: -1,
            qa_q: '',
            qa_a: '',
            confirm: '',
            qa_confirm: '',
            tags: [],
            showContent: [],
            display: 'block',
            showModal: false,
        };
        this.changeFliter = this.changeFliter.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.getData = this.getData.bind(this);
        this.changeNewId = this.changeNewId.bind(this);
        this.changeRank = this.changeRank.bind(this);
        this.changeId = this.changeId.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleRWD = this.handleRWD.bind(this);
    }

    changeFliter(new_fliter, type) {
        if (type == 'null') {
            this.setState({
                now_handle: new_fliter,
                qa_id: -1,
                id: -1,
                show:
                    new_fliter === 'QA'
                        ? this.state.qa_datas
                        : this.state.datas,
            });
            //this.props.changeLocation((new_fliter==="QA"?"QA":"comment"),"-1")
        }
        if (type === 'confirm') {
            var output = [];
            const condition = new_fliter === '已審核' ? 'true' : 'false';
            if (this.state.now_handle === 'QA') {
                this.state.qa_datas.forEach((Element) => {
                    if (
                        new_fliter === '全部' ||
                        Element['confirm'] == condition
                    )
                        output.push(Element);
                });
            } else {
                this.state.datas.forEach((Element) => {
                    if (
                        new_fliter === '全部' ||
                        Element['confirm'] == condition
                    )
                        output.push(Element);
                });
            }
            this.setState({ show: output });
        }
    }

    getData() {
        fetch('/api/get/major/all', {
            method: 'GET',
            headers: new Headers({
                Authorization: 'Bearer ' + this.props.token,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                let input = [];
                for (var i = 0; i < data.length; ++i) input.push(data[i]['id']);
                this.setState({
                    datas: data,
                    id_array: input,
                });
            })
            .catch((e) => console.log('錯誤:', e));
        fetch('/api/get/major_QA')
            .then((res) => res.json())
            .then((data) => {
                let input = [];
                for (var i = 0; i < data.length; ++i) input.push(data[i]['id']);
                this.setState({
                    qa_datas: data,
                    is_fetch: true,
                    qa_id_array: input,
                    show: data,
                });
            })
            .catch((e) => console.log('錯誤:', e));
    }

    handleChange(tags) {
        this.setState({ tags });
    }

    handleRWD(mobile) {
        if (mobile) this.setState({ display: 'none' });
        else this.setState({ display: 'block' });
    }

    handleOpenModal(id) {
        const object =
            this.state.now_handle === '心得'
                ? this.state.datas
                : this.state.qa_datas;
        let i = 0;
        while (object[i]['id'] != id) i++;
        if (i < object.length) {
            this.setState({ showContent: object[i] });
            this.changeId(i);
        }
    }

    handleClick() {
        if (this.state.now_handle === '心得') {
            const url = '/api/post/major/' + this.state.id.toString();
            const data = {
                id:
                    this.state.new_id != '不變'
                        ? this.state.new_id
                        : this.state.id,
                rank_1: this.state.rank_1,
                rank_2: this.state.rank_2,
                year: this.state.year,
                score: this.state.score,
                in_maj: this.state.in_maj,
                out_maj: this.state.out_maj,
                comment: this.state.comment,
                confirm: this.state.confirm,
            };
            fetch(url, {
                method: 'PUT',
                body: JSON.stringify(data),
                mode: 'cors',
                credentials: 'include',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + this.props.token,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                })
                .catch((e) => console.log('錯誤:', e));
        } else {
            const url = '/api/post/major_QA/' + this.state.qa_id.toString();
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
            fetch(url, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + this.props.token,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                })
                .catch((e) => console.log('錯誤:', e));
        }
        //this.props.changeLocation((this.state.now_handle==="心得"?"comment":"QA"),"-1")
    }

    deleteComment() {
        if (this.state.now_handle === '心得') {
            const url = '/api/post/major/' + this.state.id.toString();
            var new_data = this.state.datas;
            new_data.splice(
                new_data.findIndex((Element) => {
                    return Element.id === this.state.id;
                }),
                1
            );
            fetch(url, {
                method: 'DELETE',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + this.props.token,
                }),
            })
                .then((res) => {
                    res.json();
                    this.setState({
                        id: -1,
                        datas: new_data,
                        showModal: false,
                    });
                })
                .catch((e) => console.log('錯誤:', e));
        } else {
            const url = '/api/post/major_QA/' + this.state.qa_id.toString();
            var new_data = this.state.qa_datas;
            new_data.splice(
                new_data.findIndex((Element) => {
                    return Element.id === this.state.qa_id;
                }),
                1
            );
            fetch(url, {
                method: 'DELETE',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + this.props.token,
                }),
            })
                .then((res) => {
                    res.json();
                    this.setState({
                        qa_id: -1,
                        qa_datas: new_data,
                        showModal: false,
                    });
                })
                .catch((e) => console.log('錯誤:', e));
        }
        //this.props.changeLocation((this.state.now_handle==="心得"?"comment":"QA"),"-1")
    }

    componentDidMount() {
        this.getData();
    }

    changeNewId(e) {
        if (e.target.value != '不變') this.setState({ new_id: e.target.value });
    }

    changeRank(e) {
        this.setState({ rank: e.target.value });
    }

    changeId(e) {
        var i = e;
        if (this.state.now_handle === '心得') {
            var real_i = i;
            this.setState({
                id: this.state.datas[real_i]['id'],
                new_id: '不變',
                rank_1: this.state.datas[real_i]['rank_1'],
                rank_2: this.state.datas[real_i]['rank_2'],
                year: this.state.datas[real_i]['year'],
                score: this.state.datas[real_i]['score'],
                in_maj: this.state.datas[real_i]['in_maj'],
                out_maj: this.state.datas[real_i]['out_maj'],
                comment: this.state.datas[real_i]['comment'],
                confirm: this.state.datas[real_i]['confirm'],
            });
        } else {
            var real_i = e;
            //this.state.qa_id_array.findIndex(function(value, index, arr){return value.toString()===i});
            var tags = this.state.qa_datas[real_i]['tag'].split(',');
            this.setState({
                qa_id: this.state.qa_datas[real_i]['id'],
                new_id: '不變',
                qa_q: this.state.qa_datas[real_i]['question'],
                qa_a: this.state.qa_datas[real_i]['answer'],
                tags: tags,
            });
        }
        //this.props.changeLocation((this.state.now_handle==="心得"?"comment":"QA"),e)
    }

    render() {
        const customStyles = {
            content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                padding: '7%',
                backgroundColor: 'white',
            },
        };
        const alert = (
            <Modal
                isOpen={this.state.showModal}
                style={customStyles}
                onRequestClose={() => {
                    this.setState({ showModal: false });
                }}
                className="Modal"
                overlayClassName="Overlay"
            >
                <div>確定要刪除嗎?刪除後無法還原歐~</div>
                <div
                    className="btn-container"
                    id="edit"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                    }}
                >
                    <button
                        onClick={() => {
                            this.setState({ showModal: false });
                        }}
                    >
                        取消
                    </button>
                    <button onClick={this.deleteComment}>確定</button>
                </div>
            </Modal>
        );
        const fliter = [
            {
                id: 0,
                now: -1,
                name: 'none',
                type: 'null',
                option: [
                    ['', -1],
                    ['QA', -1],
                    ['心得', -1],
                ],
            },
        ];
        const fliter2 = [
            {
                id: 0,
                now: -1,
                name: 'none',
                type: 'confirm',
                option: [
                    ['', -1],
                    ['全部', -1],
                    ['已審核', -1],
                    ['未審核', -1],
                ],
            },
        ];
        const option =
            this.state.now_handle === '心得'
                ? this.state.datas.map((data) => {
                      return (
                          <option value={data['id'].toString()}>
                              {data['id']}
                          </option>
                      );
                  })
                : this.state.qa_datas.map((data) => {
                      return (
                          <option value={data['id'].toString()}>
                              {data['id']}
                          </option>
                      );
                  });

        const switchIndex = () => {
            if (this.state.now_handle === '心得') {
                return (
                    <CommentIndex
                        datas={this.state.show}
                        is_fetch={this.state.is_fetch}
                        onClick={this.handleOpenModal}
                        handleRWD={this.handleRWD}
                    />
                );
            } else {
                return (
                    <QAIndex
                        datas={this.state.show}
                        is_fetch={this.state.is_fetch}
                        onClick={this.handleOpenModal}
                        handleRWD={this.handleRWD}
                    />
                );
            }
        };

        const table = () => {
            if (this.state.now_handle === '心得' && this.state.id != -1) {
                return (
                    <div className="check-container">
                        <Button
                            variant="danger"
                            style={{ alignSelf: 'flex-start' }}
                            onClick={() => {
                                this.setState({ id: -1 });
                            }}
                        >
                            ← 返回選單
                        </Button>
                        <Table
                            striped
                            bordered
                            hover
                            style={{ width: '250px', marginTop: '20px' }}
                        >
                            <tbody>
                                <tr>
                                    <td>id</td>
                                    <td>{this.state.id}</td>
                                </tr>
                                <tr>
                                    <td>排名上: </td>
                                    <td>{this.state.rank_1}</td>
                                </tr>
                                <tr>
                                    <td>排名下: </td>
                                    <td>{this.state.rank_2}</td>
                                </tr>
                                <tr>
                                    <td>申請年度:</td>
                                    <td>{this.state.year}</td>
                                </tr>
                                <tr>
                                    <td>轉出科系:</td>
                                    <td>{this.state.out_maj}</td>
                                </tr>
                                <tr>
                                    <td>轉入科系:</td>
                                    <td>{this.state.in_maj}</td>
                                </tr>
                            </tbody>
                        </Table>
                        <div style={{ width: '70%' }}>{this.state.comment}</div>
                        <div className="confirm-container">
                            <form>
                                是否確認: 是
                                <input
                                    type="radio"
                                    name="comfirm"
                                    value="true"
                                    checked={this.state.confirm === 'true'}
                                    onChange={(e) => {
                                        this.setState({
                                            confirm: e.target.value,
                                        });
                                    }}
                                />
                                否
                                <input
                                    type="radio"
                                    name="comfirm"
                                    value="false"
                                    checked={this.state.confirm === 'false'}
                                    onChange={(e) => {
                                        this.setState({
                                            confirm: e.target.value,
                                        });
                                    }}
                                />
                            </form>
                            <button onClick={this.handleClick}>送出</button>
                            <br />
                            <br />
                            <button onClick={this.deleteComment}>
                                刪除該文章
                            </button>
                        </div>
                    </div>
                );
            } else if (this.state.qa_id != -1)
                return (
                    <div className="check-container" style={{}}>
                        <Button
                            variant="danger"
                            style={{ alignSelf: 'flex-start' }}
                            onClick={() => {
                                this.setState({ qa_id: -1 });
                                this.props.changeLocation('QA', '-1');
                            }}
                        >
                            ← 返回選單
                        </Button>
                        <Table
                            striped
                            bordered
                            hover
                            style={{ width: '70%', marginTop: '20px' }}
                        >
                            <tbody>
                                <tr>
                                    <td>id</td>
                                    <td>{this.state.qa_id}</td>
                                </tr>
                                <tr>
                                    <td>問題</td>
                                    <td>{this.state.qa_q}</td>
                                </tr>
                                <tr>
                                    <td>解答</td>
                                    <td>{this.state.qa_a}</td>
                                </tr>
                            </tbody>
                        </Table>
                        <div className="confirm-container">
                            <TagsInput
                                value={this.state.tags}
                                onChange={this.handleChange}
                            />
                            <form>
                                是否確認: 是
                                <input
                                    type="radio"
                                    name="comfirm"
                                    value="true"
                                    checked={this.state.qa_confirm === 'true'}
                                    onChange={(e) => {
                                        this.setState({
                                            qa_confirm: e.target.value,
                                        });
                                    }}
                                />
                                否
                                <input
                                    type="radio"
                                    name="comfirm"
                                    value="false"
                                    checked={this.state.qa_confirm === 'false'}
                                    onChange={(e) => {
                                        this.setState({
                                            qa_confirm: e.target.value,
                                        });
                                    }}
                                />
                            </form>
                            <div className="btn-container">
                                <button onClick={this.handleClick}>送出</button>
                                <button
                                    onClick={() => {
                                        this.setState({ showModal: true });
                                    }}
                                >
                                    刪除該文章
                                </button>
                            </div>
                        </div>
                        <br />
                    </div>
                );
        };

        const form = () => {
            if (this.state.now_handle === '心得' && this.state.id != -1) {
                return (
                    <div className="form_container" style={{}}>
                        文章的新id:
                        <input
                            id="new_id"
                            type="text"
                            value={this.state.new_id}
                            onChange={this.changeNewId}
                        />
                        <br />
                        排名上:
                        <input
                            id="rank"
                            type="text"
                            value={this.state.rank_1}
                            onChange={(e) =>
                                this.setState({ rank_1: e.target.value })
                            }
                        />
                        <br />
                        下:
                        <input
                            id="rank"
                            type="text"
                            value={this.state.rank_2}
                            onChange={(e) =>
                                this.setState({ rank_2: e.target.value })
                            }
                        />
                        <br />
                        申請年度:
                        <input
                            id="year"
                            type="text"
                            value={this.state.year}
                            onChange={(e) =>
                                this.setState({ year: e.target.value })
                            }
                        />
                        <br />
                        <p>
                            學年分數:
                            <br />
                            <input
                                id="score"
                                type="text"
                                value={this.state.score}
                                onChange={(e) =>
                                    this.setState({ score: e.target.value })
                                }
                            />
                        </p>
                        轉出科系:
                        <input
                            id="out_maj"
                            type="text"
                            value={this.state.out_maj}
                            onChange={(e) =>
                                this.setState({ out_maj: e.target.value })
                            }
                        />
                        <br />
                        轉入科系:
                        <input
                            id="in_maj"
                            type="text"
                            value={this.state.in_maj}
                            onChange={(e) =>
                                this.setState({ in_maj: e.target.value })
                            }
                        />
                        <br />
                        心得:
                        <textarea
                            id="comment"
                            value={this.state.comment}
                            onChange={(e) =>
                                this.setState({ comment: e.target.value })
                            }
                        ></textarea>
                        <br />
                        <div className="confirm-container">
                            <form>
                                是否確認: 是
                                <input
                                    type="radio"
                                    name="comfirm"
                                    value="true"
                                    checked={this.state.confirm === 'true'}
                                    onChange={(e) => {
                                        this.setState({
                                            confirm: e.target.value,
                                        });
                                    }}
                                />
                                否
                                <input
                                    type="radio"
                                    name="comfirm"
                                    value="false"
                                    checked={this.state.confirm === 'false'}
                                    onChange={(e) => {
                                        this.setState({
                                            confirm: e.target.value,
                                        });
                                    }}
                                />
                            </form>
                            <button onClick={this.handleClick}>送出</button>
                            <br />
                            <br />
                            <button onClick={this.deleteComment}>
                                刪除該文章
                            </button>
                        </div>
                    </div>
                );
            } else if (this.state.qa_id != -1)
                return (
                    <div
                        className="form_container"
                        style={{ position: 'absolute', maxWidth: '90%' }}
                    >
                        文章的新id:
                        <input
                            id="new_id"
                            type="text"
                            value={this.state.new_id}
                            onChange={this.changeNewId}
                        />
                        <br />
                        <textarea
                            id="comment"
                            value={this.state.qa_q}
                            onChange={(e) =>
                                this.setState({ qa_q: e.target.value })
                            }
                        ></textarea>
                        <br />
                        <textarea
                            id="comment"
                            value={this.state.qa_a}
                            onChange={(e) =>
                                this.setState({ qa_a: e.target.value })
                            }
                        ></textarea>
                        <br />
                        <div>
                            <TagsInput
                                value={this.state.tags}
                                onChange={this.handleChange}
                            />
                            <button onClick={this.handleClick}>送出</button>
                            <br />
                            <br />
                            <button onClick={this.deleteComment}>
                                刪除該文章
                            </button>
                        </div>
                        <br />
                    </div>
                );
        };
        return (
            <div className="edit">
                <div
                    className="Menu"
                    style={{
                        height: 'auto',
                        position: 'absolute',
                        top: '50px',
                        left: '0px',
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <div
                        style={{
                            width: '90%',
                            margin: '5% 5%',
                            display:
                                this.state.id === -1 && this.state.qa_id === -1
                                    ? 'none'
                                    : 'block',
                        }}
                    >
                        <br />
                        {table()}
                        {alert}
                    </div>
                </div>
                <div
                    className="index"
                    style={{
                        display:
                            this.state.id === -1 && this.state.qa_id === -1
                                ? 'block'
                                : 'none',
                        top: '100px',
                    }}
                >
                    {switchIndex()}
                </div>
                <div
                    className="MobileMenu"
                    style={{
                        marginTop: '55px',
                        position: 'relative',
                        backgroundColor: 'rgb(229,68,109)',
                        minHeight: '30px',
                        maxHeight: '60px',
                    }}
                >
                    <MobileFliter
                        show={'QA'}
                        controllArray={[0, -1]}
                        mobile={this.state.display}
                        fliter={this.changeFliter}
                        type="編輯類別"
                        value={fliter}
                        style={{
                            position: 'absolute',
                            marginLeft: '0%',
                            width: '150px',
                            backgroundColor: 'rgb(229,68,109)',
                            color: 'white',
                            lineHeight: '31px',
                            fontSize: '12px',
                            height: '30px',
                        }}
                    />
                    <MobileFliter
                        show={'全部'}
                        controllArray={[0, -1]}
                        mobile={this.state.display}
                        fliter={this.changeFliter}
                        type="是否審核"
                        value={fliter2}
                        style={{
                            position: 'absolute',
                            marginLeft: '170px',
                            width: '150px',
                            backgroundColor: 'rgb(229,68,109)',
                            color: 'white',
                            lineHeight: '31px',
                            fontSize: '12px',
                            height: '30px',
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default edit;
