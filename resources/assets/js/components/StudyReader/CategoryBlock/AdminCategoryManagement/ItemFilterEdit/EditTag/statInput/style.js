import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

export const useStyles = makeStyles((theme) => ({
    root: {
        height: 30,
    },
    select: {
        width: 90,
        marginRight: 30,
    },
    formControl: {
        width: 'fit-content !important',
    },
    numberInput: {
        width: 50,
        marginLeft: 3,
        '& input': {
            textAlign: 'right',
        },
    },
}));

export const MenuPropsStyle = {
    top: 20,
};

export const FormControlGroup = styled.div`
    margin-top: 15px;
    height: 48px;

    &:not(:last-of-type) {
        margin-right: 15px;
    }

    &:last-of-type {
        flex-grow: 1;
    }
`;

export const BetweenSymbol = styled.span`
    content: '~';
    margin: 10px;
`;
