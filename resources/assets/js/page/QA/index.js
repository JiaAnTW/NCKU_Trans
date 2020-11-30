import React from 'react';

import { 
    LoadingContainer,
    GeneralContainer,
    MenuContainer,
    MultCards,
} from '../../css/generalStyle';

import Icon from '../../components/icon';

import { useQA } from '../../utils/index';

function MajorQA() {
    const QAData = useQA();


    //---------------資料尚未取得---------------
    if(QAData.length === 0) {
        return(
            <LoadingContainer>
                <Icon style={{marginTop:"0"}}/>
            </LoadingContainer>
        );
    }
    //---------------一般狀況---------------
    return(
        <GeneralContainer>
            <MenuContainer>
                這裡要放Menu
            </MenuContainer>
                <MultCards>
                    這裡要放卡片
                </MultCards>
        </GeneralContainer>
    );
}

export default MajorQA;