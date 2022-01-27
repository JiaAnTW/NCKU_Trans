import { createSelector } from 'reselect';

const studySelector = (state) => state.study;

export const adminActionSelector = createSelector(studySelector, (state) => {
    const { isEditTag, action, tag } = state.admin;
    return { isEditTag, action, tag };
});
