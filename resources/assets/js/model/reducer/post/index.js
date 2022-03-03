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
    SET_STUDY_STATIS_OPTIONS,
} from '../../action/post';
import initState from './initState';
import cloneDeep from 'lodash/cloneDeep';
import wording from '~/wording/toggleRemark.json';
import set from 'lodash/set';
import map from 'lodash/map';
import result from 'lodash/result';
import DataMapping from '~/utils/redux/components/modal/dataMapping';

let commentTable, studyTable;
const postReducer = (state = initState, action) => {
    switch (action.type) {
        case INIT_POST_OPTION_DEPARTMENT: {
            commentTable = DataMapping.transObjToKeysTable(
                state.form['comment'],
                DataMapping.action.GET_INIT_COMMENT
            );
            studyTable = DataMapping.transObjToKeysTable(
                state.form['study'],
                DataMapping.action.GET_INIT_STUDY
            );
            const stateNext = state;

            // 初始化學系
            const out_options = result(
                state.form['comment'],
                commentTable.keysTable['out_maj'][0]
            ).options.concat(
                action.payload.departmentArr.map((department) => ({
                    value: department.name,
                    text: department.name,
                }))
            );

            // in沒有college，要獨立寫
            const in_options = result(
                state.form['comment'],
                commentTable.keysTable['in_maj'][0]
            ).options.concat(
                action.payload.departmentArr.map((department) => ({
                    value: department.name,
                    text: department.name,
                }))
            );

            const out_maj = {
                ...result(
                    state.form['comment'],
                    commentTable.keysTable['out_maj'][0]
                ),
                options: out_options,
            };
            const in_maj = {
                ...result(
                    state.form['comment'],
                    commentTable.keysTable['in_maj'][0]
                ),
                options: in_options,
            };

            stateNext.form.comment.id = -1;
            set(
                state.form['comment'],
                commentTable.keysTable['out_maj'][0],
                out_maj
            );
            set(
                state.form['comment'],
                commentTable.keysTable['in_maj'][0],
                in_maj
            );

            return stateNext;
        }
        case INIT_POST_OPTION_COLLEGE: {
            const stateNext = state;

            // 初始化學系
            const options = result(
                stateNext.form['comment'],
                commentTable.keysTable['out_maj'][0]
            ).options.concat(
                action.payload.collegeArr.map((college) => ({
                    value: college.name,
                    text: college.name,
                }))
            );
            const out_maj = {
                ...result(
                    stateNext.form['comment'],
                    commentTable.keysTable['out_maj'][0]
                ),
                options,
            };
            const maj = {
                ...result(
                    stateNext.form['study'],
                    studyTable.keysTable['maj'][0]
                ),
                options,
            };
            set(
                state.form['comment'],
                commentTable.keysTable['out_maj'][0],
                out_maj
            );
            set(state.form['study'], studyTable.keysTable['maj'][0], maj);
            return stateNext;
        }
        case SET_POST_FORM: {
            const stateNext = state;
            const { type, step } = stateNext;
            const { value, elementArea, elementIndex, customHandleChange } =
                action.payload;
            if (customHandleChange) {
                const preventDefault = !customHandleChange(
                    stateNext,
                    step,
                    elementArea,
                    elementIndex,
                    value
                );
                if (preventDefault) return stateNext;
            }
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
            const { keysTable, instanceAbleTable } =
                DataMapping.transObjToKeysTable(stateNext.form[stateNext.type]);
            for (let key in dataNext) {
                if (!keysTable[key] && !instanceAbleTable[key]) {
                    stateNext.form[stateNext.type][key] = dataNext[key];
                    continue;
                }
                if (!keysTable[key] && instanceAbleTable[key]) {
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
                                  .slice(0, -1)
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
        case SET_STUDY_STATIS_OPTIONS: {
            const stateNext = state;
            const stats = action.payload;
            map(stats, (stat, index) => {
                stateNext.form['study'].pageMap[2][1][0].value[index + 1] = {
                    id: index + 1,
                    title: stat.name,
                    instance: {
                        value: '',
                        elementAttrs: {
                            type: stat.dataType,
                            min: stat.min,
                            max: stat.max,
                        },
                        keyName: stat.name,
                        type: 'input',
                        wording: stat.name,
                    },
                };
            });
        }
        default:
            return state;
    }
};

export default postReducer;
