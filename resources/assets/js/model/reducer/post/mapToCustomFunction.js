import cloneDeep from 'lodash/cloneDeep';
import customFunction from './function';

const customArea = {
    other: 2,
};
export function mapToCustomizeFunction(type) {
    switch (type) {
        case 'spawn_other':
            return (state, instance) => {
                const stateNext = state;
                const { type, step } = stateNext;
                const preSpawn = cloneDeep(instance);
                preSpawn.wording += instance.counter;
                stateNext.form[type].pageMap[step / 2][customArea.other][
                    instance.counter++
                ] = preSpawn;
            };
        case 'searchingAlgorithm': //here brute force code
            return customFunction.searchingAlgorithm;

        default:
            return undefined;
    }
}
