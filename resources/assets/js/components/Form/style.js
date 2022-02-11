import styled from 'styled-components';
import SchoolIcon from '@material-ui/icons/School';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import { color } from '~/theme/global';

export const FormContainer = styled.div`
    width: 550px;
    background-color: white;
    border-radius: 5px;
    margin-bottom: 20px;

    @media (max-width: 870px) {
        padding: 0;
        width: 100%;
    }
`;
export const Title = styled.h4`
    display: flex;
    justify-content: center;
`;
export const StyledSchoolIcon = styled(SchoolIcon)`
    height: 105.42px;
    width: 86.25px;
    fill: ${color.yellow};
`;
export const StyledImportContactsIcon = styled(ImportContactsIcon)`
    height: 105.42px;
    width: 86.25px;
    fill: ${color.yellow};
`;

export const Subtitle = styled.div``;
