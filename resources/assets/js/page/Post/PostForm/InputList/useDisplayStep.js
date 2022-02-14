import React, { useEffect, useState } from 'react';

function useDisplayStep(stepNow) {
    const [counter, setCounter] = useState(0);
    const [displayStep, setDisplayStep] = useState(stepNow);
    useEffect(() => {
        if (counter === 1) {
            setCounter(0);
            setDisplayStep(stepNow);
        }
    }, [stepNow]);
    return displayStep;
}

export default useDisplayStep;
