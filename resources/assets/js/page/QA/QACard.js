import React, { useState, useCallback } from 'react';
import { Badge, Card } from 'react-bootstrap';
import useQACardStyle from './useQACardStyle';
import { useModalOpen, useModalContext } from '../../utils/index';

const QACard = ({ itemData }) => {
    const { fontSize } = useQACardStyle();
    const [, setIsModalOpen] = useModalOpen();
    const [, setModalContext] = useModalContext();

    const tags = itemData['tag'].split(',').map((tag) => {
        return (
            <Badge
                key={tag}
                style={{
                    lineHeight: '1.5',
                    fontSize: '13px',
                    fontWeight: '200',
                    margin: '5px 10px',
                    borderRadius: '3px',
                    color: 'black',
                    backgroundColor: 'rgba(128,128,128,0.4)',
                }}
            >
                {tag}
            </Badge>
        );
    });

    const handleOpenContent = useCallback(() => {
        setModalContext({
            id: itemData['id'],
            title: itemData['question'],
            content: itemData['answer'],
            tags: itemData['tag'].split(','),
        });
        setIsModalOpen(true);
    }, [itemData, setIsModalOpen]);

    return (
        <Card style={{ width: '100%', height: 'auto', maxWidth: '100%' }}>
            <Card.Body
                style={{
                    width: '100%',
                    height: 'auto',
                    maxWidth: '100%',
                    backgroundColor:
                        itemData['confirm'] == 'false'
                            ? 'rgba(229,68,109,0.3)'
                            : 'white',
                }}
            >
                <Card.Title style={{ fontSize: fontSize, height: 'auto' }}>
                    <div style={{ maxWidth: '95%', textAlign: 'justify' }}>
                        {itemData['question']}
                    </div>
                </Card.Title>
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
                {tags}
            </Card.Body>
        </Card>
    );
};

export default QACard;
