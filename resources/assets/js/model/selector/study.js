import {
    createSelector,
    createSelectorCreator,
    defaultMemoize,
} from 'reselect';

const studySelector = (state) => state.study;

export const adminActionSelector = createSelector(studySelector, (state) => {
    const { isEditTag, action, tag } = state.admin;
    return { isEditTag, action, tag };
});

export const itemFilterSelector = createSelector(studySelector, (state) => {
    const { category, statInfo } = state.filter;
    return { category, statInfo };
});

export const studyDataSelector = createSelector(
    studySelector,
    (state) => state.data
);

export const filterSelector = createSelector(studySelector, (state) => {
    const { in_maj, year, department, category } = state.filter;
    return { in_maj, year, department, category };
});

export const studyDisplaySelector = createSelector(
    studyDataSelector,
    filterSelector,
    (studyData, { in_maj, year, department, category }) =>
        studyData.filter((item) => {
            return (
                (item['in_maj'] === in_maj || in_maj === 'none') &&
                (item['year'] === Number(year) || year === 'none') &&
                (item['department'] === department || department === 'none') &&
                (item['category'] === category || category === 'none')
            );
        })
);

/* workaround: resolve returned selector not update and cause crash */
const workaround = createSelectorCreator(defaultMemoize, () => false);

export const studyIndexByIdSelector = workaround(
    (state) => state.study.data,
    (studyData) => {
        const urlParams = new URLSearchParams(window.location.search);
        const urlId = urlParams.get('id');
        return studyData.findIndex(({ id }) => id === Number(urlId));
    }
);
