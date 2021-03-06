import React from 'react';
import { useSelector } from 'react-redux';
import { Card, Table } from 'react-bootstrap';
import Toggle from 'react-toggle';
import Modal from 'react-modal';
import '../css/content.css';
import { contentStyle, cardStyle, cardTextStyle, pStyle } from './contentStyle';
import TitleBar from '../TitleBar';

import {
    useWindowWidth,
    useModalOpen,
    useModalContext,
} from '../../utils/index';

function Content(props) {
    const [isModalOpen, setIsModalOpen] = useModalOpen();
    const [{ id, title, tags, content, confirm }] = useModalContext();
    const onBefore = useSelector((state) => state.modal.onBefore);
    const onNext = useSelector((state) => state.modal.onNext);
    const windowWidth = useWindowWidth();

    const cardHeight = windowWidth < 800 ? '75vh' : '500px';
    const cardBodyWidth = windowWidth < 800 ? '95vw' : '800px';
    const containerMargin = windowWidth < 800 ? '30px 11vw' : '30px 80px';

    return (
        <div className="content_container">
            <Modal
                isOpen={isModalOpen}
                contentLabel="Minimal Modal Example"
                style={contentStyle(windowWidth < 800 ? 'none' : true)}
                className="Modal"
                overlayClassName="Overlay"
                onRequestClose={() => {
                    setIsModalOpen(false);
                }}
            >
                <Card className="card-box" style={cardStyle(cardHeight)}>
                    <Card.Body
                        className="cardBody"
                        style={{ width: cardBodyWidth }}
                    >
                        <div
                            className="card_container"
                            style={{
                                maxWidth: '100%',
                                margin: containerMargin,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <h1 className="title">{title}</h1>
                            <div className="id_container">
                                {'心得編號: ' + id}
                            </div>
                            <Table
                                striped
                                bordered
                                hover
                                className="type_table"
                            >
                                <TitleBar items={tags} mobile={'none'} />
                            </Table>
                            <Card.Text style={cardTextStyle}>
                                <p>{content}</p>
                                <p style={pStyle}></p>
                            </Card.Text>
                            {props.isAdmin && (
                                <>
                                    是否已審查
                                    <Toggle
                                        defaultChecked={confirm === 'true'}
                                        onChange={() => {}}
                                    />
                                </>
                            )}
                        </div>
                    </Card.Body>
                </Card>
                {onNext && (
                    <button
                        className="contentBtn"
                        id="rightBtn"
                        onClick={onNext}
                    >
                        <div className="Arrow" id="rightArrow"></div>
                    </button>
                )}
                {onBefore && (
                    <button
                        className="contentBtn"
                        id="leftBtn"
                        onClick={onBefore}
                    >
                        <div className="Arrow" id="leftArrow"></div>
                    </button>
                )}
            </Modal>
        </div>
    );
}

Modal.setAppElement('body');
export default Content;
