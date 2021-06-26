import React, { useEffect } from 'react';

import useLogin from './useLogin';

function Login({ setToken }) {
    const { token, accountRef, passwordRef, handleSubmit } = useLogin();

    useEffect(() => {
        if (token) setToken(token);
    }, [token, setToken]);

    return (
        <div>
            <input ref={accountRef} type="text" />
            <input ref={passwordRef} type="password" />
            <button onClick={handleSubmit}>送出</button>
        </div>
    );
}

export default Login;
