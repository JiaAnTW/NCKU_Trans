import React from 'react';

import { Main } from './style';
import useInitData from './useInitData';
import { CardsContainer, LoadingContainer } from '~/theme/global';

import Icon from '~/components/Icon/index.js';
import CardList from './CardList';
import ReaderModal from '~/components/Modal/ReaderModal';
import EssayFilter from './EssayFilter';
import Statistic from './Statistic';

import { useCleanMajorFilter } from '../../utils/';

function Major({ isAdmin }) {
    useCleanMajorFilter(); //this part after rendered would not render again (once render)

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
            <Statistic />
            <CardsContainer>
                <CardList />
            </CardsContainer>
            <ReaderModal isAdmin={isAdmin} />
        </Main>
    );
}

export default Major;
