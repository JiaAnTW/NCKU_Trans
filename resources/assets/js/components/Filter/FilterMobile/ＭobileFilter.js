import React, { useState } from 'react';

import { ButtonToolbar } from 'react-bootstrap';
import DropdownItem from './DropdownItem';

function MobileFilter(props) {
    const [filterData, setFilterData] = useState(props.value);
    const [nowCollegeId, setNowCollegeId] = useState(0);

    const handleClick = (name, value, next) => {
        let newNow;
        let newFilterData = filterData;
        for (let i = 0; i < value['option'].length; i++) {
            if (value['option'][i][0] === name) {
                newNow = i;
                break;
            }
        }

        props.filter(value, newNow, name);

        if (next !== -1) {
            newFilterData[next]['now'] = newNow;
            setNowCollegeId(next);
        } else {
            setNowCollegeId(value['id']);
        }
        setFilterData(newFilterData);
    };

    return (
        <ButtonToolbar style={props.style}>
            {props.type + ': '}
            {filterData &&
                filterData.map((item) => (
                    <DropdownItem
                        mobile={props.mobile}
                        hide={nowCollegeId !== item['id'] && item['id'] !== 0}
                        id={item['id']}
                        value={item}
                        onClick={handleClick}
                    />
                ))}
        </ButtonToolbar>
    );
}

export default MobileFilter;
