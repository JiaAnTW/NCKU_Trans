import { createContext } from 'react';

const DropdownContext = createContext({
    state: undefined,
    setState: undefined,
});

export default DropdownContext;
