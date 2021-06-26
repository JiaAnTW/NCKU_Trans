import { useState, useRef, useEffect, useCallback } from 'react';

import { fetchLoginInfo } from '@/model/middleware/login.js';

function useLogin() {
    const [token, setToken] = useState(undefined);
    const accountRef = useRef(undefined);
    const passwordRef = useRef(undefined);

    const handleSubmit = useCallback(() => {
        const email = accountRef.current.value;
        const password = passwordRef.current.value;
        fetchLoginInfo({ email, password }, setToken);
    }, [accountRef, passwordRef]);

    return { token, accountRef, passwordRef, handleSubmit };
}

export default useLogin;
