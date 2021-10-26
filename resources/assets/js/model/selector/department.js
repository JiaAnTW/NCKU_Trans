import { createSelector } from 'reselect';
import { filterSelector } from './major';

const departmentSelector = (state) => state.in_maj;

export const depSelector = createSelector(departmentSelector, (state) => state);
export const depUnderColSelector = createSelector(
    departmentSelector,
    filterSelector,
    (departmentArr, filter) => {
        const collegeSelected = filter.department;
        const majData =
            collegeSelected === 'none'
                ? []
                : departmentArr.filter(
                      (item) => item.college === collegeSelected
                  );
        return { collegeSelected, majData };
    }
);
