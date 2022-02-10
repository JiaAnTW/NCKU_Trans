import FormGroup from '@material-ui/core/FormGroup';
import SelectElement from '@material-ui/core/Select';
import React from 'react';
import { useSelector } from 'react-redux';

import InputLabel from '~/components/atom/InputLabel';
import Option from '~/components/atom/Option/index';
import { adminActionSelector } from '~/model/selector/study';
import useFilterTagContext from '~/utils/redux/components/useFilterTagContext';
import InputWithPrefix from '~/components/atom/InputWithPrefix';
import {
    useStyles,
    MenuPropsStyle,
    FormControlGroup,
    BetweenSymbol,
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

    return (
        <FormGroup row>
            <FormControlGroup className={classes.formControl}>
                <InputLabel>數據類別</InputLabel>
                <SelectElement
                    value={tag.dataType}
                    onChange={(e) => onChangeTag({ dataType: e.target.value })}
                    MenuProps={{ style: MenuPropsStyle }}
                    className={classes.select}
                >
                    {statTypes.map((item) => (
                        <Option {...item} key={item.value}>
                            {item.text}
                        </Option>
                    ))}
                </SelectElement>
            </FormControlGroup>

            <FormControlGroup className={classes.formControl}>
                <InputLabel>資料範圍</InputLabel>
                {getTextFieldWithPrefix('max')}
                <BetweenSymbol> ~ </BetweenSymbol>
                {getTextFieldWithPrefix('min')}
            </FormControlGroup>
        </FormGroup>
    );
}

export default StatInput;
