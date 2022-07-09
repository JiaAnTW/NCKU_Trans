import React from 'react';
import { CategoriesIcon, StatInfosIcon, Title, YearsIcon } from './style';

const mapTypeToIcon = (type) => {
    switch (type) {
        case 'category':
            return CategoriesIcon;
        case 'statInfo':
            return StatInfosIcon;
        case 'year':
            return YearsIcon;
        default:
            return CategoriesIcon;
    }
};

function ItemFilterColumnTitle({ optionsArr }) {
    const Icon = mapTypeToIcon(optionsArr.type);

    return (
        <Title>
            <Icon />
            {optionsArr.name}
        </Title>
    );
}

export default ItemFilterColumnTitle;
