import styled from 'styled-components';
import { color } from '~/theme/global';
import Button from '~/components/atom/Button';
import { makeStyles } from '@material-ui/core/styles';

export const EditTagContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 10px 15px 15px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
`;

export const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& *': {
            fontSize: '14px !important',
        },
        '& label': {
            color: color.darkYellow,
        },
        '& .MuiInputLabel-shrink': {
            transform: 'translate(0, 1.5px)',
            color: color.darkYellow,
        },
        '& label + .MuiInput-formControl': {
            marginTop: 26,
        },
    },
    formControl: {
        width: 'fit-content !important',
    },
    select: {
        width: 90,
        marginRight: 30,
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

export const ToolsContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    padding-top: 20px;
`;

export const ToolButton = styled(Button)`
    align-items: center;
    justify-content: center;
    display: flex;

    padding: 15px 22px;
    width: 70px;
    height: 30px;
    margin-left: 3px;
    border-radius: 10px;

    font-size: 12px;
    color: #393f4d;
    background-color: ${(props) =>
        props.action === 'delete'
            ? '#F5587B'
            : props.action === 'cancel'
            ? 'white'
            : color.yellow};
    cursor: pointer;
    user-select: none;
`;
