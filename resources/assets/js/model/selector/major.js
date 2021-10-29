import { createSelector } from 'reselect';

const majorSelector = (state) => state.major;

export const majorDataSelector = createSelector(
    majorSelector,
    (state) => state.data
);

export const filterSelector = createSelector(majorSelector, (state) => {
    const { in_maj, year, department, category } = state.filter;
    return { in_maj, year, department, category };
});

export const majorDisplaySelector = createSelector(
    majorDataSelector,
    filterSelector,
    (majorData, { in_maj, year, department, category }) =>
        majorData.filter((item) => {
            return (
                (item['in_maj'] === in_maj || in_maj === 'none') &&
                (item['year'] === Number(year) || year === 'none') &&
                (item['department'] === department || department === 'none') &&
                (item['category'] === category || category === 'none')
            );
        })
);
