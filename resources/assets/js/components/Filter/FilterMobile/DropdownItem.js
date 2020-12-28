import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';

function DropdownItem(props) {
    const width = props.mobile === 'mobile' ? '20.5vw' : '85px';
    const itemWidth = props.mobile === 'mobile' ? '20.2vw' : '80px';
    const [toggleTitle, setToggleTitle] = useState(props.value['option'][0][0]);

    useEffect(() => {
        if (props.hide) setToggleTitle(props.value['option'][0][0]);
    }, [props.hide]);

    const itemArr = props.value['option'].map((item) => (
        <Dropdown.Item
            style={{
                outline: 'none',
                backgroundColor: 'rgb(229,68,109)',
                color: 'white',
                fontSize: '12px',
                width: itemWidth,
                textAlign: 'center',
                padding: '0.25rem 0.4rem',
            }}
            onClick={() => {
                setToggleTitle(item[0]);
                props.onClick(item[0], props.value, item[1]);
            }}
        >
            {item[0]}
        </Dropdown.Item>
    ));

    return (
        <Dropdown
            style={{
                display: props.hide ? 'none' : 'block',
                backgroundColor: 'rgb(229,68,109)',
                outline: 'none',
                height: '85%',
            }}
        >
            <Dropdown.Toggle
                variant="Info"
                id="dropdown-basic"
                style={{
                    margin: '2px 0px',
                    height: '85%',
                    outline: 'none',
                    backgroundColor: 'rgb(229,68,109)',
                    color: 'white',
                    fontSize: '12px',
                    width: width,
                }}
            >
                {toggleTitle}
            </Dropdown.Toggle>
            <Dropdown.Menu
                style={{
                    backgroundColor: 'rgb(229,68,109)',
                    color: 'white',
                    width: '80px',
                    minWidth: width,
                }}
            >
                {itemArr}
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default DropdownItem;
