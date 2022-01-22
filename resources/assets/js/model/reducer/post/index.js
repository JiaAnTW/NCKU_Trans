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
    SET_SUBPAGE_ON_NEXT,
    SET_SUBPAGE_ON_BEFORE,
} from '../../action/post';
import initState from './initState';
import isEmpty from 'lodash/isEmpty';
import cloneDeep from 'lodash/cloneDeep';

const toTargetParent = (parentArr, obj) => {
    let toRealParent = obj;
    for (let i = 0; i < parentArr.length; i++) {
        if (i === parentArr.length - 1)
            toRealParent = toRealParent[parentArr[i]];
        else {
            toRealParent = toRealParent[parentArr[i]].value;
        }
    }
    return toRealParent;
};
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
            const maj = { ...state.form.study.maj, options };
            stateNext.form.study.maj = maj;
            stateNext.form.comment.out_maj = out_maj;
            return stateNext;
        }
        case SET_POST_FORM: {
            const stateNext = state;
            const type = stateNext.type;
            const { keyName, value, parent } = action.payload;
            if (parent) {
                const realParent = toTargetParent(parent, stateNext.form[type]);
                const keyForm = {
                    ...realParent.value[keyName],
                };
                keyForm.value = value;
                realParent.value[keyName] = keyForm;
            } else {
                const keyForm = { ...stateNext.form[stateNext.type][keyName] };
                keyForm.value = value;
                stateNext.form[stateNext.type][keyName] = keyForm;
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
            initState.form.study.step = 0; //here should be solve by cloneDeep??
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
            const type = stateNext.type;
            const subPageStep = stateNext.form[type].step;
            const { index, value } = action.payload;
            const parent = value.parent;
            let { keyName } = value;
            const nextValue = cloneDeep(value);
            delete nextValue.inGroup; //delete the inGroup attribute (inGroup !== true =>margin-bottom=40px)
            const realParent = toTargetParent(parent, stateNext.form[type]);
            if (keyName !== 'other') {
                nextValue.type = 'input';
                keyName = index;
            } else {
                nextValue.type = 'pair_input';
                keyName += `-${realParent.index}`;
                nextValue.value.keyValue.parent =
                    nextValue.value.dataValue.parent = [
                        ...nextValue.value.dataValue.parent,
                        keyName,
                    ];
                nextValue.wording += `-${realParent.index + 1}`;
                nextValue['remark'] =
                    '其他項目將會由管理員決定是否列為正式項目，不會大幅改動數據，但可能會就格式上進行修改、調整。';
            }
            if (parent) {
                if (!realParent.value[keyName]) {
                    realParent.value[keyName] = nextValue;
                    if (realParent.keyName === 'other') realParent.index += 1;
                } else {
                    if (realParent.value[keyName].value) {
                        realParent.value[keyName]['remark'] =
                            '請先清除輸入的資料，確認後再移除此項目';
                    } else {
                        delete realParent.value[keyName];
                    }
                }
            } else {
                if (!stateNext.form[type][keyName]) {
                    stateNext.form[type][keyName] = nextValue;
                    if (realParent.keyName === 'other') realParent.index += 1;
                } else {
                    if (stateNext.form[type][keyName].value) {
                        stateNext.form[type][keyName]['remark'] =
                            '請先清除輸入的資料，確認後再移除此項目';
                    } else {
                        delete stateNext.form[type][keyName];
                        delete stateNext.form[type][subPageStep][index];
                    }
                }
            }
            isEmpty(stateNext.form[type]['selectedData'].value) &&
            isEmpty(stateNext.form[type]['other'].value)
                ? (stateNext.form[type].anySelected.value =
                      '*目前沒有選擇任何統計資料項目')
                : (stateNext.form[type].anySelected.value = '');
            return stateNext;
        }
        case SET_SUBPAGE_ON_NEXT: {
            const stateNext = state;
            stateNext.form[stateNext.type].step += 1;
            return stateNext;
        }
        case SET_SUBPAGE_ON_BEFORE: {
            const stateNext = state;
            if (stateNext.form[stateNext.type].step !== 0)
                stateNext.form[stateNext.type].step -= 1;
            return stateNext;
        }
        default:
            return state;
    }
};

export default postReducer;
