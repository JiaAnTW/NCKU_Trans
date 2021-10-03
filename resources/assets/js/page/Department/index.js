import React, { useState } from 'react';

import { LoadingContainer } from '@/theme/global';
import Icon from '@/components/Icon/index.js';

import ColSelectedContext from './context';
import { DepartmentLayout, EditWindow } from './style';
import CollegeList from './CollegeList';
import useInitData from './useInitData';

import EditPanel from './EditPanel';

function Department({ isAdmin }) {
    const isFinishRequest = useInitData();
    const [colSelected, setColSelected] = useState(undefined);

    if (!isFinishRequest) {
        return (
            <LoadingContainer>
                <Icon style={{ marginTop: '0' }} />
            </LoadingContainer>
        );
    }

    return (
        <DepartmentLayout>
            <ColSelectedContext.Provider
                value={{ colSelected, setColSelected }}
            >
                <EditWindow>
                    <CollegeList
                        value={colSelected}
                        onChange={setColSelected}
                    />
                    <EditPanel college={colSelected} />
                </EditWindow>
            </ColSelectedContext.Provider>
        </DepartmentLayout>
    );
}

export default Department;
