import React, { useCallback } from 'react';
import { CardButton, CardButtonContainer } from './style';

function SearchCard(props) {
    const { data, setPendingReplace } = props;
    const handleOnClick = useCallback(
        (e) => {
            e.preventDefault();
            setPendingReplace(e.target.value);
        },
        [setPendingReplace]
    );
    return (
        <CardButtonContainer>
            {data.map((obj, index) => {
                return (
                    <CardButton
                        key={index}
                        value={obj.name}
                        type="button"
                        onClick={handleOnClick}
                    />
                );
            })}
        </CardButtonContainer>
    );
}

export default SearchCard;
