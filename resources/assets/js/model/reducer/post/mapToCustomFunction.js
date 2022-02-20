import cloneDeep from 'lodash/cloneDeep';
import map from 'lodash/map';
import set from 'lodash/set';
import result from 'lodash/result';
import dataMapping from '~/utils/redux/components/modal/dataMapping';

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
            return (state, step, elementArea, elementIndex, value) => {
                const stateNext = state;
                const type = stateNext.type;
                const { keysTable } = dataMapping.transObjToKeysTable(
                    stateNext.form[type],
                    dataMapping.action.getController,
                    dataMapping.queryKey.controller
                );
                const buttons = result(
                    stateNext.form[type],
                    keysTable['search_bar'][0]
                );
                let ignoreTable = [];
                let regs = {};
                let skipAction = false;
                map(buttons, (button, index) => {
                    if (value === '') {
                        skipAction = true;
                        return;
                    }
                    if (typeof button === 'object' && button.title !== value) {
                        const hashMap = {};
                        let i; //counter
                        for (i = 0; i < button.title.length; i++) {
                            hashMap[button.title[i]] = 1;
                        }
                        for (i = 0; i < value.length; i++) {
                            if (hashMap[value[i]]) {
                                if (regs[index]) {
                                    regs[index]++;
                                } else {
                                    regs[index] = 1;
                                }
                            }
                        }
                        ignoreTable.push(index);
                    }
                    if (typeof button === 'object' && button.title === value) {
                        // matched
                        skipAction = true;
                        return;
                    }
                });
                if (skipAction) {
                    delete stateNext.form[type].pageMap[step / 2][elementArea][
                        elementIndex
                    ].remark;
                    set(
                        stateNext.form[type],
                        keysTable['search_bar'][0]
                            .slice(0, -1)
                            .concat('ignore'),
                        ignoreTable
                    );
                    return true; // this is preventDefault
                }
                let trigger = false;
                map(regs, (reg, index) => {
                    if (reg > value.length * 0.5) {
                        ignoreTable.splice(ignoreTable.indexOf(index), 1);
                        trigger = true;
                    }
                });
                ignoreTable = ignoreTable.slice(0, -1); // others selection always is the last one
                set(
                    stateNext.form[type],
                    keysTable['search_bar'][0].slice(0, -1).concat('ignore'),
                    ignoreTable
                );
                if (trigger)
                    stateNext.form[type].pageMap[step / 2][elementArea][
                        elementIndex
                    ].remark = '猜你想找';
                else {
                    stateNext.form[type].pageMap[step / 2][elementArea][
                        elementIndex
                    ].remark = '查無選項';
                }
                return true; // this is preventDefault
            };
        default:
            return undefined;
    }
}
