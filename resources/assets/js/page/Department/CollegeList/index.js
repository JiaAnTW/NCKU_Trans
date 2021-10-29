import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { colSelector } from '@/model/selector/college';

import colSelectedContext from '../context';
import { ListYellow } from './style';

function CollegeList() {
    const collegeData = useSelector(colSelector);
    const { colSelected, setColSelected } = useContext(colSelectedContext);

    return (
        <ListYellow component="nav" aria-label="secondary mailbox folder">
            {collegeData.map((item) => (
                <ListItem
                    button
                    key={item.id}
                    selected={colSelected && colSelected.name === item.name}
                    onClick={() => setColSelected(item)}
                >
                    <ListItemText primary={item.name} />
                </ListItem>
            ))}
            <ListItem
                button
                selected={colSelected && colSelected.name === ''}
                onClick={() =>
                    setColSelected({ id: -1, name: '', nameNext: '' })
                }
            >
                <ListItemText primary="+ 新增" />
            </ListItem>
        </ListYellow>
    );
}

export default CollegeList;
