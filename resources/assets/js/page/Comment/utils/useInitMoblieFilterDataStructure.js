import { useDepartment, useCollege } from '../../../utils/index';

function useInitMobileFilterDataStructure() {
    const departmentData = useDepartment();
    const collegeData = useCollege();
    let classifyDepartmentData = {};
    let mobileFilterDataStructure = [];
    let count = 0;
    const collegeArr = collegeData.map((item) => item.name);

    departmentData.forEach((item) => {
        if (!classifyDepartmentData[item.college])
            classifyDepartmentData[item.college] = ['全部學系', item.name];
        else classifyDepartmentData[item.college].push(item.name);
    });

    mobileFilterDataStructure.push({
        id: count,
        now: -1,
        name: '依學院篩選',
        type: 'department',
        option: [['全部學院', -1]].concat(
            collegeArr.map((item) => [item, ++count])
        ),
    });

    count = 0;
    mobileFilterDataStructure = mobileFilterDataStructure.concat(
        collegeArr.map((item) => ({
            id: ++count,
            now: -1,
            name: ['department', item],
            type: 'in_maj',
            option: classifyDepartmentData[item].map((item) => [item, -1]),
        }))
    );

    return mobileFilterDataStructure;
}

export default useInitMobileFilterDataStructure;
