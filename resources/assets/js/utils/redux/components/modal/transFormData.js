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
    const stack = [
        {
            obj: obj,
            key: [],
        },
    ];
    let top;
    while (stack.length > 0) {
        top = stack.pop();
        for (let key in top.obj) {
            if (typeof top.obj[key] === 'object' && key !== 'instance')
                stack.push({ obj: top.obj[key], key: [...top.key, key] });
        }
        if (top.obj.keyName && previousKeysTable[top.obj.keyName]) {
            previousKeysTable[top.obj.keyName] = previousKeysTable[
                top.obj.keyName
            ].push(top.key);
        }
        if (top.obj.keyName && !previousKeysTable[top.obj.keyName]) {
            previousKeysTable[top.obj.keyName] = [top.key];
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
        const keyPaths = previousKeysTable[dataObjKey];
        map(keyPaths, (keyPath) => {
            specialSetting[key] = result(dataObj, keyPath).value;
        });
        omitArray.push(dataObjKey);
    }
    const tagObj = omit(previousKeysTable, omitArray);

    const tags = [];
    map(tagObj, (keyPaths) => {
        map(keyPaths, (keyPath) => {
            const item = result(dataObj, keyPath);
            tags.push({
                type: item.wording,
                value: majorWording[item.keyName]
                    ? majorWording[item.keyName][item.value]
                    : item.value,
            });
        });
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
