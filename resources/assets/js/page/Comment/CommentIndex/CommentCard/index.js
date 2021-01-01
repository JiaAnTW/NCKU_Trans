import React, { useState, useCallback } from 'react';
import { Card } from 'react-bootstrap';
import useCommentCardStyle from './useCommentCardStyle';
import { useModalOpen, useModalContext } from '../../../../utils/index';
import transIntoModalData from '../transIntoModalData';

const CommentCard = ({ itemData, index }) => {
    const {
        fontSize,
        wordsNumber,
        cardWidth,
        cardHeight,
        cardTextHeight,
        cardMargin,
    } = useCommentCardStyle();
    const [, setIsModalOpen] = useModalOpen();
    const [, setModalContext] = useModalContext();

    const comment =
        itemData['comment'].length < wordsNumber
            ? itemData['comment']
            : itemData['comment'].substr(0, wordsNumber - 1) + '  (...)';

    const handleOpenContent = useCallback(() => {
        setModalContext(transIntoModalData(itemData, index));
        setIsModalOpen(true);
    }, [itemData, setIsModalOpen, index]);

    return (
        <Card
            style={{
                margin: cardMargin,
                width: cardWidth,
                height: cardHeight,
                maxWidth: '100%',
            }}
        >
            <Card.Body
                style={{
                    maxHeight: '100%',
                    backgroundColor:
                        itemData['confirm'] == 'false'
                            ? 'rgba(229,68,109,0.3)'
                            : 'white',
                }}
            >
                <Card.Title style={{ fontSize: fontSize }}>
                    <a style={{ fontSize: '2rem', marginRight: '1rem' }}>轉</a>
                    {itemData['in_maj']}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    {'由 ' + itemData['out_maj'] + ' 轉出'}
                </Card.Subtitle>
                <Card.Text style={{ height: cardTextHeight }}>
                    {comment}
                </Card.Text>
                <button
                    className="showBtn"
                    onClick={handleOpenContent}
                    style={{
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        width: '100%',
                        height: '75%',
                        backgroundColor: 'rgba(0, 0, 0,0)',
                        border: 'none',
                        outline: 'none',
                    }}
                ></button>
                <Card.Link style={{ color: 'rgb(30,144,255)' }}>
                    {itemData['year']}
                </Card.Link>
                <Card.Link style={{ color: 'rgb(30,144,255)' }}>
                    {itemData['department']}
                </Card.Link>
            </Card.Body>
        </Card>
    );
};

export default CommentCard;
