import React from 'react';
import { useSelector } from 'react-redux';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';

import { postStepSelector } from '~/model/selector/post';

import {
    QontoConnector,
    useQontoStepIconStyles,
    StepAreaContainer,
} from './style';

function QontoStepIcon(props) {
    const classes = useQontoStepIconStyles();
    const { active, completed } = props;
    //console.log(props);

    return (
        <div className={active ? classes.active : classes.inactive}>
            {completed ? (
                <Check className={classes.completed} />
            ) : (
                <div className={classes.circle} />
            )}
        </div>
    );
}

const defaultStepArr = [];

function StepArea() {
    const activeStep = useSelector((state) => state.post.step);
    const stepInfo = useSelector(postStepSelector);
    const currentStep = Math.floor(activeStep / 2);
    const stepArr = currentStep === 0 ? defaultStepArr : stepInfo;

    return (
        <StepAreaContainer>
            <Stepper
                alternativeLabel
                activeStep={Math.floor(currentStep)}
                connector={<QontoConnector />}
            >
                {stepArr.map((label) => (
                    <Step key={label.index}>
                        <StepLabel StepIconComponent={QontoStepIcon}>
                            {label.description}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </StepAreaContainer>
    );
}

export default StepArea;
