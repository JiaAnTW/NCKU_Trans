import React from 'react';
import { useDispatch } from 'react-redux';
import map from 'lodash/map';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import ItemFilterColumnTitle from './title';

import { ItemFilterColContainer, useStyles } from './style';
import { SET_STUDY_FILTER } from '~/model/action/study';

function ItemFilterColumn({ optionsArr }) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const onChangeCheckbox = (id, checked) => {
        dispatch({
            type: SET_STUDY_FILTER,
            payload: { tagType: optionsArr.type, tagId: id, checked },
        });
    };

    return (
        <ItemFilterColContainer>
            <ItemFilterColumnTitle optionsArr={optionsArr} />
            <FormGroup>
                {map(optionsArr.options, (option) => (
                    <FormControlLabel
                        key={option.value}
                        control={
                            <Checkbox
                                onChange={(e) =>
                                    onChangeCheckbox(
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
