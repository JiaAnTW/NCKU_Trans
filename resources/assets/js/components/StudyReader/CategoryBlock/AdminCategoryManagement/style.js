import { makeStyles } from '@material-ui/core';
import styled from 'styled-components';
import { color } from '~/theme/global';

export const Container = styled.div`
    position: absolute;
    right: 0px;
`;

const fontSize = '14px';

export const useStyles = makeStyles((theme) => ({
    root: {
        '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: color.yellow,
        },
        '& .MuiFormLabel-root .Mui-focused': {
            color: color.yellow,
        },
        '& .MuiInputBase-root': {
            borderRadius: 22,
            border: '2px solid #c8c8c8',
        },
        '& .MuiFormLabel-root': {
            marginTop: 2,
        },
        '& .MuiSelect-root': {
            fontSize: fontSize,
            paddingTop: '14.5px',
            paddingBottom: '6.5px',
        },
    },
    paper: {
        boxShadow: '0 0 4px rgba(0, 0.25, 0.25, 0.25)',
        borderRadius: 5,
        marginTop: 10,
    },
    formControl: {
        width: 100,
    },
    labelText: {
        fontSize: fontSize,
        '&.Mui-focused': {
            color: color.darkYellow,
        },
    },
}));
