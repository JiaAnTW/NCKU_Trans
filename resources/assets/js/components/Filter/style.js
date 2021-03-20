import styled from 'styled-components';
import FormControl from '@material-ui/core/Select';

export const FilterContainer = styled.div`
    display: flex;
    align-items: center;
    width: fit-content;

    @media (max-width: 576px) {
        transform: scale(0.9);
    }
`;

export const YellowFormControl = styled(FormControl)``;
