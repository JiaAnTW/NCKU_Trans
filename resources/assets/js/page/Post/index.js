import React from 'react';
import StepArea from '~/components/Form/StepArea';
import PreviewModal from '~/components/Modal/PreviewModal';

import useInitOptions from './useInitOptions';
import PostForm from './PostForm/index';

import { PostLayout } from './style';
import LoadingFrame from '~/components/LoadingFrame';
import { readerList } from '~/components/Form/typeList';
import { useSelector } from 'react-redux';

function Post() {
    const isFinishRequest = useInitOptions();
    const type = useSelector((state) => state.post.type);
    /*     const history = useHistory()
    useCustomHook(history.location.state)
 */
    return (
        <LoadingFrame isFinishRequest={isFinishRequest}>
            <PostLayout>
                <StepArea />
                <PostForm />
                <PreviewModal readerComponent={readerList[type]} />
            </PostLayout>
        </LoadingFrame>
    );
}

export default Post;
