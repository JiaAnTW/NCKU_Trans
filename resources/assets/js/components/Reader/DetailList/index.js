import React from 'react';
import styled from 'styled-components';

import DetailItem from './DetailItem';

const DetailListLayout = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 20px 0px;
`;

function DetailList({ value }) {
    return (
        <DetailListLayout>
            {value.map(({ type, value }) => (
                <DetailItem type={type} value={value} key={type} />
            ))}
        </DetailListLayout>
    );
}

export default DetailList;
