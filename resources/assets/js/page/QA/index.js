import React, { useMemo } from 'react';

import {
    LoadingContainer,
    GeneralContainer,
    MenuContainer,
    MultCards,
} from '../../css/generalStyle';

import Icon from '../../components/icon';
import QACardsIndex from './QACardsIndex';
import Content from '../../components/Content/index';
import { useQA } from '../../utils/index';

function MajorQA() {
    const QAData = useQA();

    //---------------資料尚未取得---------------
    if (QAData.length === 0) {
        return (
            <LoadingContainer>
                <Icon style={{ marginTop: '0' }} />
            </LoadingContainer>
        );
    }
    //---------------一般狀況---------------
    return (
        <GeneralContainer>
            <MenuContainer>這裡要放Menu</MenuContainer>
            <MultCards>
                <QACardsIndex itemArr={QAData} />
            </MultCards>
            <Content />
        </GeneralContainer>
    );
}

export default MajorQA;
