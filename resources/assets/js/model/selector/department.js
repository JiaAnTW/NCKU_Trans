import { createSelector } from 'reselect';

const departmentSelector = (state) => state.in_maj;

export const depSelector = createSelector(departmentSelector, (state) => state);
