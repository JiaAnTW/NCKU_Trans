import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SET_MODE } from '~/model/action/post';
import { typeList } from '../typeList';
import { TypeButtonList, SwitchButton, BoxList, SmallYellowBox } from './style';
function TypeController() {
    const mode = useSelector((state) => state.post.mode);
    const dispatch = useDispatch();

    return (
        <>
            <BoxList>
                {typeList.map((item, index) => {
                    return (
                        <SmallYellowBox
                            selected={index === mode}
                            key={item.name}
                        />
                    );
                })}
            </BoxList>
            <TypeButtonList>
                {typeList.map((item, index) => {
                    return (
                        <SwitchButton
                            onClick={() =>
                                dispatch({ type: SET_MODE, payload: index })
                            }
                            selected={index === mode}
                            key={item.name}
                        >
                            {item.buttonText}
                        </SwitchButton>
                    );
                })}
            </TypeButtonList>
        </>
    );
}

export default TypeController;
