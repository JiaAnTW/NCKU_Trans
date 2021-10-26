import React from 'react';
import { LoadingContainer } from '@/theme/global';
import Icon from '@/components/Icon/index.js';
import StepArea from '@/components/Form/StepArea';
import PreviewModal from '@/components/Modal/PreviewModal';

import useInitOptions from './useInitOptions';
import PostForm from './PostForm/index';

import { PostLayout } from './style';

function Post() {
    const isFinishRequest = useInitOptions();
    if (!isFinishRequest)
        return (
            <LoadingContainer>
                <Icon style={{ marginTop: '0' }} />
            </LoadingContainer>
        );

    return (
        <PostLayout>
            <StepArea />
            <PostForm />
            <PreviewModal />
        </PostLayout>
    );
}

export default Post;
