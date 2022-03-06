import { FormControl, InputLabel, Select } from '@material-ui/core';
import React, { useState } from 'react';
import DropdownContext from './DropdownContext';
import ItemFilter from './ItemFilter';
import ItemFilterEdit from './ItemFilterEdit';
import ItemFilterManagement from './ItemFilterEdit/manage';
import { Container, useStyles } from './style';

export const STATE = Object.freeze({
    NORMAL: 'normal',
    MANAGE: 'manage',
    MODIFY: 'modify',
    CREATE: 'create',
});

function AdminCategory({ id, data }) {
    const classes = useStyles();
    const [state, setState] = useState(STATE.NORMAL);
    const [context, setContext] = useState(data);

    return (
        <DropdownContext.Provider
            value={{ id, state, setState, context, setContext }}
        >
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
