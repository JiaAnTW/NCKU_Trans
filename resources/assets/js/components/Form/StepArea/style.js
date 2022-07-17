import styled from 'styled-components';
import { color } from '~/theme/global';
import StepConnector from '@material-ui/core/StepConnector';
import { makeStyles, withStyles } from '@material-ui/core/styles';

export const StepAreaContainer = styled.div`
    margin: auto;
    width: 650px;

    @media (max-width: 576px) {
        width: 100%;
    }
`;

export const QontoConnector = withStyles({
    alternativeLabel: {
        top: 10,
        left: 'calc(-50% + 16px)',
        right: 'calc(50% + 16px)',
    },
    active: {
        '& $line': {
            borderColor: color.yellow,
        },
    },
    completed: {
        '& $line': {
            borderColor: color.yellow,
        },
    },
    line: {
        borderColor: '#eaeaf0',
        borderTopWidth: 3,
        borderRadius: 1,
    },
})(StepConnector);

export const useQontoStepIconStyles = makeStyles({
    root: {
        color: '#eaeaf0',
        display: 'flex',
        height: 22,
        alignItems: 'center',
    },
    active: {
        width: '18px',
        height: '23px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: color.yellow,
    },
    inactive: {
        width: '18px',
        height: '23px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#eaeaf0',
    },
    circle: {
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: 'currentColor',
    },
    completed: {
        color: color.yellow,
        zIndex: 1,
        fontSize: 18,
    },
});
