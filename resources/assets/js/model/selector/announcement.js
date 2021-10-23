import { createSelector } from 'reselect';

const announcementSelector = (state) => state.announcement;

export const isShowSelector = createSelector(
    announcementSelector,
    (state) => state.isShow
);

export const msgSelector = createSelector(
    announcementSelector,
    (state) => state.msg
);
