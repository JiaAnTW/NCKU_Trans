import React from 'react';
import AdminCategory from './AdminCategory';
import { BadgeList, CategoryBadge } from './style';

function CategoryBlock({ id, isAdmin, data }) {
    return (
        <BadgeList>
            {data.map((itemObj, index) => (
                <CategoryBadge key={index} value={itemObj['name']} />
            ))}
            {true && <AdminCategory id={id} data={data} />}
        </BadgeList>
    );
}

export default CategoryBlock;
