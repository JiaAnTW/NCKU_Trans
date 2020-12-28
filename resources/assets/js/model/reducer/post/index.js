import {
    INIT_POST_OPTION,
    SET_POST_FORM,
    SET_POST_ON_NEXT,
    SET_POST_ON_BEFORE,
} from '../../action/post';
import initState from './initState';

const postReducer = (state = initState, action) => {
    switch (action.type) {
        case INIT_POST_OPTION: {
            const stateNext = state;

            // 初始化年度
            const yearOption = [];
            const clock = new Date();
            let latestYear = clock.getFullYear() - 1911;
            if (clock.getMonth() < 7) latestYear--;
            for (let i = 0; i < 5; ++i) {
                const yearItem = latestYear - i;
                yearOption.push({ value: yearItem, text: yearItem });
            }

            const year = {
                ...state.form.comment.year,
                options: yearOption,
                value: latestYear,
            };
            stateNext.form.comment.year = year;

            // 初始化學系
            const options = action.payload.departmentArr.map((department) => ({
                value: department.name,
                text: department.name,
            }));
            const out_maj = { ...state.form.comment.out_maj, options };
            const in_maj = { ...state.form.comment.in_maj, options };

            stateNext.form.comment.in_maj = in_maj;
            stateNext.form.comment.out_maj = out_maj;

            return stateNext;
        }
        case SET_POST_FORM: {
            const stateNext = state;
            const { keyName, value } = action.payload;
            stateNext.form[stateNext.type][keyName].value = value;
            return stateNext;
        }
        default:
            return state;
    }
};

export default postReducer;
