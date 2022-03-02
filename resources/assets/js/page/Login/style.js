import styled from 'styled-components';
import { color, Button } from '~/theme/global';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

export const LoginLayout = styled.main`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
`;

export const FormLayout = styled.div`
    width: 350px;
    padding: 25px 0;
`;

export const TopicLayout = styled.div`
    display: inline-block;
    text-align: center;
    width: 100%;
`;

export const H2 = styled.h2`
    font-size: 30px;
    margin-top: 10px;
    margin-bottom: 20px;
`;

export const Img = styled.img`
    width: 60px;
    color: ${color.yellow};
`;

export const ErrorText = styled.p`
    color: ${color.red};
`;

export const InputLayout = styled.div`
    display: flex;
    align-items: center;
    margin: 15px auto;

    & svg {
        color: ${color.yellow};
        margin-top: 7px;
        font-size: 2.3rem;
    }
`;

export const Input = styled(TextField)`
    margin-left: 15px;

    & label,
    & input {
        font-size: 1.8rem;
    }
`;

export const LoadingIcon = styled(CircularProgress)`
    color: ${color.white};
`;

export const LoginBtn = styled(Button)`
    border-radius: 50px;
    width: 200px;
    margin-top: 20px;
    margin-left: calc(50% - 100px);
`;
