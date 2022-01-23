import map from 'lodash/map';
import omit from 'lodash/omit';
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

function transFormData(dataObj, settingKeyName) {
    let omitArray = ['id'];
    const specialSetting = {};

    for (let key in settingKeyName) {
        const dataObjKey = settingKeyName[key];
        specialSetting[key] = dataObj[dataObjKey].value;
        omitArray.push(dataObjKey);
    }

    const tagObj = omit(dataObj, omitArray);

    const tags = map(tagObj, (item) => {
        return {
            type: item.wording,
            value: majorWording[item.keyName]
                ? majorWording[item.keyName][item.value]
                : item.value,
        };
    });

    return {
        id: -1,
        tags: tags,
        index: -1,
        confirm: false,
        ...specialSetting,
    };
}

export default transFormData;
