import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import map from 'lodash/map';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import ItemFilterColumnTitle from './title';

import { ItemFilterColContainer, useStyles } from './style';
import { SET_STUDY_FILTER } from '~/model/action/study';
import { selectedFilterSelector } from '~/model/selector/study';

function ItemFilterColumn({ optionsArr }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selectedFilter = useSelector(selectedFilterSelector);

    const onChangeCheckbox = (tagType, tagId, checked) => {
        dispatch({
            type: SET_STUDY_FILTER,
            payload: { tagType, tagId, checked },
        });
    };

    const isSelected = (id) => {
        return selectedFilter.find((el) => el.id === id) !== undefined;
    };

    return (
        <ItemFilterColContainer>
            <ItemFilterColumnTitle optionsArr={optionsArr} />
            <FormGroup>
                {map(optionsArr.options, (option) => (
                    <FormControlLabel
                        key={option.id}
                        control={
                            <Checkbox
                                checked={isSelected(option.id)}
                                onChange={(e) =>
                                    onChangeCheckbox(
                                        optionsArr.type,
                                        option.id,
                                        e.target.checked
                                    )
                                }
                                name={option.name}
                            />
                        }
                        label={option.name}
                        className={classes.filterItem}
                        classes={{
                            root: classes.root,
                            label: classes.label,
                        }}
                    />
                ))}
            </FormGroup>
        </ItemFilterColContainer>
    );
}

export default ItemFilterColumn;
