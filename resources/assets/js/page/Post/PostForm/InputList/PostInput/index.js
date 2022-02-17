import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { SET_POST_FORM } from '~/model/action/post';
import { InputLayout, RemarkSpan } from './style';
import Input from '~/components/atom/Input';
import Select from '~/components/atom/Select';
import TextArea from '~/components/atom/TextArea';
import Label from '~/components/atom/Label';
import ToggleButtonGroup from '~/components/atom/ToggleButtonGroup';
import PairInput from '~/components/atom/PairInput';

const mapTypeToElement = (type) => {
    switch (type) {
        case 'input':
            return Input;
        case 'select':
            return Select;
        case 'textarea':
            return TextArea;
        case 'label':
            return Label;
        case 'toggle_button_group':
            return ToggleButtonGroup;
        case 'pair_input':
            return PairInput;
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
                payload: {
                    keyName: props.keyName,
                    value: e.target.value,
                    elementArea: props.elementArea,
                    elementIndex: props.elementIndex,
                },
            });
        },
        [dispatch, props.keyName, props.elementArea, props.elementIndex]
    );
    const Element = mapTypeToElement(props.type);
    return (
        <InputLayout width={props.width}>
            <Element {...props} value={props.value} onChange={handleChange} />
            {props.remark && <RemarkSpan>{`*${props.remark}`}</RemarkSpan>}
        </InputLayout>
    );
}

export default PostInput;
