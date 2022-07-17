import React from 'react';

import { CardsContainer } from '~/theme/global';
import ReaderModal from '~/components/Modal/ReaderModal';
import LoadingFrame from '~/components/LoadingFrame';
import useCloseReader from '~/utils/seo/useCloseReader';
import { useMedia } from '~/utils';

import { Main } from './style';
import CardList from './CardList';
import EssayFilter from './EssayFilter';
import Statistic from './Statistic';
import useInitData from './useInitData';
import Reader from '~/components/Reader';

function Major({ isAdmin }) {
    const isFinishRequest = useInitData({ isAdmin, num: 30 });
    const { handleCloseReader } = useCloseReader();
    const device = useMedia();

    return (
        <LoadingFrame isFinishRequest={isFinishRequest}>
            <Main>
                <EssayFilter />
                <Statistic />
                <CardList isAdmin={isAdmin} />
                <ReaderModal
                    isAdmin={isAdmin}
                    readerComponent={Reader}
                    onClose={handleCloseReader}
                />
            </Main>
        </LoadingFrame>
    );
}

export default Major;
