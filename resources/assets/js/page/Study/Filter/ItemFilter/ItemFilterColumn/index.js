import React from 'react';
import map from 'lodash/map';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import ItemFilterColumnTitle from './title';

import { ItemFilterColContainer, useStyles } from './style';

function ItemFilterColumn({ optionsArr }) {
    const classes = useStyles();

    return (
        <ItemFilterColContainer>
            <ItemFilterColumnTitle optionsArr={optionsArr} />
            <FormGroup>
                {map(optionsArr.options, (option) => (
                    <FormControlLabel
                        key={option.name}
                        control={<Checkbox name={option.name} />}
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
