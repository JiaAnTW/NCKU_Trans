import React, { useCallback } from 'react';
import useInitData from './useInitData';
import LoadingFrame from '~/components/LoadingFrame';
import Table from './Table';
import { useSelector } from 'react-redux';
import Submit from './Submit';

function Other() {
    const isFinishRequest = useInitData();
    const otherStatData = useSelector((state) => state.study.otherStatData);
    const handleClick = useCallback(
        (e) => {
            e.preventDefault();
            // pending to implement dispatch here
        },
        [otherStatData]
    );
    return (
        <LoadingFrame isFinishRequest={isFinishRequest}>
            {otherStatData ? <Table data={otherStatData} /> : ''}
            <Submit onClick={handleClick} />
        </LoadingFrame>
    );
}

export default Other;
