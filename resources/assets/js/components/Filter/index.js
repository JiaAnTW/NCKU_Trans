import React, { useMemo, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

import { FilterContainer, YellowFormControl } from './style';
import { color } from '@/theme/global';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: color.yellow,
        },
        '& .MuiFormLabel-root .Mui-focused': {
            color: color.yellow,
        },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    labelText: {
        '&.Mui-focused': {
            color: color.darkYellow,
        },
    },
}));

function Filter({ type, options, onChange }) {
    const classes = useStyles();
    const [age, setAge] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const handleChange = (event) => {
        setAge(event.target.value);
        onChange(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const optionArr = useMemo(() => {
        if (!Array.isArray(options)) return [];
        return options.map(({ name, value }) => (
            <MenuItem value={value} key={value}>
                {name}
            </MenuItem>
        ));
    }, [options]);

    useEffect(() => {
        if (!Array.isArray(options) || options.length === 0) setAge('');
    }, [options]);

    return (
        <FilterContainer>
            <span>{`${type} :`}</span>
            <FormControl
                size="small"
                variant="outlined"
                className={classes.formControl}
                classes={{ root: classes.root }}
            >
                {age === '' && Array.isArray(options) && options.length > 0 && (
                    <InputLabel
                        disableAnimation
                        shrink={false}
                        className={classes.labelText}
                    >
                        {options[0].name}
                    </InputLabel>
                )}
                <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={age}
                    onChange={handleChange}
                    disabled={optionArr.length === 0}
                >
                    {optionArr}
                </Select>
            </FormControl>
        </FilterContainer>
    );
}

export default Filter;
