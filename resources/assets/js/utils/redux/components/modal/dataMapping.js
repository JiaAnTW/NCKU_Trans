import map from 'lodash/map';
import omit from 'lodash/omit';
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
const action = {
    GET_INIT_COMMENT: 'GET_INIT_COMMENT',
    GET_INIT_STUDY: 'GET_INIT_STUDY',
    GET_CONTROLLER: 'GET_CONTROLLER',
};
const queryKey = {
    keyName: 'keyName',
    controller: 'controller',
};

const defaultTable = {};
function transObjToKeysTable(obj, action = '', queryKey = 'keyName') {
    if (defaultTable[action]) {
        return defaultTable[action];
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
                instanceAbleTable[front.obj[key][queryKey]]
            ) {
                instanceAbleTable[front.obj[key][queryKey]].push(
                    front.key.concat('instance')
                );
                continue;
            }
            if (
                typeof front.obj[key] === 'object' &&
                key === 'instance' &&
                !instanceAbleTable[front.obj[key][queryKey]]
            ) {
                instanceAbleTable[front.obj[key][queryKey]] = [
                    front.key.concat('instance'),
                ];
                continue;
            }
            if (typeof front.obj[key] === 'object')
                stack.push({ obj: front.obj[key], key: [...front.key, key] });
        }
        if (front.obj[queryKey] && keysTable[front.obj[queryKey]]) {
            keysTable[front.obj[queryKey]].push(front.key);
        }
        if (front.obj[queryKey] && !keysTable[front.obj[queryKey]]) {
            keysTable[front.obj[queryKey]] = [front.key];
        }
    }
    if (!defaultTable[action]) {
        defaultTable[action] = { keysTable, instanceAbleTable };
    }

    return { keysTable, instanceAbleTable };
}

function forceTransObjToKeysTable(
    obj,
    action = 'default',
    queryKey = 'keyName'
) {
    delete defaultTable[action];
    return transObjToKeysTable(obj, action, queryKey);
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
function DataMapping() {}

DataMapping.action = action;
DataMapping.queryKey = queryKey;
DataMapping.transObjToKeysTable = transObjToKeysTable;
DataMapping.transFormData = transFormData;
DataMapping.forceTransObjToKeysTable = forceTransObjToKeysTable;
export default DataMapping;