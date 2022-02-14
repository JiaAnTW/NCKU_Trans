import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import usePostControl from '../usePostControl';
import { typePage } from '~/components/Form/typeList.js';

function useDisplayElement() {
    const stepNow = useSelector((state) => state.post.step);
    const type = useSelector((state) => state.post.type);

    const [counter, setCounter] = useState(0);
    const [displayStep, setDisplayStep] = useState(stepNow);
    const { onNext, onPreview, onBefore } = usePostControl('major', 700);
    useEffect(() => {
        if (counter === 1) {
            setCounter(0);
            setDisplayStep(stepNow);
        }
    }, [stepNow]);

    const formInputArr = useSelector((state) => {
        return { ...state.post.form[type].pageMap[displayStep / 2] };
    });

    const handleOnClickNext = useCallback(() => {
        if (stepNow === (typePage[type].length - 2) * 2) {
            onPreview();
        } else {
            onNext();
        }
    });
    const handleOnClickBefore = useCallback(() => {
        onBefore();
    });
    return { formInputArr, handleOnClickNext, handleOnClickBefore };
}

export default useDisplayElement;
