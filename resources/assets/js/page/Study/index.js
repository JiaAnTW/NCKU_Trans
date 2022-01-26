import React from 'react';

import Search from './Search';
import Filter from './Filter';
import CardList from './CardList';
import { Container } from './style';

export default function Study() {
    return (
        <Container>
            <Search />
            <Filter />
            <CardList />
        </Container>
    );
}
