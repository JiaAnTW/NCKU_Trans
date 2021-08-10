import styled from 'styled-components';
import FormControl from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

export const FilterContainer = styled.div`
    display: flex;
    align-items: center;
    width: fit-content;
    margin-right: '7px';

    &.MuiSelect-root {
        font-size: 20px;
    }

    @media (max-width: 576px) {
        transform: scale(0.9);
    }
`;

export const ListItem = styled(MenuItem)`
    font-size: 15px;
`;

export const YellowFormControl = styled(FormControl)``;
