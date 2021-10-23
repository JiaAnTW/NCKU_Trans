import React from 'react';
import Toggle from 'react-toggle';
import { useDispatch, useSelector } from 'react-redux';

import { LoadingContainer } from '@/theme/global';
import Icon from '@/components/Icon/index.js';
import {
    isShowSelector,
    msgSelector,
    msgNextSelector,
} from '@/model/selector/announcement';
import { EDIT_ANNOOUNCE_MSG } from '@/model/action/announcement';
import { updateAnnouncement } from '@/model/middleware/announcement';

import useInitAdminAnn from './useInitAdminAnn';

export default function Announcement() {
    const dispatch = useDispatch();
    const isFinishRequest = useInitAdminAnn();
    const isShow = useSelector(isShowSelector);
    const msg = useSelector(msgSelector);
    const msgNext = useSelector(msgNextSelector);

    if (!isFinishRequest) {
        return (
            <LoadingContainer>
                <Icon style={{ marginTop: '0' }} />
            </LoadingContainer>
        );
    }

    return (
        <div>
            <div>
                <div>
                    是否顯示公告
                    <Toggle
                        defaultChecked={isShow}
                        onChange={(e) => {
                            dispatch(
                                updateAnnouncement({
                                    id: 1,
                                    msg: msgNext,
                                    isShow: !isShow,
                                })
                            );
                        }}
                    />
                    <p>{msg === '' ? '目前沒有內容' : msg}</p>
                </div>
                <div>
                    編輯公告內容
                    <textarea
                        value={msgNext}
                        onChange={(e) => {
                            dispatch({
                                type: EDIT_ANNOOUNCE_MSG,
                                payload: { value: e.target.value },
                            });
                        }}
                    />
                    <button
                        onClick={() => {
                            dispatch(
                                updateAnnouncement({
                                    id: 1,
                                    msg: msgNext,
                                    isShow: isShow ? 'true' : 'false',
                                })
                            );
                        }}
                    >
                        送出
                    </button>
                </div>
            </div>
        </div>
    );
}
