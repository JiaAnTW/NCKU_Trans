export default function trans(orignStr, strMap) {
    for (let strName in strMap) {
        const replaceStr = strMap[strName];
        orignStr = orignStr.replaceAll(`:${strName}`, replaceStr);
    }
    return orignStr;
}
