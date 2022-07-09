import cloneDeep from 'lodash/cloneDeep';
import customFunction from './function';

const customPage = {
    otherStat: 2,
};
const customArea = {
    otherStat: 2,
};
export function mapToCustomizeFunction(type) {
    switch (type) {
        case 'spawn_otherStat':
            return (state, instance) => {
                const stateNext = state;
                const { type, step } = stateNext;
                const preSpawn = cloneDeep(instance);
                preSpawn.wording += instance.counter;
                stateNext.form[type].pageMap[customPage.otherStat][
                    customArea.otherStat
                ][instance.counter++] = preSpawn;
            };
        case 'searchingAlgorithm': //here brute force code
            return customFunction.searchingAlgorithm;

        default:
            return undefined;
    }
}
