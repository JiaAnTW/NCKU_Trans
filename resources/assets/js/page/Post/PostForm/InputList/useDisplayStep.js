import React, { useEffect, useState } from 'react';

function useDisplayStep(stepNow) {
    const [counter, setCounter] = useState(0);
    const [displayStep, setdisplayStep] = useState(stepNow);
    useEffect(() => {
        if (counter === 1) {
            setCounter(0);
            setdisplayStep(stepNow);
        }
    }, [stepNow]);
    return displayStep;
}

export default useDisplayStep;
