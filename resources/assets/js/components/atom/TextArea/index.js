import React from 'react';
import TextField, { useStyles } from './style';

function TextArea(props) {
    const classes = useStyles();

    return (
        <TextField
            value={props.value}
            variant="outlined"
            inputProps={props.elementAttrs}
            onChange={props.onChange}
            label={props.wording}
            {...props.elementAttrs}
            InputLabelProps={{ className: classes.labelText, shrink: true }}
            InputProps={{ className: classes.Input }}
            inputProps={{
                className: classes.input,
                style: { height: '250px', overflow: 'auto' },
            }}
            multiline
        />
    );
}

export default TextArea;
