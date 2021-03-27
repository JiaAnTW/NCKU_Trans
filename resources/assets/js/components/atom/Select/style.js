import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';

export default styled(FormControl)`
    width: 100%;
    height: 60px;
`;

export const useStyles = makeStyles((theme) => ({
    selectDisplay: {
        fontSize: '1.4rem',
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        outline: 'none',
    },
    root: {
        height: '40px',
    },
}));
