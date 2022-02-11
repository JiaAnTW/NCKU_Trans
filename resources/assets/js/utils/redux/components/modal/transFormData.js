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
function travelObj(obj) {
    const previousKeysTable = {};
    const queue = [
        {
            obj: obj,
            key: [],
        },
    ];
    let front;
    while (queue.length > 0) {
        front = queue.pop();
        for (let key in front.obj) {
            if (typeof front.obj[key] === 'object' && key !== 'instance')
                queue.push({ obj: front.obj[key], key: [...front.key, key] });
        }
        if (front.obj.keyName && previousKeysTable[front.obj.keyName]) {
            previousKeysTable[front.obj.keyName] = previousKeysTable[
                front.obj.keyName
            ].push(front.key);
        }
        if (front.obj.keyName && !previousKeysTable[front.obj.keyName]) {
            previousKeysTable[front.obj.keyName] = front.key;
        }
    }
    return previousKeysTable;
}
function transFormData(dataObj, settingKeyName, onlySettingKeyName = false) {
    const specialSetting = {};
    const omitArray = [];
    const previousKeysTable = travelObj(dataObj, previousKeysTable);

    for (let key in settingKeyName) {
        const dataObjKey = settingKeyName[key];
        const keyPath = previousKeysTable[dataObjKey];
        specialSetting[key] = result(dataObj, keyPath).value;
        omitArray.push(dataObjKey);
    }

    const tagObj = omit(previousKeysTable, omitArray);

    const tags = map(tagObj, (pathArr) => {
        const item = result(dataObj, pathArr.join('.'));
        return {
            type: item.wording,
            value: majorWording[item.keyName]
                ? majorWording[item.keyName][item.value]
                : item.value,
        };
    });

    const returnValue = {
        id: -1,
        tags: tags,
        index: -1,
        confirm: false,
        ...specialSetting,
    };
    return onlySettingKeyName ? omit(returnValue, ['tags']) : returnValue;
}

export default transFormData;
