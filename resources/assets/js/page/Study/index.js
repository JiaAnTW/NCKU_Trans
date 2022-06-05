import React from 'react';
import LoadingFrame from '~/components/LoadingFrame';
import Filter from './Filter';
import CardList from './CardList';
import { Container } from './style';
import useInitData from './useInitData';
import ReaderModal from '~/components/Modal/ReaderModal';
import useCloseReader from '~/utils/seo/useCloseReader';
import StudyReader from '~/components/StudyReader';
import Statistic from '~/components/Statisitc';

export default function Study({ isAdmin }) {
    const isFinishRequest = useInitData({ isAdmin, num: 30 });
    const { handleCloseReader } = useCloseReader();

    return (
        <>
            <Container>
                <Filter isAdmin={isAdmin} />
                <CardList isAdmin={isAdmin} isFinishRequest={isFinishRequest} />
                <Statistic />
            </Container>
            <ReaderModal
                isAdmin={isAdmin}
                readerComponent={StudyReader}
                onClose={handleCloseReader}
            />
        </>
    );
}
