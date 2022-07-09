import React, { createContext, useState } from 'react';

const NavSearchContext = createContext(undefined);

export const SetNavSearchContext = createContext(undefined);

export default NavSearchContext;

export function NavSearchProvider({ children }) {
    const [handleSearch, setHandleSearch] = useState(undefined);

    return (
        <NavSearchContext.Provider value={handleSearch}>
            <SetNavSearchContext.Provider value={setHandleSearch}>
                {children}
            </SetNavSearchContext.Provider>
        </NavSearchContext.Provider>
    );
}
