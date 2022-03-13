import React, { useEffect, useState } from 'react';
import { FilterState } from './FilterState';
import FilterContext from './FilterContext';

function Provider({ value: { id, data }, children }) {
    const [filterState, setFilterState] = useState(FilterState.NORMAL);
    const [categories, setCategories] = useState(data);
    const [tagEditing, setTagEditing] = useState('');

    useEffect(() => {
        if (filterState === FilterState.CLOSED) {
            setCategories(data);
        }
    }, [filterState, setCategories]);

    return (
        <FilterContext.Provider
            value={{
                studyId: id,
                filterState,
                setFilterState,
                categories,
                setCategories,
                tagEditing,
                setTagEditing,
            }}
        >
            {children}
        </FilterContext.Provider>
    );
}

export default Provider;
