import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { color } from '~/theme/global';

export default styled(TextField)`
    width: 100%;
    height: 250px;
    margin-bottom: 30px;
`;

export const useStyles = makeStyles((theme) => ({
    labelText: {
        '&.Mui-focused': {
            color: color.darkYellow,
        },
        '&.MuiInputLabel-shrink': {
            fontSize: '2.2rem',
            fontWeight: 700,
            backgroundColor: color.white,
        },
    },
    Input: {
        alignItems: 'flex-start',
    },
    input: {
        fontSize: '1.5rem',
        height: '250px',
        lineHeight: '2.2rem',
    },
}));
