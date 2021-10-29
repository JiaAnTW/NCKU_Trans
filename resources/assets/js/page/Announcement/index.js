import React from 'react';
import Toggle from 'react-toggle';
import { useDispatch, useSelector } from 'react-redux';

import { isShowSelector, msgNextSelector } from '@/model/selector/announcement';
import { EDIT_ANNOOUNCE_MSG } from '@/model/action/announcement';
import { updateAnnouncement } from '@/model/middleware/announcement';
import useSetAnnIsShowed from '@/utils/redux/useSetAnnIsShowed';
import { useRequest } from '@/utils/index';

import { AnnounceLayout, ToggleLayout, TextArea, SubmitButton } from './style';

const icons = {
    checked: <div>開啟</div>,
    unchecked: <div>關閉</div>,
};

export default function Announcement() {
    const dispatch = useDispatch();
    const isFinishRequest = useRequest();
    const isShow = useSelector(isShowSelector);
    const msgNext = useSelector(msgNextSelector);
    const setAnnIsShowed = useSetAnnIsShowed();

    return (
        <AnnounceLayout>
            <ToggleLayout>
                彈出式公告
                <Toggle
                    checked={isShow}
                    onChange={(e) => {
                        dispatch(
                            updateAnnouncement({
                                id: 1,
                                msg: msgNext,
                                isShow: !isShow ? 'true' : 'false',
                            })
                        );
                    }}
                    icons={icons}
                />
            </ToggleLayout>
            <TextArea
                value={msgNext}
                disabled={!isShow || !isFinishRequest}
                onChange={(e) => {
                    dispatch({
                        type: EDIT_ANNOOUNCE_MSG,
                        payload: { value: e.target.value },
                    });
                }}
            />
            <div>
                <SubmitButton
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
                    修改
                </SubmitButton>
                <SubmitButton
                    onClick={() => {
                        setAnnIsShowed(true);
                    }}
                >
                    預覽畫面
                </SubmitButton>
            </div>
        </AnnounceLayout>
    );
}
