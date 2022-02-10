import React from 'react';
import TextField from '@material-ui/core/TextField';

import { InputFieldWithPrefix } from './style';

function InputWithPrefix({ prefix, value, classname, inputProps, onChange }) {
    return (
        <InputFieldWithPrefix>
            {prefix}
            <TextField
                value={value}
                className={classname}
                inputProps={inputProps}
                InputLabelProps={{ shrink: false }}
                onChange={onChange}
            />
        </InputFieldWithPrefix>
    );
}

export default InputWithPrefix;
