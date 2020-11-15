import { INIT_QA } from '../action/qa';

export const fetchQA = () => {
    return (dispatch) => {
        fetch('/api/get/major_QA')
            .then(res => res.json())
            .then(data => {
                dispatch({ 
                    type: INIT_QA,
                    payload: { data } 
                })
            })
            .catch(e => console.log('錯誤:', e));
    };
};