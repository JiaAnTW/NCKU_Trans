import React from 'react';
import { useSelector } from 'react-redux';
import { useMedia } from '~/utils';
import { itemFilterSelector } from '../../model/selector/study';
import StatisticItem from './StatisticItem';
import {
    StatisticContainer,
    StatisticSection,
    StyledGrid,
    StyledTitle,
} from './style';

function Statistic({ isFinishRequest }) {
    const device = useMedia();
    const { statInfo } = useSelector(itemFilterSelector);

    return (
        <>
            {isFinishRequest && device === 'PC' && (
                <StatisticSection>
                    <StatisticContainer>
                        <StyledGrid>
                            {['資料類別', '平均數字', '最小數字'].map(
                                (item, idx) => (
                                    <StyledTitle key={idx} pos={idx}>
                                        {item}
                                    </StyledTitle>
                                )
                            )}
                            {statInfo.map((item, idx) => (
                                <StatisticItem data={item} key={idx} />
                            ))}
                        </StyledGrid>
                    </StatisticContainer>
                </StatisticSection>
            )}
        </>
    );
}

export default Statistic;
