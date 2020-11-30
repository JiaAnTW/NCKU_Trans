import { INIT_DEPARTMENT } from '../action/department';

export const fetchDepartment = () => {
    return (dispatch) => {
        fetch('/api/get/department')
            .then(res => res.json())
            .then(data => {
                dispatch({ 
                    type: INIT_DEPARTMENT,
                    payload: { data } 
                })
            })
            .catch(e => console.log('錯誤:', e));
    };
};