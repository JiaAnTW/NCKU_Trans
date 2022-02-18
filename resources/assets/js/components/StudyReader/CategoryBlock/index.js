import React from 'react';
import { BadgeList, CategoryBadge } from './style';

function CategoryBlock({ data }) {
    return (
        <BadgeList>
            {data.map((itemObj) => (
                <CategoryBadge key={itemObj['id']} value={itemObj['name']} />
            ))}
        </BadgeList>
    );
}

export default CategoryBlock;
