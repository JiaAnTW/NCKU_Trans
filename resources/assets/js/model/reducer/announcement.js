import {
    INIT_ANNOOUNCE,
    EDIT_ANNOOUNCE_MSG,
    SET_ANNOOUNCE_ISSHOW,
    SET_ANNOOUNCE,
    SET_ANNOOUNCE_ISSHOW_DEFAULT,
} from '../action/announcement';

const initState = {
    isShow: false,
    isShowed: false,
    msg: '',
    msgNext: '',
    created_at: null,
    updated_at: null,
};

const announceReducer = (state = initState, action) => {
    switch (action.type) {
        case INIT_ANNOOUNCE: {
            const isShow =
                action.payload.data[0].isShow === 'true' ? true : false;
            const msgNext = action.payload.data[0].msg;
            return { ...state, ...action.payload.data[0], isShow, msgNext };
        }
        case SET_ANNOOUNCE_ISSHOW: {
            return { ...state, isShow: action.payload.value };
        }
        case EDIT_ANNOOUNCE_MSG: {
            const msgNext = action.payload.value;
            return { ...state, msgNext };
        }
        case SET_ANNOOUNCE: {
            const { msg, isShow } = action.payload.value;
            return { ...state, msg, isShow: isShow === 'true' ? true : false };
        }
        case SET_ANNOOUNCE_ISSHOW_DEFAULT: {
            return state;
        }
        default:
            return state;
    }
};

export default announceReducer;
