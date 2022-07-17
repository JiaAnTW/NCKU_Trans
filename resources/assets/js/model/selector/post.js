import { createSelector } from 'reselect';

const postFormSelector = (state) => state.post.form;
const postTypeSelector = (state) => state.post.type;

export const postStepSelector = createSelector(
    postFormSelector,
    postTypeSelector,
    (form, type) => {
        if (!type || !form || !form[type]) return undefined;
        return form[type].stepInfo;
    }
);
