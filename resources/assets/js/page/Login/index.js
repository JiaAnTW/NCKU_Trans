import React, { useEffect } from 'react';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import CircularProgress from '@material-ui/core/CircularProgress';

import BoxIcon from '@/img/box.svg';
import {
    LoginLayout,
    FormLayout,
    TopicLayout,
    H2,
    Img,
    ErrorText,
    InputLayout,
    Input,
    LoadingIcon,
    LoginBtn,
} from './style';
import useLogin from './useLogin';

function Login({ setToken }) {
    const { token, loading, accountRef, passwordRef, handleSubmit } =
        useLogin();

    useEffect(() => {
        if (token) setToken(token);
    }, [token, setToken]);

    return (
        <LoginLayout>
            <FormLayout>
                <TopicLayout>
                    <Img src={BoxIcon} alt="box" />
                    <H2>NCKU STUDY</H2>
                    {loading === false && (
                        <ErrorText>
                            登入失敗。請檢查輸入的帳號密碼是否正確。
                        </ErrorText>
                    )}
                </TopicLayout>
                <InputLayout>
                    <PersonIcon />
                    <Input inputRef={accountRef} type="text" label="account" />
                </InputLayout>
                <InputLayout>
                    <LockIcon />
                    <Input
                        inputRef={passwordRef}
                        type="password"
                        label="password"
                    />
                </InputLayout>

                <LoginBtn onClick={handleSubmit}>
                    {loading ? <LoadingIcon size={20} /> : '登入'}
                </LoginBtn>
            </FormLayout>
        </LoginLayout>
    );
}

export default Login;
