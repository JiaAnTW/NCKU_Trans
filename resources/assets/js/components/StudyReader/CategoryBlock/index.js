import React from 'react';
import { BadgeList, CategoryBadge } from './style';

function CategoryBlock({ data }) {
    return (
        <BadgeList>
            {data.map((itemObj, index) => (
                <CategoryBadge key={index} value={itemObj['name']} />
            ))}
        </BadgeList>
    );
}

export default CategoryBlock;
