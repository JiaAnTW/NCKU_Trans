import React from 'react';
import { LoadingContainer } from '~/theme/global';
import Icon from '~/components/Icon/index.js';

function LoadingFrame({ isFinishRequest, children }) {
    if (!isFinishRequest) {
        return (
            <LoadingContainer>
                <Icon style={{ marginTop: '0' }} />
            </LoadingContainer>
        );
    }

    return children;
}

export default LoadingFrame;
