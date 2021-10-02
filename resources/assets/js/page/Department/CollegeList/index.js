import React, { useContext } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { useCollege } from '@/utils/index';

import colSelectedContext from '../context';
import { ListYellow } from './style';

function CollegeList() {
    const collegeData = useCollege();
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
