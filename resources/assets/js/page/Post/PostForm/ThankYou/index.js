import React, { forwardRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { RESET_POST_FORM } from '@/model/action/post';

import {
    ThankYouLayout,
    ThankYouIcon,
    Title,
    Subtitle,
    BackButton,
} from './style';

const ThankYou = forwardRef((props, ref) => {
    const type = useSelector((state) => state.post.type);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        // 離開成功頁面時重製表單狀態
        // 只在這裡做，讓使用者輸入過程中即使不小心錯誤跳到其他頁面也能保有資料
        return () => {
            dispatch({ type: RESET_POST_FORM });
        };
    }, [dispatch]);

    return (
        <ThankYouLayout ref={ref}>
            <ThankYouIcon />
            <Title>感謝你的填寫!</Title>
            <Subtitle>等待審查通過後就能看到你的心得囉</Subtitle>
            <Subtitle>若一直沒看到你的心得，請聯絡我們</Subtitle>
            <BackButton
                onClick={() => {
                    history.push(type === 'comment' ? '/' : '/');
                }}
            >
                回到心得總覽頁面
            </BackButton>
        </ThankYouLayout>
    );
});

export default ThankYou;
