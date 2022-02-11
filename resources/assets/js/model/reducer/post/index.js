import {
    INIT_POST_OPTION_DEPARTMENT,
    INIT_POST_OPTION_COLLEGE,
    SET_POST_FORM,
    SET_POST_ON_NEXT,
    SET_POST_ON_BEFORE,
    RESET_POST_FORM,
    OVERWRITE_POST,
    SET_POST_TYPE,
    TOGGLE_STATIS_DATA,
} from '../../action/post';
import initState from './initState';
import cloneDeep from 'lodash/cloneDeep';
import wording from '~/wording/toggleRemark.json';

const postReducer = (state = initState, action) => {
    switch (action.type) {
        case INIT_POST_OPTION_DEPARTMENT: {
            const stateNext = state;

            // 初始化學系
            const out_options = state.form.comment.out_maj.options.concat(
                action.payload.departmentArr.map((department) => ({
                    value: department.name,
                    text: department.name,
                }))
            );

            // in沒有college，要獨立寫
            const in_options = state.form.comment.in_maj.options.concat(
                action.payload.departmentArr.map((department) => ({
                    value: department.name,
                    text: department.name,
                }))
            );

            const out_maj = {
                ...state.form.comment.out_maj,
                options: out_options,
            };
            const in_maj = {
                ...state.form.comment.in_maj,
                options: in_options,
            };

            stateNext.form.comment.id = -1;
            stateNext.form.comment.out_maj = out_maj;
            stateNext.form.comment.in_maj = in_maj;

            return stateNext;
        }
        case INIT_POST_OPTION_COLLEGE: {
            const stateNext = state;

            // 初始化學系
            const options = state.form.comment.out_maj.options.concat(
                action.payload.collegeArr.map((college) => ({
                    value: college.name,
                    text: college.name,
                }))
            );
            const out_maj = { ...state.form.comment.out_maj, options };
            const maj = { ...state.form.study.pageMap[1][0][1], options };

            stateNext.form.comment.out_maj = out_maj;
            stateNext.form.study.pageMap[1][0][1] = maj;
            return stateNext;
        }
        case SET_POST_FORM: {
            const stateNext = state;
            const { type, step } = stateNext;
            const { keyName, value, elementArea, elementIndex } =
                action.payload;
            if (stateNext.type === 'comment') {
                stateNext.form[stateNext.type][keyName].value = value;
            } else {
                const thisArea =
                    stateNext.form[type].pageMap[step / 2][elementArea];
                const nextAreaValue = { ...thisArea[elementIndex] };
                nextAreaValue.value = value;
                thisArea[elementIndex] = nextAreaValue;
            }
            return stateNext;
        }
        case SET_POST_ON_NEXT: {
            return {
                ...state,
                step: state.step + 1,
            };
        }

        case SET_POST_ON_BEFORE: {
            return {
                ...state,
                step: state.step - 1,
            };
        }
        case RESET_POST_FORM: {
            return initState;
        }
        case OVERWRITE_POST: {
            const dataNext = action.payload;
            const stateNext = state;
            const commentForm = stateNext.form.comment;

            for (let props in dataNext) {
                if (!commentForm[props]) {
                    commentForm[props] = dataNext[props];
                } else if (commentForm[props].value !== undefined) {
                    commentForm[props].value = dataNext[props];
                } else {
                    commentForm[props] = dataNext[props];
                }
            }

            stateNext.form.comment = commentForm;
            stateNext.step = 2;

            return stateNext;
        }
        case SET_POST_TYPE: {
            const stateNext = state;
            stateNext.type = action.payload;
            return stateNext;
        }
        case TOGGLE_STATIS_DATA: {
            const stateNext = state;
            const step = stateNext.step / 2;
            const thisPage = stateNext.form[stateNext.type].pageMap[step];
            const { id } = action.payload;
            const thisButton = thisPage[1][0].value[id];

            const relationInput = thisPage[1][id];
            if (thisButton.customHandleClick) {
                thisButton.customHandleClick(stateNext, thisButton.instance);
                return stateNext;
            }
            if (!relationInput) {
                thisButton.value = !thisButton.value;
                const preSpawn = cloneDeep(thisButton.instance);
                thisPage[1][id] = preSpawn;
                return stateNext;
            }
            if (thisButton.value !== undefined && !relationInput.value) {
                //is must not other
                thisButton.value = !thisButton.value;
                delete thisPage[1][id]; // drop input
                delete relationInput.remark; // drop remark label
            }
            if (thisButton.value !== undefined && relationInput.value) {
                //set remark
                relationInput.remark = relationInput.customAnyValueRemark
                    ? wording[relationInput.customAnyValueRemark]
                    : '請先清除輸入的資料，確認後再移除此項目';
            }
            return stateNext;
        }
        default:
            return state;
    }
};

export default postReducer;
