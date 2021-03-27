import React from 'react';
import TextField, { useStyles } from './style';

function Input(props) {
    const classes = useStyles();

    return (
        <TextField
            value={props.value}
            inputProps={{ ...props.elementAttrs, className: classes.input }}
            onChange={props.onChange}
            label={props.wording}
            InputLabelProps={{ className: classes.labelText, shrink: true }}
            InputProps={{ className: classes.root }}
        />
    );
}

export default Input;
