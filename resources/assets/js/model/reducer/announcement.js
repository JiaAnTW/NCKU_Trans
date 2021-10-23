import {
    INIT_ANNOOUNCE,
    EDIT_ANNOOUNCE_MSG,
    SET_ANNOOUNCE_ISSHOW,
    SET_ANNOOUNCE_ISSHOW_DEFAULT,
} from '../action/announcement';

const initState = {
    isShow: true,
    msg:
        'merry.ee.ncku.edu.tw/~nckutrans/index.php#/ 將會於2022年停止支援，請使用舊網址的同學改透過 nckustudy.com 進入此平台。',
};

const announceReducer = (state = initState, action) => {
    switch (action.type) {
        case INIT_ANNOOUNCE: {
            return action.payload.data;
        }
        case SET_ANNOOUNCE_ISSHOW: {
            return { ...state, isShow: action.payload.value };
        }
        case EDIT_ANNOOUNCE_MSG: {
            return state;
        }
        case SET_ANNOOUNCE_ISSHOW_DEFAULT: {
            return state;
        }
        default:
            return state;
    }
};

export default announceReducer;
