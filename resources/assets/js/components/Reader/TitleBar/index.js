import React from 'react';

import {
    TitleBarLayout,
    TypeIconLarge,
    TitleLayout,
    Title,
    Subtitle,
} from './style';

function TitleBar({ type, title, subtitle }) {
    return (
        <TitleBarLayout>
            <TypeIconLarge type={type}>{type}</TypeIconLarge>
            <TitleLayout>
                <Title>{title}</Title>
                <Subtitle>{subtitle}</Subtitle>
            </TitleLayout>
        </TitleBarLayout>
    );
}

export default TitleBar;
