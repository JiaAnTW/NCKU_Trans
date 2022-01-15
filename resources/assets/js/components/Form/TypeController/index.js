import React from 'react';
import { useCallback } from 'react';
import { typeList } from '../typeList';
import { TypeButtonList, SwitchButton, BoxList, SmallYellowBox } from './style';
function TypeController({ setIndex, selectedIndex }) {
    const setIndexState = useCallback((index) => setIndex(index));
    return (
        <>
            <BoxList>
                {typeList.map((item) => {
                    return (
                        <SmallYellowBox
                            selected={item.index === selectedIndex}
                            key={item.name}
                        />
                    );
                })}
            </BoxList>
            <TypeButtonList>
                {typeList.map((item) => {
                    return (
                        <SwitchButton
                            onClick={() => setIndexState(item.index)}
                            selected={item.index === selectedIndex}
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
