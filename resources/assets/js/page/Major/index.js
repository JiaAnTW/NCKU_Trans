import React from 'react';

import { Main } from './style';

import { CardsContainer } from '~/theme/global';
import CardList from './CardList';
import ReaderModal from '~/components/Modal/ReaderModal';
import EssayFilter from './EssayFilter';
import Statistic from './Statistic';
import LoadingFrame from '~/components/LoagingFrame';
import useCloseReader from '~/utils/seo/useCloseReader';

import useInitData from './useInitData';

function Major({ isAdmin }) {
    const isFinishRequest = useInitData({ isAdmin, num: 30 });
    const { handleCloseReader } = useCloseReader();

    return (
        <LoadingFrame isFinishRequest={isFinishRequest}>
            <Main>
                <EssayFilter />
                <Statistic />
                <CardsContainer>
                    <CardList isAdmin={isAdmin} />
                </CardsContainer>
                <ReaderModal isAdmin={isAdmin} onClose={handleCloseReader} />
            </Main>
        </LoadingFrame>
    );
}

export default Major;
