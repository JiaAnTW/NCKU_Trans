import React from 'react';
import PostInput from '../InputList/PostInput';
import map from 'lodash/map';

function InputGroup({ value }) {
    return (
        <>
            {map(value, (button) => {
                return <PostInput key={button.wording} {...button} />;
            })}
        </>
    );
}

export default InputGroup;
