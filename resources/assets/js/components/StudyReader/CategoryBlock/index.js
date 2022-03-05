import React from 'react';
import AdminCategory from './AdminCategory';
import { BadgeList, CategoryBadge } from './style';

function CategoryBlock({ isAdmin, data }) {
    return (
        <BadgeList>
            {data.map((itemObj, index) => (
                <CategoryBadge key={index} value={itemObj['name']} />
            ))}
            {true && <AdminCategory data={data} />}
        </BadgeList>
    );
}

export default CategoryBlock;
