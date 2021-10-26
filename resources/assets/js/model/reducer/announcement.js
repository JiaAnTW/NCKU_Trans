import {
    INIT_ANNOOUNCE,
    EDIT_ANNOOUNCE_MSG,
    SET_ANNOOUNCE_ISSHOWED,
    SET_ANNOOUNCE,
    SET_ANNOOUNCE_ISSHOW_DEFAULT,
} from '../action/announcement';

const initState = {
    id: -1,
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
            let isShowed =
                action.payload.data[0].isShow === 'true' ? true : false;

            // Check if same announcement has been read by user
            const { updated_at } = action.payload.data[0];
            const announcementLocalStr = localStorage.getItem(
                'announcementUpdateAt'
            );
            if (announcementLocalStr) {
                let announcementLocal = JSON.parse(announcementLocalStr);
                const updated_at_local = announcementLocal.data[0].updated_at;
                isShowed = updated_at > updated_at_local ? true : false;
            }

            const msgNext = action.payload.data[0].msg;
            return {
                ...state,
                ...action.payload.data[0],
                isShowed,
                isShow,
                msgNext,
            };
        }
        case SET_ANNOOUNCE_ISSHOWED: {
            const isShowedNext = action.payload.value;
            const info = {
                data: [{ id: state.id, updated_at: state.updated_at }],
            };

            if (!isShowedNext) {
                localStorage.setItem(
                    'announcementUpdateAt',
                    JSON.stringify(info)
                );
            }

            return { ...state, isShowed: action.payload.value };
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
