import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import { color } from '~/theme/global';

export const FilterContainer = styled.section`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 0 5px;
    width: fit-content;
    height: 50px;
    margin-bottom: 10px;
`;

const fontSize = '1.5rem';

export const useStyles = makeStyles((theme) => ({
    root: {
        '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: color.yellow,
        },
        '& .MuiFormLabel-root .Mui-focused': {
            color: color.yellow,
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
        margin: theme.spacing(1),
        minWidth: 120,
    },
    labelText: {
        fontSize: fontSize,
        '&.Mui-focused': {
            color: color.darkYellow,
        },
    },
}));
