import React, { Component } from 'react';
import { Button, Badge, Container } from 'react-bootstrap';
import QAIndex from './components/major_QAIndex';
import QA from './components/QA';
import Menu from './components/menu';
import MobileFliter from './components/mobileFliter';
import Search from './img/search.png';
import Funnel from './img/funnel.png';
import Can from './img/can.png';
import Icon from './components/icon';
import './css/major_QA.css';
class maj_QA extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mobile_display: 'none',
            fliter: 'none',
            fliterByWord: '',
            showContentId: -1,
            show: [],
            showContent: {
                question: '',
                answer: '',
                id: -1,
            },
            btnSelect: [],
            is_fetch: false,
            datas: [],
            total_tags: [],
            openFliter: false,
        };
        this.handleBackIndex = this.handleBackIndex.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleRWD = this.handleRWD.bind(this);
        this.handleOpenQA = this.handleOpenQA.bind(this);
        this.handleShowContent = this.handleShowContent.bind(this);
        this.sponCommentMenu = this.sponCommentMenu.bind(this);
        this.countDepartment = this.countDepartment.bind(this);
        this.changeFliter = this.changeFliter.bind(this);
        this.spawnMenu = this.spawnMenu.bind(this);
        this.changeSelectBtn = this.changeSelectBtn.bind(this);
        this.changeFliterByWord = this.changeFliterByWord.bind(this);
    }

    changeFliterByWord(e) {
        //this.setState({fliterByWord: e.target.value});
        const changeState = () =>
            new Promise((resolve, reject) =>
                this.setState({ fliterByWord: e.target.value }, () => resolve())
            );
        changeState().then((value) => {
            this.changeFliter('none');
        });
        //this.changeFliter()
    }

    handleRWD(is_mobile) {
        if (is_mobile)
            this.setState({
                mobile_display: 'none',
                openFliter: false,
            });
        else
            this.setState({
                mobile_display: 'block',
                openFliter: true,
            });
    }

    handleOpenQA(id) {
        let i = 0;
        while (this.state.show[i]['id'] != id) i++;
        if (i < this.state.show.length)
            this.setState({
                showContent: this.state.show[i],
                showContentId: id,
                showModal: true,
            });
        const url = '/QA/' + id;
        const location = {
            pathname: url,
            state: { id: id },
        };

        this.props.history.push(location);
    }

    handleBackIndex() {
        const url = '/QA/~';
        const location = {
            pathname: url,
            state: { id: -1 },
        };
        this.props.history.push(location);
    }

    handleShowContent(type) {
        const data = this.state.show;
        const find = Number(this.props.match.params.id);
        const value = type === 'next' ? 1 : -1;

        const nowIndex = data.findIndex(function (element, index, array) {
            return element['id'] == find.toString();
        });
        if (nowIndex - value < data.length && nowIndex - value >= 0) {
            this.setState({
                showContent: this.state.show[nowIndex - value],
                showContentId: this.state.show[nowIndex - value]['id'],
            });
            const url = '/QA/' + this.state.show[nowIndex - value]['id'];
            const location = {
                pathname: url,
                state: { id: find },
            };

            this.props.history.push(location);
        }
    }

    handleClick() {
        fetch('/api/get/major_QA')
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    datas: data,
                    is_fetch: true,
                    show: data,
                    showContent: data[Number(this.props.match.params.id)],
                });
                this.spawnMenu(data);
            })
            .catch((e) => console.log('錯誤:', e));
    }

    countDepartment(name) {
        var counter = 0;
        this.state.datas.forEach(function (item, index, array) {
            if (item['in_maj'] == name) counter++;
        });
        return counter;
    }

    changeFliter(type) {
        if (this.state.mobile_display === 'none')
            this.setState({ openFliter: false });
        var show = [];
        var tag = [];
        var rst_tag = this.state.total_tags;
        if (type === 'none') {
            rst_tag.forEach((element) => {
                element[1] = false;
            });
        }
        for (var i = 0; i < this.state.total_tags.length; ++i) {
            if (this.state.total_tags[i][1] === true)
                tag.push(this.state.total_tags[i][0]);
        }
        if (type != 'none' && tag.length > 0) {
            this.state.datas.forEach((element) => {
                const array = element['tag'].split(',');
                var isFind = true;
                for (var i = 0; i < array.length && isFind; ++i) {
                    for (var j = 0; j < tag.length && isFind; ++j) {
                        if (
                            array.findIndex((Element) => {
                                return Element === tag[j];
                            }) == -1
                        ) {
                            isFind = false;
                        }
                    }
                }
                if (
                    isFind &&
                    (this.state.fliterByWord === '' ||
                        element['question'].search(this.state.fliterByWord) !=
                            -1)
                ) {
                    show.push(element);
                    return;
                }
            });
            this.setState({ show: show });
        } else {
            this.state.datas.forEach((element) => {
                if (
                    this.state.fliterByWord === '' ||
                    element['question'].search(this.state.fliterByWord) != -1
                ) {
                    show.push(element);
                    return;
                }
            });
        }
        this.setState({ show: show, total_tags: rst_tag });
        return;
    }

    sponCommentMenu() {
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
            MC: ['醫學系', '醫技系', '護理系', '職治系', '物治系', '藥學系'],
            SOC: ['政治系', '經濟系', '法律系', '心理系'],
            EECS: ['電機系', '資訊系'],
            CPD: ['建築系', '都計系', '工設系'],
            BIO: ['生科系', '生技系'],
        };
        const department = [
            ['文學院', 'LIB'],
            ['理學院', 'SCE'],
            ['工學院', 'ENG'],
            ['管理學院', 'MAN'],
            ['醫學院', 'MC'],
            ['社會科學院', 'SOC'],
            ['電資學院', 'EECS'],
            ['規設院', 'CPD'],
            ['生科院', 'BIO'],
        ];
        var output = [];
        for (var i = 0; i < department.length; ++i) {
            let singleOutput = [];
            var dep_number = 0;
            for (var j = 0; j < NCKU[department[i][1]].length; ++j) {
                const number = this.countDepartment(NCKU[department[i][1]][j]);
                dep_number += number;
                singleOutput.push(
                    <Button
                        variant="light"
                        style={{
                            borderRadius: '0px',
                            width: '100%',
                            outline: 'none',
                        }}
                        onClick={this.changeFliter.bind(
                            this,
                            NCKU[department[i][1]][j],
                            'in_maj'
                        )}
                    >
                        {NCKU[department[i][1]][j]}
                        <Badge
                            pill
                            variant="secondary"
                            style={{
                                position: 'relative',
                                marginLeft: '10px',
                                fontWeight: '400',
                            }}
                        >
                            {number}
                        </Badge>
                    </Button>
                );
            }
            output.push(
                <Menu
                    id={department[i][1]}
                    title={department[i][0]}
                    number={dep_number}
                    onClick={this.changeFliter}
                >
                    {singleOutput}
                </Menu>
            );
        }
        return output;
    }

    componentDidMount() {
        this.handleClick();
    }

    spawnMenu(datas) {
        var total_tags = [];
        datas.forEach((element) => {
            if (element['tag'] != '') {
                element['tag'].split(',').forEach((tag) => {
                    for (var i = 0; i < total_tags.length; ++i) {
                        if (total_tags[i][0] === tag) return;
                    }
                    total_tags.push([tag, false]);
                });
            }
        });
        this.setState({ total_tags: total_tags });
    }

    changeSelectBtn(index) {
        var new_tags = this.state.total_tags;
        new_tags[index][1] = !new_tags[index][1];
        this.setState({ total_tags: new_tags });
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.fliter != prevProps.fliter) {
            this.changeFliterByWord({ target: { value: this.props.fliter } });
        }
    }

    render() {
        const menu_display =
            this.props.location.pathname === '/QA/~'
                ? this.state.mobile_display
                : menu_display;
        const fliter_2 = [
            {
                id: 0,
                now: -1,
                name: '順序',
                type: 'none',
                option: [
                    ['由大而小', -1],
                    ['由小而大', -1],
                ],
            },
        ];
        const show =
            this.props.location.pathname === '/QA/~' ? (
                <QAIndex
                    datas={this.state.show}
                    is_fetch={this.state.is_fetch}
                    onClick={this.handleOpenQA}
                    handleRWD={this.handleRWD}
                />
            ) : (
                <QA
                    is_mobile={this.state.mobile_display}
                    data={this.state.showContent}
                    is_fetch={this.state.is_fetch}
                    next={this.handleShowContent}
                    handleBackIndex={this.handleBackIndex}
                />
            );

        const Menu = () => {
            var output = [];
            for (var i = 0; i < this.state.total_tags.length; ++i) {
                output.push(
                    <Button
                        variant="light"
                        onClick={this.changeSelectBtn.bind(this, i)}
                        style={{
                            fontWeight: '300',
                            outline: 'none',
                            margin: '5px 2px',
                            color:
                                this.state.total_tags[i][1] == false
                                    ? 'white'
                                    : 'rgb(229,68,109)',
                            backgroundColor:
                                this.state.total_tags[i][1] == false
                                    ? 'transparent'
                                    : 'white',
                            borderColor: 'rgba(243,243,243,0.5)',
                            borderRadius: '0',
                        }}
                    >
                        {this.state.total_tags[i][0]}
                    </Button>
                );
            }
            return output;
        };

        const landingPage = (
            <div
                className="loading"
                style={{
                    position: 'absolute',
                    width: '100vw',
                    height: '100vh',
                }}
            >
                <Icon style={{ marginTop: '0' }} />
            </div>
        );

        const indexPage = (
            <div>
                <div className="index">{show}</div>
                <div
                    className="MobileMenu"
                    style={{
                        display:
                            this.props.location.pathname === '/QA/~' &&
                            this.state.mobile_display === 'none'
                                ? 'block'
                                : 'none',
                    }}
                >
                    <Button
                        onClick={() =>
                            this.setState({
                                openFliter: !this.state.openFliter,
                            })
                        }
                        style={{
                            outline: 'none',
                            width: '60%',
                            margin: '0px 20%',
                            backgroundColor: 'transparent',
                            border: 'none',
                            boxShadow: 'none',
                        }}
                    >
                        {this.state.openFliter === true
                            ? 'X 關閉'
                            : '+添加篩選'}
                    </Button>
                </div>
                <div
                    className="Menu"
                    style={{
                        boxShadow: 'none',
                        border: 'none',
                        display:
                            (this.props.location.pathname === '/QA/~' ||
                                this.state.mobile_display === 'block') &&
                            this.state.openFliter === true &&
                            this.state.is_fetch
                                ? 'block'
                                : 'none',
                    }}
                >
                    <div
                        className="search-box"
                        style={{ position: 'relative', marginBottom: '20px' }}
                    >
                        <input
                            type="text"
                            border="none"
                            placeholder="查詢標題"
                            onChange={this.changeFliterByWord}
                            style={{
                                border: 'none',
                                width: '80%',
                                margin: '15px 10%',
                                padding: '5px 20px',
                                borderRadius: '10px',
                            }}
                        />
                        <img
                            src={Search}
                            alt="search"
                            style={{
                                position: 'absolute',
                                top: '35%',
                                right: '15%',
                                height: '17px',
                            }}
                        />
                    </div>
                    {Menu()}
                    <Button
                        onClick={this.changeFliter.bind(this, 'tag')}
                        style={{
                            outline: 'none',
                            width: '86%',
                            margin: '5px 7%',
                            backgroundColor: 'white',
                            border: 'none',
                            color: 'rgb(229,68,109)',
                            textShadow: 'none',
                        }}
                    >
                        <img
                            src={Funnel}
                            alt="search"
                            style={{ marginRight: '7px', height: '17px' }}
                        />
                        加入篩選
                    </Button>
                    <Button
                        onClick={this.changeFliter.bind(this, 'none')}
                        style={{
                            outline: 'none',
                            width: '86%',
                            margin: '5px 7%',
                            backgroundColor: 'transparent',
                            borderColor: 'white',
                            textShadow: 'none',
                        }}
                    >
                        <img
                            src={Can}
                            alt="search"
                            style={{ marginRight: '7px', height: '17px' }}
                        />
                        清除篩選
                    </Button>
                </div>
            </div>
        );

        return (
            <div className="major_QA">
                {this.state.is_fetch ? indexPage : landingPage}
            </div>
        );
    }
}

export default maj_QA;
