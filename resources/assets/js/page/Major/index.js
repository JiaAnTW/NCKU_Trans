import React from 'react';

import { Main } from './style';
import useInitData from '@/page/Comment/useInitData';
import { CardsContainer, LoadingContainer } from '@/theme/global';

import Icon from '@/components/icon';
import CardList from './CardList';
import ReaderModal from '@/components/Modal/ReaderModal';
import EssayFilter from './EssayFilter';
import Statistic from './Statistic';

function Major({ isAdmin }) {
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
        <Main>
            <EssayFilter />
            <Statistic />
            <CardsContainer>
                <CardList />
            </CardsContainer>
            <ReaderModal isAdmin={isAdmin} />
        </Main>
    );
}

export default Major;
