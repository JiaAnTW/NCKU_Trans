import { INIT_MAJOR } from '../action/major';

export const fetchMajor = () => {
    return (dispatch) => {
        fetch('/api/get/major')
            .then(res => res.json())
            .then(data => {
                dispatch({ 
                    type: INIT_MAJOR,
                    payload: { data } 
                })
            })
            .catch(e => console.log('錯誤:', e));
    };
};