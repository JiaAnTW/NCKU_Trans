import map from 'lodash/map';
import omit from 'lodash/omit';
import isEmpty from 'lodash/isEmpty';
import result from 'lodash/result';
import majorWording from '~/wording/major.json';

// 透過settingKeyName這個物件去設定dataObj當中有哪些屬性要特別設定

/*
Interface settingKeyName = {
    title?: string,
    subtitle?: string,
    type?: string,
    ...
}
*/
function action() {
    this.remp = 'remap';
}

const blackList = []; //able use import to replace
let defaultTable = {};
function transObjToKeysTable(obj, type = 'remap') {
    if (blackList.indexOf(type) !== -1 && !isEmpty(defaultTable)) {
        return defaultTable;
    }
    // maybe later can separate to a new js file
    const keysTable = {};
    const instanceAbleTable = {};
    const stack = [
        {
            obj: obj,
            key: [],
        },
    ];
    let front;
    while (stack.length > 0) {
        front = stack[0];
        stack.shift();
        for (let key in front.obj) {
            if (
                typeof front.obj[key] === 'object' &&
                key === 'instance' &&
                instanceAbleTable[front.obj[key].keyName]
            ) {
                instanceAbleTable[front.obj[key].keyName].push(
                    front.key.concat('instance')
                );
                continue;
            }
            if (
                typeof front.obj[key] === 'object' &&
                key === 'instance' &&
                !instanceAbleTable[front.obj[key].keyName]
            ) {
                instanceAbleTable[front.obj[key].keyName] = [
                    front.key.concat('instance'),
                ];
                continue;
            }
            if (typeof front.obj[key] === 'object')
                stack.push({ obj: front.obj[key], key: [...front.key, key] });
        }
        if (front.obj.keyName && keysTable[front.obj.keyName]) {
            keysTable[front.obj.keyName].push(front.key);
        }
        if (front.obj.keyName && !keysTable[front.obj.keyName]) {
            keysTable[front.obj.keyName] = [front.key];
        }
    }
    if (blackList.indexOf(type) !== -1 && isEmpty(defaultTable)) {
        defaultTable = { keysTable, instanceAbleTable };
    }
    return { keysTable, instanceAbleTable };
}

function transFormData(
    dataObj,
    settingKeyName,
    id = -1,
    confirm = false,
    onlySettingKeyName = false
) {
    const specialSetting = {};
    const omitArray = [];
    const { keysTable } = transObjToKeysTable(dataObj);
    for (let key in settingKeyName) {
        const dataObjKey = settingKeyName[key];
        const keyPaths = keysTable[dataObjKey];
        map(keyPaths, (keyPath) => {
            const item = result(dataObj, keyPath, undefined);
            if (!item) return;
            specialSetting[key] = item.value;
        });
        omitArray.push(dataObjKey);
    }
    const tagObj = omit(keysTable, omitArray);
    const tags = [];
    map(tagObj, (keyPaths) => {
        map(keyPaths, (keyPath) => {
            const item = result(dataObj, keyPath, undefined);
            if (!item) return;
            if (keyPath.length > 1)
                tags.push({
                    type: item.wording,
                    value: majorWording[item.keyName]
                        ? majorWording[item.keyName][item.value]
                        : item.value,
                });
        });
    });
    const returnValue = {
        id: id,
        tags: tags,
        index: -1,
        confirm: confirm,
        ...specialSetting,
    };
    return onlySettingKeyName ? omit(returnValue, ['tags']) : returnValue;
}

function dataMapping() {}
dataMapping.action = action;
dataMapping.transObjToKeysTable = transObjToKeysTable;
dataMapping.transFormData = transFormData;
export default dataMapping;
