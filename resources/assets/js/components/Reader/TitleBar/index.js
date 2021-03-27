import React from 'react';

import {
    TitleBarLayout,
    TypeIconLarge,
    TitleLayout,
    Title,
    Subtitle,
} from './style';

const mapTypeToWording = (type) => {
    switch (type) {
        case 'major':
            return '轉';
        case 'sub':
            return '輔';
        case 'double':
            return '雙';
        default:
            return '';
    }
};

function TitleBar({ type, title, subtitle }) {
    return (
        <TitleBarLayout>
            <TypeIconLarge type={type}>{mapTypeToWording(type)}</TypeIconLarge>
            <TitleLayout>
                <Title>{title}</Title>
                <Subtitle>{subtitle}</Subtitle>
            </TitleLayout>
        </TitleBarLayout>
    );
}

export default TitleBar;
