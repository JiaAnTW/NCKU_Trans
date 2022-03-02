import React from 'react';
import InputLabel from '~/components/atom/InputLabel';
import Option from '~/components/atom/Option/index';
import SelectElement from '@material-ui/core/Select';
import FormControl, { useStyles } from './style';
import isString from 'lodash/isString';
import isArray from 'lodash/isArray';

function combineClassName(rootClass, propsClass) {
    if (!propsClass) {
        return rootClass;
    }
    if (isString(propsClass)) {
        return `${rootClass} ${propsClass}`;
    }
    if (isArray(propsClass)) {
        return `${rootClass} ${propsClass.join(' ')}`;
    }
}

function Select(props) {
    const classes = useStyles();

    return (
        <FormControl>
            <InputLabel>{`${props.wording}`}</InputLabel>
            <SelectElement
                value={props.value}
                {...props.elementAttrs}
                onChange={props.onChange}
                MenuProps={props.menuProps}
                SelectDisplayProps={{ className: classes.selectDisplay }}
                className={combineClassName(classes.root, props.classes)}
            >
                {props.options &&
                    props.options.map((item) => (
                        <Option {...item} key={item.value}>
                            {item.text}
                        </Option>
                    ))}
            </SelectElement>
        </FormControl>
    );
}

export default Select;
