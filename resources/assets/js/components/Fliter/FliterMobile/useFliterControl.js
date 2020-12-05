import { useState, useEffect } from 'react';

/* 資料結構
var fliter= [
    {
        id:0,  ===> adjList的index
        now:-1, 目前選取的item，預設為-1並顯示
        name: "申請年",
        type: "year",
        option:[["全部年度",-1]]
    },
    {
        id: 1,  adjList的index
        now:-1, 目前選取的item，預設為-1並顯示
        name: "申請年",
        type: "year",
        option:[["全部年度",-1]]
    },
];
*/

function useFliterControl(initValue) {
    const [selectItem, setSelectItem] = useState({});

    useEffect(() => {
        if (selectItem) setData(selectItem);
    }, [selectItem]);

    return { data, setData };
}

export default useFliterControl;
