import { createSelector } from 'reselect';

const studySelector = (state) => state.study;

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

export const studyIndexByIdSelector = createSelector(
    studyDataSelector,
    (studyData) => {
        const urlParams = new URLSearchParams(window.location.search);
        const urlId = urlParams.get('id');
        return studyData.findIndex(({ id }) => id === Number(urlId));
    }
);
