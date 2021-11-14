import styled from 'styled-components';
import Snackbar from '@material-ui/core/Snackbar';
import WarningIcon from '@material-ui/icons/Warning';

import { color, Button } from '~/theme/global';

export const YellowSnackbar = styled(Snackbar)`
    & .MuiSnackbarContent-root {
        background-color: ${color.yellow};
        color: ${color.darkBlack};
    }

    & .MuiSnackbarContent-message {
        overflow-wrap: anywhere;
        text-align: justify;
        font-size: 15px;
        max-width: calc(100% - 80px);
    }
`;

export const BtnClose = styled(Button)`
    border-radius: 20px;
    height: 35px;
    padding: 5px 10px;
`;

export const WarningIconWhite = styled(WarningIcon)`
    color: white;
`;
