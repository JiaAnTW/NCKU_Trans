import React from 'react';
import { useDepartment, useCollege ,useMajor} from '../../utils/index';

function  useClassifyDepartment() {
    const departmentData = useDepartment();
    const collegeData = useCollege();
    const majorData = useMajor();
    

    const countDepartment = (filter) => {
        let count = 0;
        majorData.forEach((item)=>{  
            if(filter===item.in_maj)
                count++;
        });
        return count;
    };

    //classify department
    let classifyDepartmentArr = collegeData.map((item) => ({
        name: item.name,
        id: item.id,
        department: [],
    }));
    departmentData.forEach((element) => {
        classifyDepartmentArr.forEach((item) => {
            if (element.college === item.name){
                let count = countDepartment(element.name);
                item['department'].push({'name':element.name,'num':count});
            }
        });
    });
    return classifyDepartmentArr;
}

export default useClassifyDepartment;