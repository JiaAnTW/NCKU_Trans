import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

import ItemFilterEdit from './ItemFilterEdit';
import ItemFilterManagement from './ItemFilterEdit/manage';
import ItemFilter from './ItemFilter';
import { FilterContainer, useStyles, FilterBadge } from './style';
import {
    selectedFilterSelector,
    filterStatusSelector,
} from '~/model/selector/study';
import { SET_STUDY_FILTER } from '~/model/action/study';
import { setStudyTypeOrStat } from '~/model/middleware/study';
import useFilterStatusContext from '~/utils/redux/components/study/useFilterStatusContext';

function Filter({ isAdmin }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selectedFilter = useSelector(selectedFilterSelector);
    const filterStatus = useSelector(filterStatusSelector);
    const { openFilter, closeFilter, startManageFilter, endManageFilter } =
        useFilterStatusContext();

    const toggleManage = (isManaging) => {
        isManaging ? startManageFilter() : endManageFilter();
    };

    const unselectFilter = ({ tagType, id }) => {
        dispatch(
            setStudyTypeOrStat({
                payload: { tagType, tagId: id, checked: false },
            })
        );
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
                    open={filterStatus.isOpen}
                    onClose={closeFilter}
                    onOpen={openFilter}
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
                            isManaging={filterStatus.isManage}
                        />
                    )}
                    {isAdmin && filterStatus.isManage ? (
                        <ItemFilterEdit />
                    ) : (
                        <ItemFilter isAdmin={isAdmin} />
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
