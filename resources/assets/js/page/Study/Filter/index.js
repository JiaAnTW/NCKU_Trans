import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

import ItemFilterEdit from './ItemFilterEdit';
import ItemFilterManagement from './ItemFilterEdit/manage';
import ItemFilter from './ItemFilter';
import { FilterContainer, useStyles, FilterBadge } from './style';
import { selectedFilterSelector } from '~/model/selector/study';
import { SET_STUDY_FILTER } from '~/model/action/study';

function Filter({ isAdmin }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selectedFilter = useSelector(selectedFilterSelector);
    const [open, setOpen] = useState(false);
    const [isManaging, setIsManaging] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const toggleManage = (isManaging) => {
        setIsManaging(isManaging);
    };

    const unselectFilter = (tag) => {
        dispatch({
            type: SET_STUDY_FILTER,
            payload: { tagType: tag.tagType, tagId: tag.id, checked: false },
        });
    };

    return (
        <FilterContainer>
            <FormControl
                size="small"
                variant="outlined"
                className={classes.formControl}
                classes={{ root: classes.root }}
            >
                <InputLabel
                    id="item-filter-label"
                    disableAnimation
                    shrink={false}
                    className={classes.labelText}
                >
                    篩選條件
                </InputLabel>
                <Select
                    labelId="item-filter-label"
                    id="item-filter"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    MenuProps={{
                        style: {
                            top: 40,
                        },
                        classes: {
                            paper: classes.paper,
                        },
                    }}
                >
                    {isAdmin && (
                        <ItemFilterManagement
                            toggleManage={(isManaging) =>
                                toggleManage(isManaging)
                            }
                            isManaging={isManaging}
                        />
                    )}
                    {isAdmin && isManaging ? (
                        <ItemFilterEdit />
                    ) : (
                        <ItemFilter />
                    )}
                </Select>
            </FormControl>
            {selectedFilter.map((tag) => (
                <FilterBadge
                    key={tag.id}
                    value={tag.name}
                    onClose={() => unselectFilter(tag)}
                />
            ))}
        </FilterContainer>
    );
}

export default Filter;
