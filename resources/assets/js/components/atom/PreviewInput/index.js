import React from 'react';
import { PreviewLayout, TagIcon } from './style';
import dataMapping from '~/utils/redux/components/modal/dataMapping';
import Label from '../Label';
import { useSelector } from 'react-redux';
import result from 'lodash/result';

function PreviewInput({ keyName, placeHolder, formType }) {
    const form = useSelector((state) => state.post.form);
    const targetForm = form[formType];
    const { keysTable } = dataMapping.transObjToKeysTable(
        targetForm,
        dataMapping.action.getPreview
    );
    const obj = result(targetForm, keysTable[keyName][0], {}); //already handle exception
    const value = !obj.value ? placeHolder : obj.value;
    return (
        <PreviewLayout>
            <TagIcon />
            <Label value={value} align="left" size="18px" />
        </PreviewLayout>
    );
}

export default PreviewInput;
