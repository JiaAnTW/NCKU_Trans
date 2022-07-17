import React, { useEffect } from 'react';
import { Circle } from 'rc-progress';

import { color } from '~/theme/global';
import CircularProgress from '@material-ui/core/CircularProgress';

import useProgress from './useProgress';
import { ProgressLayout, ProgressValueText, TypeText } from './style';

function Progress({ value, name, isLoading }) {
    const percent = useProgress(
        value === null || isLoading ? 100 : Math.round(value * 100) / 100
    );

    return (
        <ProgressLayout>
            {isLoading && <CircularProgress />}
            {!isLoading && (
                <>
                    <Circle
                        style={{ width: '70px', margin: '0 11.25px' }}
                        percent={percent.toString()}
                        strokeWidth="4"
                        strokeColor={color.yellow}
                        trailColor={color.darkGray}
                    />
                    <ProgressValueText>
                        {value === null ? '無' : Number(percent).toFixed(1)}
                    </ProgressValueText>
                    <TypeText>{name}</TypeText>
                </>
            )}
        </ProgressLayout>
    );
}

export default Progress;
