import React from 'react';

import Search from './Search';
import Filter from './Filter';
import CardList from './CardList';
import { Container } from './style';

export default function Study({ isAdmin }) {
    return (
        <Container>
            <Search />
            <Filter isAdmin={isAdmin} />
            <CardList />
        </Container>
    );
}
