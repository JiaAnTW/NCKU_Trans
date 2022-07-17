import { useState, useRef, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { fetchLoginInfo } from '~/model/middleware/login.js';

function useLogin() {
    const [token, setToken] = useState(undefined);
    const [loading, setLoading] = useState(undefined);
    const accountRef = useRef(undefined);
    const passwordRef = useRef(undefined);

    const location = useLocation();
    const history = useHistory();

    const { from } = location.state || { from: { pathname: '/admin/major' } };
    const handleRedirect = useCallback(() => {
        history.replace(from);
    }, [history, from]);

    const handleSubmit = useCallback(() => {
        setLoading(true);
        const email = accountRef.current.value;
        const password = passwordRef.current.value;
        fetchLoginInfo(
            { email, password },
            {
                successCb: (tokenNext) => {
                    setToken(tokenNext);
                    handleRedirect();
                },
                failCb: setLoading,
            }
        );
    }, [accountRef, passwordRef]);

    return { token, loading, accountRef, passwordRef, handleSubmit };
}

export default useLogin;
