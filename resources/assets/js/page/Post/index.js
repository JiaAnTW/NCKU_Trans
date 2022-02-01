import React from 'react';
import StepArea from '~/components/Form/StepArea';
import PreviewModal from '~/components/Modal/PreviewModal';

import useInitOptions from './useInitOptions';
import PostForm from './PostForm/index';

import { PostLayout } from './style';
import LoadingFrame from '~/components/LoagingFrame';

function Post({ location }) {
    const isFinishRequest = useInitOptions();
    // const data = location.state

    return (
        <LoadingFrame isFinishRequest={isFinishRequest}>
            <PostLayout>
                <StepArea />
                <PostForm />
                <PreviewModal />
            </PostLayout>
        </LoadingFrame>
    );
}

export default Post;
