import { FormControl, InputLabel, Select } from '@material-ui/core';
import React, { useCallback, useContext } from 'react';
import FilterContext from './Context/FilterContext';
import ItemFilter from './ItemFilter';
import ItemFilterEdit from './ItemFilterEdit';
import ItemFilterManagement from './ItemFilterEdit/manage';
import { Container, useStyles } from './style';
import { FilterState } from './Context/FilterState';

function AdminEditCategory() {
    const classes = useStyles();
    const { filterState, setFilterState } = useContext(FilterContext);
    const openFilter = useCallback(() => {
        setFilterState(FilterState.NORMAL);
    }, [setFilterState]);
    const resetFilterState = useCallback(() => {
        setFilterState(FilterState.CLOSED);
    }, [setFilterState]);

    return (
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
                    onOpen={openFilter}
                    onClose={resetFilterState}
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
                    {filterState === FilterState.NORMAL ? (
                        <ItemFilter />
                    ) : filterState === FilterState.MANAGE ? (
                        <ItemFilterEdit />
                    ) : undefined}
                </Select>
            </FormControl>
        </Container>
    );
}

export default AdminEditCategory;
