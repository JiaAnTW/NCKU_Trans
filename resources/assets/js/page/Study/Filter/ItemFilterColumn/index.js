import Checkbox from '@material-ui/core/Checkbox';
import React from 'react';
import map from 'lodash/map';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import {
    CategoriesIcon,
    ItemFilterColContainer,
    StatInfosIcon,
    Title,
    useStyles,
    YearsIcon,
} from './style';

const mapTypeToIcon = (type) => {
    switch (type) {
        case 'category':
            return CategoriesIcon;
        case 'statInfo':
            return StatInfosIcon;
        case 'year':
            return YearsIcon;
        default:
            return CategoriesIcon;
    }
};

function ItemFilterColumn({ optionsArr }) {
    const Icon = mapTypeToIcon(optionsArr.type);
    const classes = useStyles();

    return (
        <ItemFilterColContainer>
            <Title>
                <Icon />
                {optionsArr.name}
            </Title>
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
