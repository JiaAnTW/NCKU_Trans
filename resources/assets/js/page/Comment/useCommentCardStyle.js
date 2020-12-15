import { useState, useEffect } from 'react';
import { useWindowWidth } from '../../utils/index';

const useCommentCardStyle = () => {
    const [fontSize, setFontSize] = useState('2.7rem');
    const [wordsNumber, setWordsNumber] = useState(35);
    const [cardWidth, setCardWidth] = useState('20rem');
    const [cardHeight, setCardHeight] = useState('20rem');
    const [cardTextHeight, setCardTextHeight] = useState('6.06rem');
    const [btnHeight, setBtnHeight] = useState('15rem');

    const windowWidth = useWindowWidth();

    useEffect(() => {
        if (windowWidth >= 870) {
            setFontSize('2.7rem');
            setWordsNumber(35);
            setCardWidth('20rem');
            setCardHeight('20rem');
            setCardTextHeight('6.06rem');
            setBtnHeight('15rem');
        } else {
            setFontSize('2.2rem');
            setWordsNumber(20);
            setCardWidth('100vw');
            setCardHeight('13.5rem');
            setCardTextHeight('2.06rem');
            setBtnHeight('11rem');
        }
    }, [windowWidth]);

    return { fontSize, wordsNumber, cardWidth, cardHeight, cardTextHeight };
};

export default useCommentCardStyle;
