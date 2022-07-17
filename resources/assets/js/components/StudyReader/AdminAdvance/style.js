import styled from 'styled-components';
import { color } from '~/theme/global';
import BasisBtn from '~/components/atom/Button';
import { darken } from '@material-ui/core';

export const ButtonContainer = styled.div`
    text-align: right;
`;
export const Button = styled(BasisBtn)`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-right: 5px;
    border: 3px solid ${color.yellow};
    box-sizing: border-box;
    cursor: pointer;

    color: ${color.darkBlack};
    background-color: ${({ bgc }) => (bgc ? bgc : color.white)};

    &:hover,
    &:focus {
        background-color: ${({ bgc }) =>
            bgc ? darken(bgc, 0.2) : color.white};
    }
`;
