import { createSelector } from 'reselect';

const collegeSelector = (state) => state.college;

export const colSelector = createSelector(collegeSelector, (state) => state);
