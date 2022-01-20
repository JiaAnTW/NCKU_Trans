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
        if (key === 'ignore') continue; //ignore some value
        const dataObjKey = settingKeyName[key];
        specialSetting[key] = dataObj[dataObjKey].value;
        omitArray.push(dataObjKey);
    }
    const tagObj = omit(dataObj, omitArray.concat(settingKeyName.ignore));
    let tags = map(tagObj, (item) => {
        return {
            type: item.wording,
            value: majorWording[item.keyName]
                ? majorWording[item.keyName][item.value]
                : item.value,
        };
    });
    map(dataObj.other, (item) => {
        tags = [
            ...tags,
            {
                type: item.keyValue.value,
                value: item.value.value,
            },
        ];
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
