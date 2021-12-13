import React from 'react';

import { Main, ScrollableContainer } from './style';
import useInitData from './useInitData';
import { CardsContainer, LoadingContainer } from '~/theme/global';

import Icon from '~/components/Icon/index.js';
import CardList from './CardList';
import ReaderModal from '~/components/Modal/ReaderModal';
import EssayFilter from './EssayFilter';
import Statistic from './Statistic';

function Major({ isAdmin }) {
    const isFinishRequest = useInitData(isAdmin);

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
            <ScrollableContainer>
                <Statistic />
                <CardsContainer>
                    <CardList />
                </CardsContainer>
            </ScrollableContainer>
            <ReaderModal isAdmin={isAdmin} />
        </Main>
    );
}

export default Major;
