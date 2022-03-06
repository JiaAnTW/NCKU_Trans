import React, { useCallback, useContext } from 'react';
import map from 'lodash/map';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { ItemFilterColContainer, useStyles } from './style';
import FilterContext from '../../Context/FilterContext';

function ItemFilterColumn({ optionsArr }) {
    const classes = useStyles();
    const { categories, setCategories } = useContext(FilterContext);
    const onChangeCheckbox = useCallback(
        (isChecked, tagId, tagName) => {
            setCategories((prev) => {
                if (isChecked) {
                    return [...prev, { id: tagId, name: tagName }];
                } else {
                    const next = prev.filter((el) => el.id !== tagId);
                    return next;
                }
            });
        },
        [setCategories]
    );
    const isSelected = (id) => {
        return categories.find((el) => el.id === id) !== undefined;
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
