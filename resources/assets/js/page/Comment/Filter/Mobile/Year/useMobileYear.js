import useClassifyYear from '../../PC/Year/usePCYear';

function useInitMobileFilterYearData() {
    const yearData = useClassifyYear();
    let mobileFilterDataStructure = [
        {
            id: 0,
            now: -1,
            name: '申請年',
            type: 'year',
            option: [['全部年度', -1]].concat(
                yearData[0].map((item) => [item, -1])
            ),
        },
    ];

    return mobileFilterDataStructure;
}

export default useInitMobileFilterYearData;
