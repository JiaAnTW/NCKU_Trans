import React from 'react';
import AdminCategory from './AdminCategory';
import { BadgeList, CategoryBadge } from './style';

function CategoryBlock({ isAdmin, data }) {
    return (
        <BadgeList>
            {data.map((itemObj) => (
                <CategoryBadge key={itemObj['id']} value={itemObj['name']} />
            ))}
            {true && <AdminCategory data={data} />}
        </BadgeList>
    );
}

export default CategoryBlock;
