import React from 'react';
import { Button, Badge } from 'react-bootstrap';

function MenuItem({ name, num, selected ,onClick }) {
    return (
        <Button
            variant="light"
            style={{
                fontSize: '12px',
                fontWeight: '300',
                textAlign: 'right',
                position: 'relative',
                color: 'white',
                backgroundColor: selected
                    ? 'rgba(255,255,255,0.3)'
                    : 'rgba(0,0,0,0.1)',
                borderRadius: '0px',
                width: '100%',
                outline: 'none',
            }}
            onClick={onClick}
        >
            <div
                style={{
                    display: selected ? 'block' : 'none',
                    position: 'absolute',
                    height: '100%',
                    backgroundColor: 'white',
                    width: '5%',
                    height: '100%',
                    top: '0',
                    left: '0',
                }}
            ></div>
            {name}
            <Badge
                pill
                variant="light"
                style={{
                    position: 'relative',
                    marginLeft: '10px',
                    fontWeight: '400',
                    backgroundColor: 'white',
                    color: 'rgb(229,68,109)',
                }}
            >
                {num}
            </Badge>
        </Button>
    );
}

export default MenuItem;
