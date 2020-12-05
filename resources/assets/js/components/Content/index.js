import React from 'react';
import { Card, Table } from 'react-bootstrap';
import Modal from 'react-modal';
import '../css/content.css';
import contentStyle from './contentStyle';
import TitleBar from '../TitleBar';

import {
    useWindowWidth,
    useModalOpen,
    useModalContext,
} from '../../utils/index';

function Content(props) {
    const [isModalOpen, setIsModalOpen] = useModalOpen();
    const [{ id, title, tags, content }] = useModalContext();
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
                <Card
                    className="card-box"
                    style={{
                        position: 'absolute',
                        top: '0px',
                        height: cardHeight,
                        overflowX: 'inline',
                        overflowY: 'auto',
                        left: '0px',
                        backgroundColor: '#F5F5F5',
                        border: 'none',
                        transform: 'translate(0,0)',
                    }}
                >
                    <Card.Body
                        className="cardBody"
                        style={{ width: cardBodyWidth }}
                    >
                        <div
                            className="card_container"
                            style={{
                                maxWidth: '100%',
                                margin: containerMargin,
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
                            <Card.Text
                                style={{
                                    position: 'relative',
                                    top: '5px',
                                    textAlign: 'justify',
                                }}
                            >
                                <div>{content}</div>
                                <p
                                    style={{ width: '100%', height: '70px' }}
                                ></p>
                            </Card.Text>
                        </div>
                    </Card.Body>
                </Card>
                <button className="contentBtn" id="rightBtn" onClick={() => {}}>
                    <div className="Arrow" id="rightArrow"></div>
                </button>
                <button className="contentBtn" id="leftBtn" onClick={() => {}}>
                    <div className="Arrow" id="leftArrow"></div>
                </button>
            </Modal>
        </div>
    );
}

Modal.setAppElement('body');
export default Content;
