import { createContext } from 'react';

const FilterContext = createContext({
    studyId: undefined,
    filterState: undefined,
    setFilterState: undefined,
    categories: undefined,
    setCategories: undefined,
    tagEditing: undefined,
    setTagEditing: undefined,
});

export default FilterContext;
