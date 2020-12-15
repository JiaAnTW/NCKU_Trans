import React, { useState, useEffect } from 'react';
import { Card, CardDeck, Container, Row, CardGroup } from 'react-bootstrap';
import './css/commentIndex.css';
import Icon from './icon';
import { useWindowWidth } from '../utils/index';
function CommentIndex(props) {
    const windowWidth = useWindowWidth();
    const [row, setRow] = useState(3);
    const [cardWidth, setCardWidth] = useState('20rem');
    const [cardHeight, setCardHeight] = useState('20rem');
    const [cardPadding, setCardPadding] = useState('3rem');
    const [fontSize, setFontSize] = useState('2.7rem');
    const [btnHeight, setBtnHeight] = useState('15rem');
    const [cardTextHeight, setCardTextHeight] = useState('6.06rem');
    const [wordsNumber, setWordsNumber] = useState(35);
    const [IconX, setIconX] = useState('30vw');
    const [IconY, setIconY] = useState('0');

    const handleOpenContent = (id) => {
        props.onClick(id);
    };

    const handleCardSize = (is_mobile) => {
        if (is_mobile) {
            setFontSize('2.2rem');
            setBtnHeight('11rem');
            setCardWidth('100vw');
            setCardHeight('13.5rem');
            setCardPadding('0rem');
            setCardTextHeight('2.06rem');
            setWordsNumber(20);
        } else {
            setFontSize('2.7rem');
            setBtnHeight('15rem');
            setCardWidth('20rem');
            setCardHeight('20rem');
            setCardPadding('3rem');
            setCardTextHeight('6.06rem');
            setWordsNumber(35);
        }
    };
    useEffect(() => {
        changeRowCard();
        window.addEventListener('resize', changeRowCard);

        return () => {
            window.removeEventListener('resize', changeRowCard);
        };
    }, [windowWidth, props]);

    const changeRowCard = () => {
        if (windowWidth > 1400) {
            setRow(5);
            props.handleRWD(false);
            handleCardSize(false);
        } else if (windowWidth >= 1140) {
            setRow(4);
            props.handleRWD(false);
            handleCardSize(false);
        } else if (windowWidth >= 870) {
            setRow(3);
            setIconX('20vw');
            setIconY('0');
            props.handleRWD(false);
            handleCardSize(false);
        } else if (windowWidth >= 596) {
            setRow(2);
            props.handleRWD(true);
            handleCardSize(false);
        } else {
            setRow(1);
            setIconX('25vw');
            setIconY('10vw');
            handleCardSize(true);
            props.handleRWD(true);
        }
    };

    const sponCard = () => {
        if (props.is_fetch) {
            const datas = props.datas;
            var output = [];
            for (var i = 0; i <= datas.length / row; ++i) {
                output.push(sponManyCard(i, datas));
            }
            return (
                <Container style={{ width: '100%', maxWidth: '100%' }}>
                    {output}
                </Container>
            );
        } else return <Icon style={{ marginTop: IconY }} />;
    };

    const sponSingleCard = (number, datas) => {
        var comment =
            datas[number]['comment'].length < wordsNumber
                ? datas[number]['comment']
                : datas[number]['comment'].substr(0, wordsNumber - 1) +
                  '  (...)';
        return (
            <Card
                style={{
                    width: cardWidth,
                    height: cardHeight,
                    maxWidth: '100%',
                }}
            >
                <Card.Body
                    style={{
                        maxHeight: '100%',
                        backgroundColor:
                            datas[number]['confirm'] == 'false'
                                ? 'rgba(229,68,109,0.3)'
                                : 'white',
                    }}
                >
                    <Card.Title style={{ fontSize: fontSize }}>
                        <a style={{ fontSize: '2rem', marginRight: '1rem' }}>
                            轉
                        </a>
                        {datas[number]['in_maj']}
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                        {'由 ' + datas[number]['out_maj'] + ' 轉出'}
                    </Card.Subtitle>
                    <Card.Text style={{ height: cardTextHeight }}>
                        {comment}
                    </Card.Text>
                    <button
                        className="showBtn"
                        onClick={handleOpenContent.bind(
                            this,
                            datas[number]['id']
                        )}
                        style={{
                            position: 'absolute',
                            top: '0',
                            left: '0',
                            width: '100%',
                            height: btnHeight,
                            backgroundColor: 'rgba(0, 0, 0,0)',
                            border: 'none',
                            outline: 'none',
                        }}
                    ></button>
                    <Card.Link style={{ color: 'rgb(30,144,255)' }}>
                        {datas[number]['year']}
                    </Card.Link>
                    <Card.Link style={{ color: 'rgb(30,144,255)' }}>
                        {datas[number]['department']}
                    </Card.Link>
                </Card.Body>
            </Card>
        );
    };

    const sponManyCard = (numberRow, datas) => {
        var output = [];
        for (var i = 0; numberRow * row + i < datas.length && i < row; ++i)
            output.push(
                sponSingleCard(datas.length - numberRow * row - i - 1, datas)
            );
        if (row > 1)
            return (
                <Row style={{ paddingBottom: cardPadding }}>
                    <CardDeck style={{ height: cardHeight }}>{output}</CardDeck>
                </Row>
            );
        else return <Row style={{ paddingBottom: cardPadding }}>{output}</Row>;
    };

    return <div className="commentIndex">{sponCard()}</div>;
}

export default CommentIndex;
