import React, { Component } from 'react';
import CommentIndex from './components/commentIndex';
import MobileFliter from './components/mobileFliter';
import Toggle from 'react-toggle';
import './components/css/toggle.css';
import 'react-tagsinput/react-tagsinput.css';
import './css/edit.css';
import { Card, Badge } from 'react-bootstrap';
import Modal from 'react-modal';
import { getCollege, getDepartment } from './components/http';

var NCKU = {
    LIB: ['中文系', '外文系', '台文系'],
    SCE: ['數學系', '物理系', '化學系', '地科系', '光電系'],
    ENG: [
        '機械系',
        '化工系',
        '材料系',
        '資源系',
        '土木系',
        '水利系',
        '工科系',
        '系統系',
        '航太系',
        '環工系',
        '測量系',
        '醫工系',
        '能源學程',
    ],
    MAN: ['工資系', '交管系', '企管系', '統計系', '會計系'],
    MC: ['醫學系', '牙醫系', '醫技系', '護理系', '職治系', '物治系', '藥學系'],
    SOC: ['政治系', '經濟系', '法律系', '心理系'],
    EECS: ['電機系', '資訊系'],
    CPD: ['建築系', '都計系', '工設系'],
    BIO: ['生科系', '生技系'],
    NON: ['不分系'],
};
var department = [
    ['文學院', 'LIB'],
    ['理學院', 'SCE'],
    ['工學院', 'ENG'],
    ['管理學院', 'MAN'],
    ['醫學院', 'MC'],
    ['社會科學院', 'SOC'],
    ['電資學院', 'EECS'],
    ['規設院', 'CPD'],
    ['生科院', 'BIO'],
    ['其他', 'NON'],
];
var fliter_2 = [
    {
        id: 0,
        now: -1,
        name: '申請年',
        type: 'year',
        option: [
            ['全部年度', -1],
            [107, -1],
            [106, -1],
            [105, -1],
            [104, -1],
        ],
    },
];

class editComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fliter: { year: 'none', confirm: '全部', in_maj: 'none' },
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
            confirm: '',
            showContent: [],
            display: 'block',
            showModal: false,
        };
        this.getClassData = this.getClassData.bind(this);
        this.changeFliter = this.changeFliter.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.getData = this.getData.bind(this);
        this.changeNewId = this.changeNewId.bind(this);
        this.changeRank = this.changeRank.bind(this);
        this.changeId = this.changeId.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleRWD = this.handleRWD.bind(this);
        this.sponMobileMenu = this.sponMobileMenu.bind(this);
        this.changeConfirm = this.changeConfirm.bind(this);
        this.findMobileFliterShow = this.findMobileFliterShow.bind(this);
    }

    findMobileFliterShow(fliter) {
        /*for(var i=0; i<this.state.department.length;++i){
      var controllArray=[0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
      if(this.state.department[i][0]===fliter){
        controllArray[0]=i+1;
        controllArray[i+1]=0;
        return controllArray;
      }
      else{
        for(var j=0;j<this.state.NCKU[this.state.department[i][1]].length;++j)
          if(this.state.NCKU[this.state.department[i][1]][j]===fliter){
            controllArray[0]=i+1;
            controllArray[i+1]=j+1;
            return controllArray;
          }
      }
    }*/
        var output = [0];
        if (fliter === 'in_maj') {
            department.forEach((Element) => [output.push(-1)]);
        } else {
            var clock = new Date();
            for (
                var i = clock.getFullYear();
                i > clock.getFullYear() - 5;
                --i
            ) {
                if (i != clock.getFullYear() || clock.getMonth() + 1 > 7) {
                    output.push(-1);
                }
            }
        }
        return output;
    }

    getClassData() {
        const getPromise = new Promise((resolve) => {
            getCollege.then((data) => {
                department = data.map((Element) => {
                    return [Element.name, Element.english];
                });
                getDepartment.then((dataTwo) => {
                    var output = {};
                    data.forEach((Element) => {
                        output[Element.english] = [];
                        dataTwo.forEach((element) => {
                            if (element.college === Element.name)
                                return output[Element.english].push(
                                    element.name
                                );
                        });
                    });
                    NCKU = output;
                    fliter_2 = [
                        {
                            id: 0,
                            now: -1,
                            name: '申請年',
                            type: 'year',
                            option: [['全部年度', -1]],
                        },
                    ];
                    var output = [];
                    var clock = new Date();
                    for (var i = clock.getFullYear(); i > 1911 + 103; --i) {
                        if (
                            i != clock.getFullYear() ||
                            clock.getMonth() + 1 > 7
                        ) {
                            fliter_2[0].option.push([
                                (i - 1911).toString(),
                                -1,
                            ]);
                        }
                    }
                    resolve();
                });
            });
        });
        return getPromise;
    }

    changeConfirm(e) {
        if (e.target.checked) {
            this.setState({ confirm: 'true' });
        } else {
            this.setState({ confirm: 'false' });
        }
    }

    changeFliter(new_fliter, type) {
        if (type === 'confirm') {
            var output = [];
            const condition = new_fliter === '已審核' ? 'true' : 'false';
            this.state.datas.forEach((Element) => {
                if (new_fliter === '全部' || Element['confirm'] == condition)
                    if (
                        this.state.fliter.in_maj === 'none' ||
                        Element['department'] === this.state.fliter.in_maj ||
                        Element['in_maj'] === this.state.fliter.in_maj
                    )
                        if (
                            this.state.fliter.year === 'none' ||
                            Element['year'] == this.state.fliter.year
                        )
                            output.push(Element);
            });
            this.setState({
                show: output,
                fliter: {
                    year: this.state.fliter.year,
                    in_maj: this.state.fliter.in_maj,
                    confirm: new_fliter,
                },
            });
        } else if (type === 'year') {
            var output = [];
            const condition =
                this.state.fliter.confirm === '已審核' ? 'true' : 'false';
            this.state.datas.forEach((element) => {
                if (
                    element[type] == new_fliter &&
                    (this.state.fliter.in_maj === 'none' ||
                        element['department'] === this.state.fliter.in_maj ||
                        element['in_maj'] === this.state.fliter.in_maj) &&
                    (this.state.fliter.confirm == '全部' ||
                        element['confirm'] === condition)
                )
                    output.push(element);
                else if (new_fliter === 'none') {
                    if (
                        this.state.fliter.in_maj === 'none' ||
                        element['department'] === this.state.fliter.in_maj ||
                        element['in_maj'] === this.state.fliter.in_maj
                    )
                        if (
                            this.state.fliter.confirm == '全部' ||
                            element['confirm'] === condition
                        )
                            output.push(element);
                }
            });
            this.setState({
                show: output,
                fliter: {
                    year: new_fliter,
                    in_maj: this.state.fliter.in_maj,
                    confirm: this.state.fliter.confirm,
                },
            });
        } else {
            const condition =
                this.state.fliter.confirm === '已審核' ? 'true' : 'false';
            this.setState({
                fliter: {
                    year: this.state.fliter.year,
                    in_maj: new_fliter,
                    confirm: this.state.fliter.confirm,
                },
                resetFliter: !this.state.resetFliter,
            });
            if (new_fliter === 'none') {
                if (this.state.mobile_display == 'none')
                    this.setState({
                        fliter: {
                            year: 'none',
                            in_maj: new_fliter,
                            confirm: this.state.fliter.confirm,
                        },
                    });
                var output = [];
                this.state.datas.forEach((element) => {
                    if (
                        this.state.fliter.year === 'none' ||
                        element['year'] == this.state.fliter.year ||
                        (this.state.mobile_display == 'none' &&
                            new_fliter === 'none')
                    )
                        if (
                            this.state.fliter.confirm == '全部' ||
                            element['confirm'] === condition
                        )
                            output.push(element);
                });
                this.setState({ show: output, selectDepartment: 'none' });
            } else {
                var output = [];
                this.state.datas.forEach((element) => {
                    if (
                        element[type] === new_fliter &&
                        (this.state.fliter.year === 'none' ||
                            element['year'] == this.state.fliter.year)
                    )
                        if (
                            this.state.fliter.confirm == '全部' ||
                            element['confirm'] === condition
                        )
                            output.push(element);
                });
                this.setState({ show: output });
            }
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
                    show: data,
                    is_fetch: true,
                });
            })
            .catch((e) => {
                console.log('錯誤:', e);
                location.href = '/#/admin/login';
            });
    }

    handleRWD(mobile) {
        if (mobile) this.setState({ display: 'none' });
        else this.setState({ display: 'block' });
    }

    handleOpenModal(id) {
        const object = this.state.datas;
        let i = 0;
        while (object[i]['id'] != id) i++;
        if (i < object.length) {
            this.setState({ showContent: object[i] });
            this.changeId(i);
        }
    }

    handleClick() {
        const url = '/api/post/major/' + this.state.id.toString();
        const data = {
            id: this.state.new_id != '不變' ? this.state.new_id : this.state.id,
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
                this.setState({ id: -1, is_fetch: false });
                this.getData();
                console.log(data);
            })
            .catch((e) => {
                this.setState({ id: -1, is_fetch: false });
                this.getData();
                console.log('錯誤:', e);
            });
        //this.props.changeLocation((this.state.now_handle==="心得"?"comment":"QA"),"-1")
    }

    deleteComment() {
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
                this.setState({ id: -1, datas: new_data, showModal: false });
            })
            .catch((e) => console.log('錯誤:', e));
        //this.props.changeLocation((this.state.now_handle==="心得"?"comment":"QA"),"-1")
    }

    sponMobileMenu() {
        var option = [['全部學院', -1]];
        department.forEach((Element, Index) => {
            option.push([Element[0], Index + 1]);
        });
        var object = [];
        object.push({
            id: 0,
            name: 'none',
            type: 'department',
            now: -1,
            option: option,
        });
        for (var i = 0; i < department.length; ++i) {
            let singleObject = [];
            singleObject.push(['全部學系', -1]);
            for (var j = 0; j < NCKU[department[i][1]].length; ++j) {
                singleObject.push([NCKU[department[i][1]][j], -1]);
            }
            object.push({
                id: i + 1,
                now: -1,
                name: ['department', department[i][0]],
                type: 'in_maj',
                option: singleObject,
            });
        }
        return object;
    }

    componentDidMount() {
        this.getClassData().then((data) => {
            this.getData();
        });
    }

    changeNewId(e) {
        if (e.target.value != '不變') this.setState({ new_id: e.target.value });
    }

    changeRank(e) {
        this.setState({ rank: e.target.value });
    }

    changeId(e) {
        var i = e;
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
                padding: '3% 7%',
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
                <div style={{ fontSize: '17px' }}>
                    確定要刪除嗎?刪除後無法還原歐~
                </div>
                <div
                    className="btn-container"
                    id="edit"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        marginTop: '30px',
                    }}
                >
                    <button
                        onClick={() => {
                            this.setState({ showModal: false });
                        }}
                        style={{
                            fontWeight: '100',
                            backgroundColor: 'rgb(229,68,109)',
                            width: '40%',
                            color: 'white',
                            border: 'none',
                            padding: '2%',
                        }}
                    >
                        取消
                    </button>
                    <button
                        onClick={this.deleteComment}
                        style={{
                            fontWeight: '100',
                            backgroundColor: 'rgb(229,68,109)',
                            width: '40%',
                            color: 'white',
                            border: 'none',
                            padding: '2%',
                        }}
                    >
                        確定
                    </button>
                </div>
            </Modal>
        );
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

        const switchIndex = () => {
            return (
                <CommentIndex
                    datas={this.state.show}
                    is_fetch={this.state.is_fetch}
                    onClick={this.handleOpenModal}
                    handleRWD={this.handleRWD}
                />
            );
        };

        const table = (id) => {
            if (id != -1)
                return (
                    <div className="check-container">
                        <Card>
                            <button
                                style={{
                                    width: '50px',
                                    height: '50px',
                                    alignSelf: 'flex-start',
                                    padding: '6px 6px',
                                    fontWeight: '100',
                                    borderRadius: '50px',
                                    position: 'absolute',
                                    top: '-20px',
                                    left: '-20px',
                                    backgroundColor: 'rgb(229,68,109)',
                                    border: 'none',
                                    color: 'white',
                                }}
                                onClick={() => {
                                    this.setState({ id: -1 });
                                }}
                            >
                                ←
                            </button>
                            <div style={{ width: '100%', padding: '10% 15%' }}>
                                <table
                                    style={{
                                        width: '100%',
                                        minHeight: '150px',
                                    }}
                                >
                                    <tbody>
                                        <tr>
                                            <td>
                                                <Badge
                                                    variant="danger"
                                                    style={{
                                                        fontWeight: '100',
                                                        backgroundColor:
                                                            'rgb(229,68,109)',
                                                        minWidth: '70px',
                                                    }}
                                                >
                                                    id:
                                                </Badge>
                                            </td>
                                            <td>{this.state.id}</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Badge
                                                    variant="danger"
                                                    style={{
                                                        fontWeight: '100',
                                                        backgroundColor:
                                                            'rgb(229,68,109)',
                                                        minWidth: '70px',
                                                    }}
                                                >
                                                    排名上:{' '}
                                                </Badge>
                                            </td>
                                            <td>{this.state.rank_1}</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Badge
                                                    variant="danger"
                                                    style={{
                                                        fontWeight: '100',
                                                        backgroundColor:
                                                            'rgb(229,68,109)',
                                                        minWidth: '70px',
                                                    }}
                                                >
                                                    排名下:{' '}
                                                </Badge>
                                            </td>
                                            <td>{this.state.rank_2}</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Badge
                                                    variant="danger"
                                                    style={{
                                                        fontWeight: '100',
                                                        backgroundColor:
                                                            'rgb(229,68,109)',
                                                        minWidth: '70px',
                                                    }}
                                                >
                                                    申請年度:
                                                </Badge>
                                            </td>
                                            <td>{this.state.year}</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Badge
                                                    variant="danger"
                                                    style={{
                                                        fontWeight: '100',
                                                        backgroundColor:
                                                            'rgb(229,68,109)',
                                                        minWidth: '70px',
                                                    }}
                                                >
                                                    轉出科系:
                                                </Badge>
                                            </td>
                                            <td>{this.state.out_maj}</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Badge
                                                    variant="danger"
                                                    style={{
                                                        fontWeight: '100',
                                                        backgroundColor:
                                                            'rgb(229,68,109)',
                                                        minWidth: '70px',
                                                    }}
                                                >
                                                    轉入科系:
                                                </Badge>
                                            </td>
                                            <td>{this.state.in_maj}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div
                                style={{
                                    width: '100%',
                                    fontWeight: '100',
                                    lineHeight: '30px',
                                    minHeight: '125px',
                                    fontSize: '17px',
                                    letterSpacing: '3px',
                                }}
                            >
                                {this.state.comment}
                            </div>
                            <div className="confirm-container">
                                <form>
                                    <div className="toggle-container">
                                        <div style={{ marginRight: '10px' }}>
                                            是否確認:
                                        </div>
                                        <div>
                                            <Toggle
                                                defaultChecked={
                                                    this.state.confirm ===
                                                    'true'
                                                }
                                                onChange={this.changeConfirm}
                                            />{' '}
                                        </div>
                                    </div>
                                </form>
                                <div className="btn-container">
                                    <button
                                        onClick={() => {
                                            this.setState({ showModal: true });
                                        }}
                                        style={{ width: '20%' }}
                                    >
                                        刪除
                                    </button>
                                    <button
                                        onClick={this.handleClick}
                                        style={{ width: '70%' }}
                                    >
                                        送出
                                    </button>
                                </div>
                            </div>
                        </Card>
                    </div>
                );
        };

        const Menu = () => {
            if (this.state.is_fetch)
                return (
                    <div
                        className="MobileMenu"
                        style={{
                            marginTop: '55px',
                            position: 'relative',
                            backgroundColor: 'rgb(229,68,109)',
                            minHeight: '35px',
                            maxHeight: '70px',
                            maxWidth: '100vw',
                        }}
                    >
                        <MobileFliter
                            show={this.state.fliter.in_maj}
                            controllArray={this.findMobileFliterShow('in_maj')}
                            mobile={this.state.display}
                            fliter={this.changeFliter}
                            type="依學院/系"
                            value={this.sponMobileMenu()}
                            style={{
                                top: '0px',
                                marginLeft: '20px',
                                width: '340px',
                                backgroundColor: 'rgb(229,68,109)',
                                color: 'white',
                                lineHeight: '31px',
                                fontSize: '12px',
                                outline: 'none',
                            }}
                        />
                        <MobileFliter
                            controllArray={this.findMobileFliterShow('none')}
                            show={this.state.fliter.in_maj}
                            mobile={this.state.display}
                            fliter={this.changeFliter}
                            type="申請年"
                            value={fliter_2}
                            style={{
                                top: '0px',
                                marginLeft: '20px',
                                width: '150px',
                                backgroundColor: 'rgb(229,68,109)',
                                color: 'white',
                                lineHeight: '31px',
                                fontSize: '12px',
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
                                width: '150px',
                                backgroundColor: 'rgb(229,68,109)',
                                color: 'white',
                                marginLeft: '20px',
                                lineHeight: '31px',
                                fontSize: '12px',
                            }}
                        />
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
                            margin: '70px 5%',
                            display: this.state.id === -1 ? 'none' : 'block',
                        }}
                    >
                        <br />
                        {table(this.state.id)}
                        {alert}
                    </div>
                </div>
                <div
                    className="index"
                    style={{
                        display: this.state.id === -1 ? 'block' : 'none',
                        top: '125px',
                    }}
                >
                    {switchIndex()}
                </div>
                {Menu()}
            </div>
        );
    }
}

export default editComment;
