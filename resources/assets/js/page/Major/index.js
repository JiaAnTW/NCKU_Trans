import React from 'react';

import { Main, ScrollableContainer } from './style';
import useInitData from './useInitData';
import { CardsContainer, LoadingContainer } from '~/theme/global';

import Icon from '~/components/Icon/index.js';
import CardList from './CardList';
import ReaderModal from '~/components/Modal/ReaderModal';
import EssayFilter from './EssayFilter';
import Statistic from './Statistic';
import LoadingFrame from '~/components/LoagingFrame';

function Major({ isAdmin }) {
    const isFinishRequest = useInitData(isAdmin);

    return (
        <LoadingFrame isFinishRequest={isFinishRequest}>
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
        </LoadingFrame>
    );
}

export default Major;
