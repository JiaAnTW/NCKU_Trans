import { renderHook } from '@testing-library/react-hooks';
import React, { useContext } from 'react';
import FilterContext from '../Context/FilterContext';
import Provider from '../Context/Provider';

describe('Test Provider', () => {
    it('should init context', () => {
        const id = 'study-id';
        const data = [
            {
                id: 'category-id',
                name: 'category-name',
            },
        ];
        const wrapper = ({ children }) => (
            <Provider value={{ id, data }}>{children}</Provider>
        );
        const { result } = renderHook(() => useContext(FilterContext), {
            wrapper,
        });
        expect(result.current.studyId).toBe(id);
        expect(result.current.categories).toEqual(data);
    });
});
