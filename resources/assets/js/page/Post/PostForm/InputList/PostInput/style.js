import styled from 'styled-components';
import { color } from '~/theme/global';

export const InputLayout = styled.div`
    /*width: ${(props) => (props.width ? props.width * 50 : '50')}%;
    padding-left: 70px;*/

    grid-column: ${(props) => (props.width ? '1/' + (1 + props.width) : '')};

    /*:nth-child(odd) {
        padding-left: 0px;
        padding-right: 70px;
    }*/

    margin-bottom: 20px;

    @media (max-width: 870px) {
        /*padding-left: 20px;

        :nth-child(odd) {
            padding-left: 0px;
            padding-right: 20px;
        }*/
    }
`;

export const RemarkSpan = styled.span`
    color: ${color.red};
`;
