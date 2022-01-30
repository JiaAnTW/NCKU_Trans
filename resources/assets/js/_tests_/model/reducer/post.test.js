import cloneDeep from 'lodash/cloneDeep';
import postReducer from '~/model/reducer/post';

import { SET_POST_FORM } from '~/model/action/post';
import { initComment } from './initComment';

const formSelector = (state, type) => state.form[type].pageMap[2];

test('[Comment] Should return the initial state', () => {
    expect(postReducer(undefined, {}).form.comment).toEqual(initComment);
});

test('[Comment] Should change value without changing schema', () => {
    const initState = cloneDeep(postReducer(undefined, {}));
    const testState = cloneDeep(initState);
    let nextState = postReducer(initState, {
        type: SET_POST_FORM,
        payload: { keyName: 'score', value: 87 },
    });
    let commentForm = formSelector(nextState, 'comment');

    // Should Change value correctly
    const scoreValue = commentForm.score.value;
    expect(scoreValue).toBe(87);

    // Should have same schema after set post
    nextState = postReducer(nextState, {
        type: SET_POST_FORM,
        payload: { keyName: 'score', value: '' },
    });
    commentForm = formSelector(nextState, 'comment');
    expect(commentForm).toEqual(testState);
});
