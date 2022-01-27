import { createSelector } from 'reselect';

const studySelector = (state) => state.study;

export const adminActionSelector = createSelector(studySelector, (state) => {
    const { isEditTag, tag } = state.admin;
    return { isEditTag, tag };
});
