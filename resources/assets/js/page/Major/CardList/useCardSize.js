import { useState, useEffect } from 'react';
import { useMedia, useWindowWidth } from '~/utils';
import {
    CARD_WIDTH_PC,
    CARD_HEIGHT_PC,
    CARD_HEIGHT_MOBILE,
} from '~/components/TransCard/style';

const CARD_MARGIN = 10;

export default function useCardSize() {
    const [width, setWidth] = useState(CARD_WIDTH_PC + CARD_MARGIN);
    const [height, setHeight] = useState(CARD_HEIGHT_PC + CARD_MARGIN);
    const device = useMedia();
    const windowWidth = useWindowWidth();

    useEffect(() => {
        if (device === 'mobile') {
            setWidth(windowWidth);
            setHeight(CARD_HEIGHT_MOBILE);
        } else {
            setWidth(CARD_WIDTH_PC + CARD_MARGIN);
            setHeight(CARD_HEIGHT_PC + CARD_MARGIN);
        }
    }, [device, windowWidth]);

    return { cardWidth: width, cardHeight: height };
}
