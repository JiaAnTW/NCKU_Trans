import React from 'react';
import InputLabel from '~/components/atom/InputLabel';
import Option from '~/components/atom/Option/index';
import SelectElement from '@material-ui/core/Select';
import FormControl, { useStyles } from './style';

function Select(props) {
    const classes = useStyles();

    return (
        <FormControl>
            <InputLabel>{`${props.wording}`}</InputLabel>
            <SelectElement
                value={props.value}
                {...props.elementAttrs}
                onChange={props.onChange}
                SelectDisplayProps={{ className: classes.selectDisplay }}
                className={classes.root}
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
