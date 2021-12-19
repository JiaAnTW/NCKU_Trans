import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

export default function useSideBarClick({ device, onClose }) {
    const history = useHistory();

    const handleClick = useCallback(
        (url) => {
            // 問卷
            if (url[0] !== '/') {
                window.open(url, '_blank').focus();
                return;
            }

            history.push(url);
            if (device !== 'PC') onClose();
        },
        [history, device, onClose]
    );

    const handleToggle = useCallback(
        () => (event) => {
            if (
                event.type === 'keydown' &&
                (event.key === 'Tab' || event.key === 'Shift')
            ) {
                return;
            }

            onClose();
        },
        [onClose]
    );

    return { handleClick, handleToggle };
}
