import { createSelector } from 'reselect';

const announcementSelector = (state) => state.announcement;

export const isShowSelector = createSelector(
    announcementSelector,
    (state) => state.isShow
);

export const isShowedSelector = createSelector(
    announcementSelector,
    (state) => state.isShowed
);

export const msgSelector = createSelector(
    announcementSelector,
    (state) => state.msg
);

export const msgNextSelector = createSelector(
    announcementSelector,
    (state) => state.msgNext
);
