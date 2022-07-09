import React from 'react';
import {
    DeleteBox,
    NameBox,
    ResetBox,
    Row,
    SelectBox,
    StudyIDBox,
    ValueBox,
} from '../style';

function Title() {
    return (
        <Row>
            <NameBox>標題</NameBox>
            <ValueBox>內容</ValueBox>
            <StudyIDBox>預覽</StudyIDBox>
            <ResetBox>還原</ResetBox>
            <SelectBox>更動</SelectBox>
            <DeleteBox>刪除</DeleteBox>
        </Row>
    );
}

export default Title;
