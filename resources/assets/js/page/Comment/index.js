import React from 'react';

import { 
    LoadingContainer,
    GeneralContainer,
    MenuContainer,
    MultCards,
} from '../../css/generalStyle';

import { 
    CommentSection,
    StatisticContainer,
} from './style';

import Icon from '../../components/icon';

import { useMajor } from '../../utils/index';

function Comment() {
    const majorData = useMajor();


    //---------------資料尚未取得---------------
    if(majorData.length === 0) {
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
            <CommentSection>
                <StatisticContainer>
                    這裡放統計元件
                </StatisticContainer>  
                <MultCards>
                    這裡要放卡片
                </MultCards>
            </CommentSection>
        </GeneralContainer>
    );
}

export default Comment;