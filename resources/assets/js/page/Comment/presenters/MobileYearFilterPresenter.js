import React from 'react';

import { useSetMajorFilter } from '../../../utils/index';
import useInitMobileFilterYearData from '../utils/useInitMobileFilterYearData';

import MobileFilter from '../../../components/Filter/FilterMobile/MobileFilter';

function MobileYearFilterPresenter() {
    const type = '申請年';
    const majorfliter = useInitMobileFilterYearData();
    const setFilter = useSetMajorFilter();

    const handleSetFilter = (value, newNow, name) => {
        if (newNow === 0) {
            if (value['id'] === 0) {
                setFilter('none', value['type']);
            } else
                setFilter(
                    value[value['id']]['name'][1],
                    value[value['id']]['name'][0]
                );
        } else {
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
                left: '65%',
                width: '34%',
                backgroundColor: 'rgb(229,68,109)',
                color: 'white',
                lineHeight: '31px',
                fontSize: '12px',
            }}
        />
    );
}
export default MobileYearFilterPresenter;
