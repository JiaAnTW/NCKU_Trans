import React from 'react';
import { useSelector } from 'react-redux';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';

import { QontoConnector, useQontoStepIconStyles } from './style';

function QontoStepIcon(props) {
    const classes = useQontoStepIconStyles();
    const { active, completed } = props;
    //console.log(props);

    return (
        <div className={classes.active}>
            {completed ? (
                <Check className={classes.completed} />
            ) : (
                <Check className={classes.completed} />
            )}
        </div>
    );
}

const stepArr = [
    { number: 0, description: '選擇分享類別' },
    { number: 1, description: '填寫基本資訊和心得內文' },
    { number: 2, description: '等待送出成功' },
];

function StepArea() {
    const activeStep = useSelector((state) => state.post.step);

    return (
        <Stepper
            alternativeLabel
            activeStep={Math.floor(activeStep / 2)}
            connector={<QontoConnector />}
        >
            {stepArr.map((label) => (
                <Step key={label.number}>
                    <StepLabel StepIconComponent={QontoStepIcon}>
                        {label.description}
                    </StepLabel>
                </Step>
            ))}
        </Stepper>
    );
}

export default StepArea;
