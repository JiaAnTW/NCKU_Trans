import React from 'react';
import { useSelector } from 'react-redux';

function Label(props) {
    const type = useSelector((state) => state.post.type);
    const label = useSelector((state) => ({
        ...state.post.form[type][props.keyName],
    }));
    return <span>{label.value}</span>;
}

export default Label;
