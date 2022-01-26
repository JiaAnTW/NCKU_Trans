import React from 'react';
import Filter from './Filter';

export default function Study({ isAdmin }) {
    return (
        <div>
            <Filter isAdmin={isAdmin} />
        </div>
    );
}
