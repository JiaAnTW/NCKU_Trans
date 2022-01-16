import React, { useState } from 'react';

import ColSelectedContext from './context';
import { DepartmentLayout, EditWindow } from './style';
import CollegeList from './CollegeList';
import useInitData from './useInitData';

import EditPanel from './EditPanel';
import LoadingFrame from '~/components/LoagingFrame';

function Department() {
    const isFinishRequest = useInitData();
    const [colSelected, setColSelected] = useState(undefined);

    return (
        <LoadingFrame isFinishRequest={isFinishRequest}>
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
        </LoadingFrame>
    );
}

export default Department;
