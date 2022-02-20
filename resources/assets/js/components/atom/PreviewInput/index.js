import React from 'react';
import { PreviewLayout, TagIcon } from './style';
import DataMapping from '~/utils/redux/components/modal/dataMapping';
import Label from '../Label';
import { useSelector } from 'react-redux';
import result from 'lodash/result';
import { color } from '~/theme/global';

function PreviewInput({ keyName, placeHolder, formType }) {
    const form = useSelector((state) => state.post.form);
    const targetForm = form[formType];
    const { keysTable } = DataMapping.transObjToKeysTable(
        targetForm,
        DataMapping.action.getInitStudy
    );
    const obj = result(targetForm, keysTable[keyName][0], {}); //already handle exception
    const data = !obj.value
        ? { value: placeHolder, color: color.red }
        : { value: obj.value };
    return (
        <PreviewLayout>
            <TagIcon />
            <Label {...data} align="left" size="18px" />
        </PreviewLayout>
    );
}

export default PreviewInput;
