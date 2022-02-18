import React from 'react';
import StepArea from '~/components/Form/StepArea';
import PreviewModal from '~/components/Modal/PreviewModal';

import useInitOptions from './useInitOptions';
import PostForm from './PostForm/index';

import { PostLayout } from './style';
import LoadingFrame from '~/components/LoadingFrame';
import { useHistory } from 'react-router';

function Post() {
    const isFinishRequest = useInitOptions();
    /*     const history = useHistory()
    useCustomHook(history.location.state)
 */
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
