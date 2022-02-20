import cloneDeep from 'lodash/cloneDeep';
import postReducer from '~/model/reducer/post';
import { SET_POST_FORM, TOGGLE_STATIS_DATA } from '~/model/action/post';
import post from './post';
import dataMapping from '~/utils/redux/components/modal/dataMapping';
import result from 'lodash/result';

// init postForm
const { initPost, initComment, initStudy } = post;
const postForm = initPost;
/**
 * global function
 *
 *
 */
const setPage = (page) => (postForm.step = page * 2);
const setType = (type) => (postForm.type = type);
const formSelector = (state, type) => state.form[type];
const getTable = (obj, type) =>
    dataMapping.forceTransObjToKeysTable(obj.form[type]);
/**
 * global function end
 */

/**
 *  start to test comment post
 *
 */

test('[Comment] Should return the initial state', () => {
    expect(JSON.stringify(postReducer(undefined, {}).form.comment)).toEqual(
        JSON.stringify(initComment)
    );
});
test('[Comment] Should change value without changing schema', () => {
    setPage(1); //switch to target page
    const initState = cloneDeep(postReducer(postForm, {}));
    let nextState = postReducer(initState, {
        type: SET_POST_FORM,
        payload: {
            keyName: 'score',
            value: 87,
            elementArea: 0,
            elementIndex: 6,
        },
    });
    let commentForm = formSelector(nextState, 'comment');

    const commentTable = getTable(initState, 'comment');
    // Should Change value correctly
    const scoreValue = result(
        commentForm,
        commentTable.keysTable['score'][0]
    ).value;
    expect(scoreValue).toBe(87);

    // Should have same schema after set post
    nextState = postReducer(nextState, {
        type: SET_POST_FORM,
        payload: {
            keyName: 'score',
            value: '',
            elementArea: 0,
            elementIndex: 6,
        },
    });
    commentForm = formSelector(nextState, 'comment');
    expect(commentForm).toEqual(initComment);
});

/**
 * comment post was tested
 */

/**
 *  start to test study post
 *
 */
test('[Study] Should return the initial state', () => {
    expect(JSON.stringify(postReducer(undefined, {}).form.study)).toEqual(
        JSON.stringify(initStudy)
    );
});

test('[Study] Should change 1th page value without changing schema', () => {
    setPage(1); //switch to target page
    setType('study');
    const initState = cloneDeep(postReducer(postForm, {}));
    let nextState = postReducer(initState, {
        type: SET_POST_FORM,
        payload: {
            keyName: 'maj',
            value: '軟體測試系',
            elementArea: 0,
            elementIndex: 2,
        },
    });
    let studyForm = formSelector(nextState, 'study');

    const studyTable = getTable(initState, 'study');
    // Should Change value correctly
    const scoreValue = result(studyForm, studyTable.keysTable['maj'][0]).value;
    expect(scoreValue).toBe('軟體測試系');

    // Should have same schema after set post
    nextState = postReducer(nextState, {
        type: SET_POST_FORM,
        payload: {
            keyName: 'maj',
            value: '',
            elementArea: 0,
            elementIndex: 1,
        },
    });
    studyForm = formSelector(nextState, 'comment');
    expect(studyForm).toEqual(initComment);
});
test('[Study] Should Normal Toggle Button work and change Statistic 2th page value without changing schema', () => {
    setPage(2); //switch to target page
    setType('study');
    const initState = cloneDeep(postReducer(postForm, {}));
    let studyTable = getTable(initState, 'study');

    //alertWord show at start
    expect(initState.form['study'].pageMap[2][1].alertWord).toEqual({
        value: '*目前沒有選擇任何統計資料項目',
        type: 'label',
        color: 'black',
        align: 'left',
    });
    //spawn statistic input
    let nextState = postReducer(initState, {
        type: TOGGLE_STATIS_DATA,
        payload: {
            elementArea: 1,
            elementIndex: 0,
            id: 1,
        },
    });
    let studyForm = formSelector(nextState, 'study');
    expect(JSON.stringify(studyForm.pageMap[2][1][1])).toEqual(
        JSON.stringify(
            result(
                formSelector(postForm, 'study'),
                studyTable.instanceAbleTable['score'][0]
            )
        )
    );

    //alertWord hide
    expect(initState.form['study'].pageMap[2][1].alertWord).toEqual({
        value: '*目前沒有選擇任何統計資料項目',
        type: 'label',
        color: 'black',
        align: 'left',
        display: 'none',
    });
    // Should Change value correctly
    nextState = postReducer(nextState, {
        type: SET_POST_FORM,
        payload: {
            keyName: 'score',
            value: 87,
            elementArea: 1,
            elementIndex: 1,
        },
    });
    studyTable = getTable(initState, 'study');
    let scoreValue = result(studyForm, studyTable.keysTable['score'][0]).value;
    expect(scoreValue).toBe(87);

    //test toggle button will remark if input did any value
    nextState = postReducer(initState, {
        type: TOGGLE_STATIS_DATA,
        payload: {
            elementArea: 1,
            elementIndex: 0,
            id: 1,
        },
    });
    studyForm = formSelector(nextState, 'study');
    let instance = {
        ...result(
            formSelector(postForm, 'study'),
            studyTable.instanceAbleTable['score'][0]
        ),
    };
    instance.value = 87;
    instance.remark = '請先清除輸入的資料，確認後再移除此項目';
    expect(JSON.stringify(studyForm.pageMap[2][1][1])).toEqual(
        JSON.stringify(instance)
    );

    // clean this input
    nextState = postReducer(nextState, {
        type: SET_POST_FORM,
        payload: {
            keyName: 'score',
            value: '',
            elementArea: 1,
            elementIndex: 1,
        },
    });
    scoreValue = result(studyForm, studyTable.keysTable['score'][0]).value;
    expect(scoreValue).toBe('');

    //delete input
    nextState = postReducer(initState, {
        type: TOGGLE_STATIS_DATA,
        payload: {
            elementArea: 1,
            elementIndex: 0,
            id: 1,
        },
    });
    studyForm = formSelector(nextState, 'study');
    expect(studyForm.pageMap[2][1][1]).toBe(undefined);
    //drop automatic spawn attribute
    delete studyForm.pageMap[2][1].alertWord.display;
    //alertWord show again
    expect(initState.form['study'].pageMap[2][1].alertWord).toEqual({
        value: '*目前沒有選擇任何統計資料項目',
        type: 'label',
        color: 'black',
        align: 'left',
    });
    studyForm = formSelector(nextState, 'study');
    expect(studyForm).toEqual(initStudy);
});

test('[Study] Should Normal Button(Toggle Button) work and change value to expected with changing schema in expected', () => {
    const initState = cloneDeep(postReducer(postForm, {}));
    let studyTable = getTable(initState, 'study');
    //alertWord show at start
    expect(initState.form['study'].pageMap[2][1].alertWord).toEqual({
        value: '*目前沒有選擇任何統計資料項目',
        type: 'label',
        color: 'black',
        align: 'left',
    });
    //spawn statistic input
    let nextState = postReducer(initState, {
        type: TOGGLE_STATIS_DATA,
        payload: {
            elementArea: 1,
            elementIndex: 0,
            id: 7,
        },
    });
    let instance = {
        ...result(
            formSelector(initState, 'study'),
            studyTable.instanceAbleTable['other'][0]
        ),
    };
    instance.wording += 1;
    instance.counter -= 1;
    let studyForm = formSelector(nextState, 'study');
    expect(JSON.stringify(studyForm.pageMap[2][2][1])).toEqual(
        JSON.stringify(instance)
    );

    //alertWord hide
    expect(initState.form['study'].pageMap[2][1].alertWord).toEqual({
        value: '*目前沒有選擇任何統計資料項目',
        type: 'label',
        color: 'black',
        align: 'left',
        display: 'none',
    });

    //spawn again (got two other input now)
    nextState = postReducer(initState, {
        type: TOGGLE_STATIS_DATA,
        payload: {
            elementArea: 1,
            elementIndex: 0,
            id: 7,
        },
    });
    studyForm = formSelector(nextState, 'study');
    instance = {
        ...result(
            formSelector(postForm, 'study'),
            studyTable.instanceAbleTable['other'][0]
        ),
    };
    instance.wording += 2;
    instance.counter += 1;
    expect(JSON.stringify(studyForm.pageMap[2][2][2])).toEqual(
        JSON.stringify(instance)
    );
    // clean this input
    nextState = postReducer(nextState, {
        type: SET_POST_FORM,
        payload: {
            keyName: 'other',
            value: { title: '猜猜我是誰', value: '矮額還需要猜嗎' },
            elementArea: 2,
            elementIndex: 2,
        },
    });
    studyTable = getTable(initState, 'study');
    let otherValue1 = result(studyForm, studyTable.keysTable['other'][1]).value;
    let otherValue2 = result(studyForm, studyTable.keysTable['other'][0]).value;
    expect(otherValue1).toEqual({
        title: '猜猜我是誰',
        value: '矮額還需要猜嗎',
    });
    expect(otherValue2).toEqual({ title: '', value: '' });
});
/**
 * study post was tested
 */

/**
 * test overwrite post form
 */

/**
 * overwrite post form was tested
 */
