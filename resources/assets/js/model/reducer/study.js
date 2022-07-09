import findIndex from 'lodash/findIndex';
import {
    ADD_STUDY_STAT,
    CLEAR_STUDY_FILTER,
    DELETE_STUDY_STAT,
    INIT_STUDY,
    INIT_STUDY_STAT,
    SET_STUDY_FILTER,
    START_EDIT_TAG,
    STOP_EDIT_TAG,
    UPDATE_STUDY_STAT,
    UPDATE_TAG,
    SET_FILTER_OPEN,
    SET_FILTER_MANAGE,
    UPDATE_STUDY,
    INIT_OTHER_STAT,
    SET_OTHER_STAT_DATA,
    SET_PENDING_SUBMIT,
} from '../action/study';

const date = new Date();
const getYearArr = () => {
    const currentYear = date.getFullYear();
    let arr = [];
    for (let i = currentYear; i > currentYear - 5; i--) {
        let year = (i - 1911).toString();
        arr.push({ id: year, name: year + '年', value: year });
    }
    return arr.slice(0, 4);
};
const yearArr = getYearArr();

const initState = {
    data: [],
    stopFetch: false,
    admin: {
        action: undefined,
        tag: {
            id: undefined,
            type: undefined,
            dataType: undefined,
            max: undefined,
            min: undefined,
            selected: false,
        },
    },
    filter: {
        category: [],
        statInfo: [],
        year: yearArr,
        status: {
            isOpen: false,
            isManage: false,
            isEditTag: false,
        },
    },
    otherStatData: [],
};

const studyReducer = (state = initState, action) => {
    switch (action.type) {
        case INIT_STUDY: {
            const initData = action.payload.data.map((item) => {
                item.content = item.content.replace(/<br>/g, '\n');
                return item;
            });
            const stopFetch =
                initData.length < action.payload.num ? true : false;
            return { ...state, data: initData, stopFetch };
        }
        case UPDATE_STUDY: {
            const { num } = action.payload;
            const data = action.payload.data.map((item) => {
                item.content = item.content.replace(/<br>/g, '\n');
                return item;
            });
            let stopFetch = data.length < num ? true : false;
            if (stopFetch)
                return { ...state, data: [...state.data, ...data], stopFetch };

            const dataSize = state.data.length;
            for (let i = 0; i < num; i++) {
                const compareTarget = state.data[dataSize - i - 1];
                for (let j = 1; j < num; j++) {
                    const dataNext = data[j];
                    if (compareTarget.id === dataNext.id) {
                        stopFetch = true;
                        return { ...state, stopFetch };
                    }
                }
            }

            return { ...state, data: [...state.data, ...data], stopFetch };
        }
        case SET_FILTER_OPEN: {
            return {
                ...state,
                filter: {
                    ...state.filter,
                    status: {
                        ...state.filter.status,
                        isOpen: action.payload.isOpen,
                    },
                },
            };
        }
        case SET_FILTER_MANAGE: {
            return {
                ...state,
                filter: {
                    ...state.filter,
                    status: {
                        ...state.filter.status,
                        isManage: action.payload.isManage,
                    },
                },
            };
        }
        case START_EDIT_TAG: {
            return {
                ...state,
                admin: {
                    action: action.payload.action,
                    tag: { ...action.payload.tag },
                },
                filter: {
                    ...state.filter,
                    status: {
                        ...state.filter.status,
                        isEditTag: true,
                    },
                },
            };
        }
        case STOP_EDIT_TAG: {
            return {
                ...state,
                admin: {
                    action: undefined,
                    tag: {
                        id: undefined,
                        type: undefined,
                        dataType: undefined,
                        max: undefined,
                        min: undefined,
                        selected: false,
                    },
                },
                filter: {
                    ...state.filter,
                    status: {
                        ...state.filter.status,
                        isEditTag: false,
                    },
                },
            };
        }
        case UPDATE_TAG: {
            return {
                ...state,
                admin: {
                    ...state.admin,
                    tag: {
                        ...state.admin.tag,
                        ...action.payload.tag,
                    },
                },
            };
        }
        case INIT_STUDY_STAT: {
            const { type, data } = action.payload;
            let filter = { ...state.filter };
            filter[type] = data;

            return {
                ...state,
                filter,
            };
        }
        case SET_STUDY_FILTER: {
            const { tagType, tagId, checked } = action.payload;

            let tags = [...state.filter[tagType]];
            const tagIndex = findIndex(tags, { id: tagId });
            tags[tagIndex].selected = checked;

            return {
                ...state,
                filter: {
                    ...state.filter,
                    [tagType]: tags,
                },
            };
        }
        case CLEAR_STUDY_FILTER: {
            let filter = { ...state.filter };

            Object.values(filter).forEach((tagList) => {
                for (let tag of tagList) {
                    tag.selected = false;
                }
            });
            return { ...state, filter };
        }
        case ADD_STUDY_STAT: {
            let { type, tag } = action.payload;
            let tagList = [...state.filter[type]];
            tagList.push(tag);

            return {
                ...state,
                filter: {
                    ...state.filter,
                    [type]: tagList,
                },
            };
        }
        case UPDATE_STUDY_STAT: {
            const { type, tag } = action.payload;

            let tagList = [...state.filter[type]];
            const tagIndex = findIndex(tagList, { id: tag.id });
            tagList[tagIndex] = { ...tag };
            const newData = state.data.map((data) => {
                const newCategory = data.category.map((obj) => {
                    if (obj.id === tag.id) {
                        obj.name = tag.name;
                    }
                    return obj;
                });
                return { ...data, category: newCategory };
            });

            return {
                ...state,
                data: newData,
                filter: {
                    ...state.filter,
                    [type]: tagList,
                },
            };
        }
        case DELETE_STUDY_STAT: {
            const { type, tagId } = action.payload;

            let tagList = [...state.filter[type]];
            const tagIndex = findIndex(tagList, { id: tagId });
            tagList.splice(tagIndex, 1);
            const newData = state.data.map((data) => {
                const newCategory = data.category.filter(
                    (obj) => obj.id !== tagId
                );
                return { ...data, category: newCategory };
            });

            return {
                ...state,
                data: newData,
                filter: {
                    ...state.filter,
                    [type]: tagList,
                },
            };
        }
        case INIT_OTHER_STAT: {
            const stateNext = state;
            const data = action.payload;

            data.map((otherStatData) => {
                const nextOtherStatData = { ...otherStatData };
                nextOtherStatData['nextName'] = otherStatData.name;
                nextOtherStatData['nextValue'] = otherStatData.value;
                stateNext.otherStatData.push(nextOtherStatData);
            });

            return stateNext;
        }
        case SET_OTHER_STAT_DATA: {
            const stateNext = state;
            const { name, value, elementIndex } = action.payload;

            const nextOtherStatData = Array.from(stateNext.otherStatData);
            nextOtherStatData[elementIndex]['nextName'] = name;
            nextOtherStatData[elementIndex]['nextValue'] = value;

            stateNext.otherStatData = nextOtherStatData;
            return stateNext;
        }
        case SET_PENDING_SUBMIT: {
            const stateNext = state;
            const { elementIndex, target } = action.payload;

            const nextOtherStatData = Array.from(stateNext.otherStatData);
            nextOtherStatData[elementIndex][target] =
                !nextOtherStatData[elementIndex][target];
            stateNext.otherStatData = nextOtherStatData;

            return stateNext;
        }
        default:
            return state;
    }
};

export default studyReducer;
