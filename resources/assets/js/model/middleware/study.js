import { STOP_EDIT_TAG } from '../action/study';

export const createItemFilterOption = (option) => {
    return (dispatch) => {
        dispatch({ type: STOP_EDIT_TAG });
        // TODO: fetch api to create option from backend
        console.log('TODO: fetch api to create option from backend');
        console.log(option);
    };
};

export const updateItemFilterOption = (option) => {
    return (dispatch) => {
        dispatch({ type: STOP_EDIT_TAG });
        // TODO: fetch api to update option from backend
        console.log('TODO: fetch api to update option from backend');
        console.log(option);
    };
};

export const deleteItemFilterOption = (option) => {
    return (dispatch) => {
        dispatch({ type: STOP_EDIT_TAG });
        // TODO: fetch api to delete option from backend
        console.log('TODO: fetch api to delete option from backend');
        console.log(option);
    };
};
