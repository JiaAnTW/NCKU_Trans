import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SET_POST_TYPE } from '~/model/action/post';
import { typeList } from '../typeList';
import {
    TypeButtonList,
    SwitchButton,
    BoxList,
    SmallYellowBox,
    Text,
} from './style';

function TypeController() {
    const type = useSelector((state) => state.post.type);
    const dispatch = useDispatch();
    return (
        <>
            <BoxList>
                {typeList.map((item) => {
                    return (
                        <SmallYellowBox
                            selected={type === item.type}
                            key={item.name}
                        />
                    );
                })}
            </BoxList>
            <TypeButtonList>
                {typeList.map((item) => {
                    return (
                        <SwitchButton
                            onClick={() =>
                                dispatch({
                                    type: SET_POST_TYPE,
                                    payload: item.type,
                                })
                            }
                            selected={type === item.type}
                            key={item.name}
                        >
                            <Text>{item.buttonText}</Text>
                        </SwitchButton>
                    );
                })}
            </TypeButtonList>
        </>
    );
}

export default TypeController;
