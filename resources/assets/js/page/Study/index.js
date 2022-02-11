import React from 'react';
import LoadingFrame from '~/components/LoadingFrame';
import Search from './Search';
import Filter from './Filter';
import CardList from './CardList';
import { Container } from './style';
import useInitData from './useInitData';
import ReaderModal from '~/components/Modal/ReaderModal';
import useCloseReader from '~/utils/seo/useCloseReader';
import StudyReader from '~/components/StudyReader';

export default function Study({ isAdmin }) {
    const isFinishRequest = useInitData({ isAdmin, num: 30 });
    const { handleCloseReader } = useCloseReader();

    return (
        <LoadingFrame isFinishRequest={isFinishRequest}>
            <Container>
                <Search />
                <Filter />
                <CardList />
            </Container>
            <ReaderModal
                isAdmin={isAdmin}
                readerComponent={StudyReader}
                onClose={handleCloseReader}
            />
        </LoadingFrame>
    );
}
