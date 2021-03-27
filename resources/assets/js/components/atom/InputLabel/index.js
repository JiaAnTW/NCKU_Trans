import style from 'styled-components';
import InputLabel from '@material-ui/core/InputLabel';
import { color } from '@/theme/global';

export default style(InputLabel)`
    &.MuiInputLabel-shrink {
        font-size: 1.6rem;
    }

    &.Mui-focused {
        color: ${color.darkYellow};
    }
`;
