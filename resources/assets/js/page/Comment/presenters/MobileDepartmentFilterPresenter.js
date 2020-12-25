import React, { useState, useEffect } from 'react';
import useInitMoblieFilterDataStructure from '../utils/useInitMoblieFilterDataStructure';
import { useSetMajorFilter } from '../../../utils/index';

import MobileFilter from '../../../components/Filter/FilterMobile/ＭobileFilter';

function MobileDepartmentFilterPresenter() {
    const type = '依學院/系';
    const majorfliter = useInitMoblieFilterDataStructure();
    const setFilter = useSetMajorFilter();

    const handleSetFilter = (value, newNow, name) => {
        if (newNow === 0) {
            setFilter('none', 'in_maj');
            if (value['id'] === 0) {
                setFilter('none', value['type']);
            } else
                setFilter(
                    value[value['id']]['name'][1],
                    value[value['id']]['name'][0]
                );
        } else {
            setFilter('none', 'in_maj');
            setFilter(name, value['type']);
        }
    };

    return (
        <MobileFilter
            controllArray={[0, -1, -1]}
            mobile={'mobile'}
            filter={handleSetFilter}
            type={type}
            value={majorfliter}
            style={{
                position: 'absolute',
                top: '50px',
                left: '6%',
                width: '59%',
                backgroundColor: 'rgb(229,68,109)',
                color: 'white',
                lineHeight: '31px',
                fontSize: '12px',
                outline: 'none',
            }}
        />
    );
}

export default MobileDepartmentFilterPresenter;
