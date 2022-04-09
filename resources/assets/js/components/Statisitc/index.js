import React from 'react';
import { useMedia } from '~/utils';
import StatisticItem from './StatisticItem';
import {
    StatisticContainer,
    StatisticSection,
    StyledGrid,
    StyledTitle,
} from './style';

const fakeData = [
    {
        dataType: 'float',
        id: '0999cb27-d01e-4dc6-b1d0-2c95cdc193a5',
        avg: 3.5,
        min: 2,
        name: 'GPA4.0',
    },
    {
        dataType: 'int',
        id: '37962797-5179-4f6d-9dce-5c580f4b76a8',
        avg: 880,
        min: 700,
        name: 'TOEIC',
    },
];

function Statistic() {
    const device = useMedia();
    return (
        <>
            {device === 'PC' && (
                <StatisticSection>
                    <StatisticContainer>
                        <StyledGrid>
                            {['資料類別', '平均數字', '最小數字'].map(
                                (item, idx) => (
                                    <StyledTitle key={idx}>{item}</StyledTitle>
                                )
                            )}
                            {fakeData.map((item, idx) => (
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
