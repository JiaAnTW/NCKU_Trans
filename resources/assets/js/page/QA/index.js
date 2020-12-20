import React, { useMemo } from 'react';

import {
    LoadingContainer,
    GeneralContainer,
    MenuContainer,
    MultCards,
} from '../../css/generalStyle';

import Icon from '../../components/icon';
import QACardsIndex from './presenters/QACardsIndex';
import Content from '../../components/Content/index';
import useInitData from './utils/useInitData';

function MajorQA() {
    const isFinishRequest = useInitData();

    //---------------資料尚未取得---------------
    if (!isFinishRequest) {
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
                <QACardsIndex />
            </MultCards>
            <Content />
        </GeneralContainer>
    );
}

export default MajorQA;
