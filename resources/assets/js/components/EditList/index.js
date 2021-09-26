import React, { useState, useEffect } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

import Input from '@/components/atom/Input';

import { CollapseLayout, ConfirmButton } from './style';

export default function EditList({
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
                <ListItemText primary={displayName} />
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
                    <div>
                        <ConfirmButton onClick={onSubmit}>
                            送出修改
                        </ConfirmButton>
                    </div>
                </CollapseLayout>
            </Collapse>
        </>
    );
}
