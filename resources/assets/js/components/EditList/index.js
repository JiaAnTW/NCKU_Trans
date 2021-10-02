import React, { useState, useEffect } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import CreateIcon from '@material-ui/icons/Create';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Input from '@/components/atom/Input';

import {
    CollapseLayout,
    ConfirmLayout,
    ConfirmButton,
    ListItemTextDynamic,
} from './style';

export default function EditList({
    highlighted,
    displayName,
    inputArr,
    onSubmit = () => {},
}) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(false);
    }, [displayName]);

    return (
        <>
            <ListItem button onClick={() => setOpen((preOpen) => !preOpen)}>
                <ListItemTextDynamic
                    highlighted={highlighted.toString()}
                    primary={highlighted ? `*${displayName}` : displayName}
                />
                {open ? <ExpandLessIcon /> : <CreateIcon />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <CollapseLayout>
                    {inputArr.map(
                        ({ id, value = '', wording, onChange = () => {} }) => (
                            <Input
                                key={id}
                                value={value}
                                wording={wording}
                                onChange={onChange}
                            />
                        )
                    )}
                    <ConfirmLayout>
                        <ConfirmButton onClick={onSubmit}>
                            送出修改
                        </ConfirmButton>
                    </ConfirmLayout>
                </CollapseLayout>
            </Collapse>
        </>
    );
}
