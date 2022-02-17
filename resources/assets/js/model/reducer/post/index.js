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
import set from 'lodash/set';
import result from 'lodash/result';
import { transObjToKeysTable } from '~/utils/redux/components/modal/transFormData';

const postReducer = (state = initState, action) => {
    switch (action.type) {
        case INIT_POST_OPTION_DEPARTMENT: {
            const stateNext = state;

            // 初始化學系
            const out_options =
                state.form.comment.pageMap[1][0][2].options.concat(
                    action.payload.departmentArr.map((department) => ({
                        value: department.name,
                        text: department.name,
                    }))
                );

            // in沒有college，要獨立寫
            const in_options =
                state.form.comment.pageMap[1][0][3].options.concat(
                    action.payload.departmentArr.map((department) => ({
                        value: department.name,
                        text: department.name,
                    }))
                );

            const out_maj = {
                ...state.form.comment.pageMap[1][0][2],
                options: out_options,
            };
            const in_maj = {
                ...state.form.comment.pageMap[1][0][3],
                options: in_options,
            };

            stateNext.form.comment.id = -1;
            stateNext.form.comment.pageMap[1][0][2] = out_maj;
            stateNext.form.comment.pageMap[1][0][3] = in_maj;
            return stateNext;
        }
        case INIT_POST_OPTION_COLLEGE: {
            const stateNext = state;

            // 初始化學系
            const options = state.form.comment.pageMap[1][0][2].options.concat(
                action.payload.collegeArr.map((college) => ({
                    value: college.name,
                    text: college.name,
                }))
            );
            const out_maj = { ...state.form.comment.pageMap[1][0][2], options };
            const maj = { ...state.form.study.pageMap[1][0][1], options };

            stateNext.form.comment.pageMap[1][0][2] = out_maj;
            stateNext.form.study.pageMap[1][0][1] = maj;

            return stateNext;
        }
        case SET_POST_FORM: {
            const stateNext = state;
            const { type, step } = stateNext;
            const { value, elementArea, elementIndex } = action.payload;
            const thisArea =
                stateNext.form[type].pageMap[step / 2][elementArea];
            const nextAreaValue = { ...thisArea[elementIndex] };
            nextAreaValue.value = value;
            thisArea[elementIndex] = nextAreaValue;
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
            const { keysTable, instanceableTable } = transObjToKeysTable(
                stateNext.form[stateNext.type]
            );
            for (let key in dataNext) {
                if (!keysTable[key] && !instanceableTable[key]) {
                    stateNext.form[stateNext.type][key] = dataNext[key];
                    continue;
                }
                if (!keysTable[key] && instanceableTable[key]) {
                    const instanceParent = result(
                        stateNext.form[stateNext.type],
                        keysTable[key][0].slice(-1),
                        undefined
                    );
                    if (!instanceParent) continue;
                    const instance = instanceParent.instance;
                    instance.value = dataNext[key];
                    customHandleClick
                        ? customHandleClick(stateNext, instance)
                        : set(
                              stateNext.form[stateNext.type],
                              keysTable[key][0]
                                  .slice(-1)
                                  .concat(instanceParent.id),
                              instance
                          );
                    continue;
                }
                set(
                    stateNext.form[stateNext.type],
                    keysTable[key][0].concat('value'),
                    dataNext[key]
                );
            }
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
            const { id, elementArea, elementIndex } = action.payload;
            const thisButton = thisPage[elementArea][elementIndex].value[id];

            const relationInput = thisPage[elementArea][id];
            if (thisButton.customHandleClick) {
                thisButton.customHandleClick(stateNext, thisButton.instance);
                thisPage[elementArea].selectedStatistic++;
                if (thisPage[elementArea].alertWord)
                    thisPage[elementArea].alertWord['display'] =
                        thisPage[elementArea].selectedStatistic > 0
                            ? 'none'
                            : '';
                return stateNext;
            }
            if (!relationInput) {
                thisPage[elementArea].selectedStatistic++;
                thisButton.value = !thisButton.value;
                const preSpawn = cloneDeep(thisButton.instance);
                thisPage[elementArea][id] = preSpawn;
                if (thisPage[elementArea].alertWord)
                    thisPage[elementArea].alertWord['display'] =
                        thisPage[elementArea].selectedStatistic > 0
                            ? 'none'
                            : '';
                return stateNext;
            }
            if (thisButton.value !== undefined && !relationInput.value) {
                //is must not other
                thisPage[elementArea].selectedStatistic--;
                thisButton.value = !thisButton.value;
                delete thisPage[elementArea][id]; // drop input
                delete relationInput.remark; // drop remark label
            }
            if (thisButton.value !== undefined && relationInput.value) {
                //set remark
                relationInput.remark = relationInput.customAnyValueRemark
                    ? wording[relationInput.customAnyValueRemark]
                    : wording['default'];
            }
            if (thisPage[elementArea].alertWord)
                thisPage[elementArea].alertWord['display'] =
                    thisPage[elementArea].selectedStatistic > 0 ? 'none' : '';

            return stateNext;
        }
        default:
            return state;
    }
};

export default postReducer;
