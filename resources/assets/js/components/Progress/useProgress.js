import { useState, useEffect, useRef } from 'react';

function useProgress(value) {
    const [rate, setRate] = useState(100);
    const mounted = useRef(false);
    const tm = useRef(undefined);
    const tmTwo = useRef(undefined);

    useEffect(() => {
        if (!mounted.current) {
            setRate(value);
            mounted.current = true;
        } else {
            if (rate > value) {
                if (tm.current) clearTimeout(tm.current);
                tmTwo.current = setTimeout(() => {
                    setRate(rate - 1);
                }, 20);
            } else if (rate < value) {
                if (tmTwo.current) clearTimeout(tmTwo.current);
                tm.current = setTimeout(() => {
                    if (rate + 1 > value) {
                        setRate(value);
                    } else {
                        setRate(rate + 1);
                    }
                }, 20);
            }
        }
    }, [value, rate]);

    return rate;
}

export default useProgress;
