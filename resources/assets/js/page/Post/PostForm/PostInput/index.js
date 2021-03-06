import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { SET_POST_FORM } from '../../../../model/action/post';

import Input from '../../../../components/atom/Input/index';
import Select from '../../../../components/atom/Select/index';
import TextArea from '../../../../components/atom/TextArea';

const mapTypeToElement = (type) => {
    switch (type) {
        case 'input':
            return Input;
        case 'select':
            return Select;
        case 'textarea':
            return TextArea;
        default:
            return Input;
    }
};

function PostInput(props) {
    const dispatch = useDispatch();

    const handleChange = useCallback(
        (e) => {
            dispatch({
                type: SET_POST_FORM,
                payload: { keyName: props.keyName, value: e.target.value },
            });
        },
        [dispatch, props.keyName, props.value]
    );

    const Element = mapTypeToElement(props.type);
    return (
        <div>
            {`${props.wording}:`}
            <Element {...props} value={props.value} onChange={handleChange} />
        </div>
    );
}

export default PostInput;
