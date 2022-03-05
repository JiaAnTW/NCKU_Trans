import { FormControl, InputLabel, Select } from '@material-ui/core';
import { filter } from 'lodash';
import React, { useReducer, useState } from 'react';
import DropdownContext from './DropdownContext';
import ItemFilter from './ItemFilter';
import ItemFilterEdit from './ItemFilterEdit';
import ItemFilterManagement from './ItemFilterEdit/manage';
import { Container, useStyles } from './style';

function reducer(state, action) {
    switch (action.type) {
        case 'edit':
            return state;
        case 'manage':
            return state;
        case 'create':
            return state;
        default:
            return state;
    }
}

export const STATE = Object.freeze({
    NORMAL: 'normal',
    MANAGE: 'manage',
    MODIFY: 'modify',
    CREATE: 'create',
});

function AdminCategory({ data }) {
    const classes = useStyles();
    // const [filterState, dispatch] = useReducer(reducer, 'edit');
    const [state, setState] = useState(STATE.NORMAL);

    return (
        <DropdownContext.Provider value={{ state, setState }}>
            <Container>
                <FormControl
                    size="small"
                    variant="outlined"
                    className={classes.formControl}
                    classes={{ root: classes.root }}
                >
                    <InputLabel
                        disableAnimation
                        shrink={false}
                        className={classes.labelText}
                    >
                        編輯類別
                    </InputLabel>
                    <Select
                        MenuProps={{
                            style: {
                                top: 40,
                            },
                            classes: {
                                paper: classes.paper,
                            },
                        }}
                    >
                        <ItemFilterManagement />
                        {state === STATE.NORMAL ? (
                            <ItemFilter />
                        ) : state === STATE.MANAGE ? (
                            <ItemFilterEdit />
                        ) : (
                            <></>
                        )}
                    </Select>
                </FormControl>
            </Container>
        </DropdownContext.Provider>
    );
}

export default AdminCategory;
