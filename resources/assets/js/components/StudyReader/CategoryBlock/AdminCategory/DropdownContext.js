import { createContext } from 'react';

const DropdownContext = createContext({
    id: undefined,
    state: undefined,
    setState: undefined,
    context: undefined,
    setContext: undefined,
});

export default DropdownContext;
