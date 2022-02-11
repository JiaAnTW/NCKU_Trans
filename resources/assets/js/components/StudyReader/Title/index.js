import React from 'react';
import { PostYearSpan, StyledTitle } from './style';

function Title({ title, postTime }) {
    return (
        <>
            <StyledTitle>{title}</StyledTitle>
            <PostYearSpan>{postTime}</PostYearSpan>
        </>
    );
}

export default Title;
