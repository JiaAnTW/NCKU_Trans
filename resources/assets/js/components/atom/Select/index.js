import React from 'react';

import Option from '../Option/index';
import SelectElement from './style';

function Select(props) {
    return (
        <SelectElement
            value={props.value}
            {...props.elementAttrs}
            onChange={props.onChange}
        >
            {props.options &&
                props.options.map((item) => (
                    <Option {...item} key={item.value}>
                        {item.text}
                    </Option>
                ))}
        </SelectElement>
    );
}

export default Select;
