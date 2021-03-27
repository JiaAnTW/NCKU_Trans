import React, { useState, useEffect } from 'react';

import Slide from '@material-ui/core/Slide';

function SlideStep({ currentStep, step, timeout, children }) {
    const [side, setSide] = useState('left');

    useEffect(() => {
        if (step === currentStep + 1) {
            setSide('left');
        } else if (step === currentStep - 1) {
            setSide('right');
        }
    }, [currentStep, step]);

    return (
        <Slide
            direction={side}
            in={currentStep === step}
            mountOnEnter
            unmountOnExit
            timeout={timeout}
        >
            {children}
        </Slide>
    );
}

export default SlideStep;
