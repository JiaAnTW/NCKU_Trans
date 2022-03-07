import React, { useCallback, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import map from 'lodash/map';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { ItemFilterColContainer, useStyles } from './style';
import { SET_STUDY_FILTER } from '~/model/action/study';
import { selectedFilterSelector } from '~/model/selector/study';
import DropdownContext from '../../DropdownContext';

function ItemFilterColumn({ optionsArr }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selectedFilter = useSelector(selectedFilterSelector);
    const { context, setContext } = useContext(DropdownContext);
    const onChangeCheckbox = useCallback(
        (isChecked, tagId, tagName) => {
            setContext((prev) => {
                if (isChecked) {
                    return [...prev, { id: tagId, name: tagName }];
                } else {
                    prev.splice(
                        prev.indexOf((el) => el.id === tagId),
                        1
                    );
                    return [...prev];
                }
            });
        },
        [setContext]
    );
    console.log(context);
    const isSelected = (id) => {
        return context.find((el) => el.id === id) !== undefined;
    };

    return (
        <ItemFilterColContainer>
            <FormGroup>
                {map(optionsArr.options, (option) => (
                    <FormControlLabel
                        key={option.id}
                        control={
                            <Checkbox
                                checked={isSelected(option.id)}
                                onChange={(e) =>
                                    onChangeCheckbox(
                                        e.target.checked,
                                        option.id,
                                        option.name
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
