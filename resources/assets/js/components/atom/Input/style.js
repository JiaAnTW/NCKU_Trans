import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { color } from '@/theme/global';

export default styled(TextField)`
    width: 100%;
    height: 60px;
`;

export const useStyles = makeStyles((theme) => ({
    labelText: {
        '&.Mui-focused': {
            color: color.darkYellow,
        },
        '&.MuiInputLabel-shrink': {
            fontSize: '2.2rem',
        },
    },
    root: {
        height: '40px',
    },
    input: {
        fontSize: '1.7rem',
    },
}));
