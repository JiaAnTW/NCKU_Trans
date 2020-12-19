import React from 'react';
import { useSelector,} from 'react-redux';
import { useDepartment, useCollege ,} from '../../utils/index';

function  useClassifyDepartment() {
    const departmentData = useDepartment();
    const collegeData = useCollege();
    const majorData = useSelector((state) => state.major.data);
    

    const countDepartment = () => {
        let count = {}; 
        departmentData.forEach((item)=>{
            count[item.name] = 0;
        });

        majorData.forEach((item)=>{  
            count[item.in_maj]++;
        });
        return count;
    };
    
    //classify department
    let classifyDepartmentArr = collegeData.map((item) => ({
        name: item.name,
        id: item.id,
        department: [],
    }));

    let countArr = countDepartment();

    departmentData.forEach((element) => {
        classifyDepartmentArr.forEach((item) => {
            if (element.college === item.name){
                item['department'].push({'name':element.name,'num':countArr[element.name]});
            }
        });
    });
    return classifyDepartmentArr;
}

export default useClassifyDepartment;