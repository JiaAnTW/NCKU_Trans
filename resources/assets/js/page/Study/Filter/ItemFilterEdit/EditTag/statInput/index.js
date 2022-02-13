import FormGroup from '@material-ui/core/FormGroup';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import InputLabel from '~/components/atom/InputLabel';
import { adminActionSelector } from '~/model/selector/study';
import useFilterTagContext from '~/utils/redux/components/useFilterTagContext';
import InputWithPrefix from '~/components/atom/InputWithPrefix';
import Select from '~/components/atom/Select';
import {
    MenuPropsStyle,
    FormControlGroup,
    BetweenSymbol,
    useStyles,
} from './style';

const statTypes = [
    {
        text: '整數',
        value: 'integer',
    },
    {
        text: '小數',
        value: 'decimal',
    },
];

function StatInput() {
    const { tag } = useSelector(adminActionSelector);
    const classes = useStyles();
    const { onChangeTag } = useFilterTagContext();

    const getTextFieldWithPrefix = (type) => {
        return (
            <InputWithPrefix
                prefix={type}
                value={tag[type]}
                classname={classes.numberInput}
                inputProps={{ type: 'number' }}
                onChange={(e) => onChangeTag({ [type]: e.target.value })}
            />
        );
    };

    const maxTextField = useMemo(
        () => getTextFieldWithPrefix('max'),
        [tag.max]
    );
    const minTextField = useMemo(
        () => getTextFieldWithPrefix('min'),
        [tag.min]
    );

    return (
        <FormGroup row>
            <FormControlGroup className={classes.formControl}>
                <Select
                    wording="數據類別"
                    value={tag.dataType}
                    onChange={(e) => onChangeTag({ dataType: e.target.value })}
                    menuProps={{ style: MenuPropsStyle }}
                    classes={[classes.root, classes.select]}
                    options={statTypes}
                />
            </FormControlGroup>

            <FormControlGroup className={classes.formControl}>
                <InputLabel>資料範圍</InputLabel>
                {maxTextField}
                <BetweenSymbol> ~ </BetweenSymbol>
                {minTextField}
            </FormControlGroup>
        </FormGroup>
    );
}

export default StatInput;
