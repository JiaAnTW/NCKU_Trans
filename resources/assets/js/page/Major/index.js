import React from 'react';

import { Main, ScrollableContainer } from './style';
import useInitData from './useInitData';
import { CardsContainer, LoadingContainer } from '~/theme/global';

import CardList from './CardList';
import ReaderModal from '~/components/Modal/ReaderModal';
import EssayFilter from './EssayFilter';
import Statistic from './Statistic';
import LoadingFrame from '~/components/LoagingFrame';
import useCloseReader from '~/utils/seo/useCloseReader';

function Major({ isAdmin }) {
    const isFinishRequest = useInitData(isAdmin);
    const { handleCloseReader } = useCloseReader();

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
                <ReaderModal isAdmin={isAdmin} onClose={handleCloseReader} />
            </Main>
        </LoadingFrame>
    );
}

export default Major;
