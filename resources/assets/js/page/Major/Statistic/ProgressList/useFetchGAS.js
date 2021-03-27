import { useState, useEffect, useRef, useReducer } from 'react';

const getStatisticData = (major, year) =>
    new Promise((resolve) => {
        const data = {
            major: major,
            year: year,
        };
        let formData = Object.keys(data)
            .map(function (keyName) {
                return (
                    encodeURIComponent(keyName) +
                    '=' +
                    encodeURIComponent(data[keyName])
                );
            })
            .join('&');
        fetch(
            'https://script.google.com/macros/s/AKfycbx7m5jeetEwjtZ8vbicrH8VfQ7tBp_hGyTWX7d73a5NQANmTvU/exec',
            {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded',
                },
            }
        )
            .then((res) => res.json())
            .then((data) => {
                resolve(data.passRate);
                //return infor.passRate;
            });
    });

function reducer(state, action) {
    switch (action.type) {
        case 'ADD':
            return state + 1;
        case 'SUB':
            return state - 1;
        default:
            return state;
    }
}

function useFetchGAS(major, year) {
    const [passRate, setPassRate] = useState(undefined);
    const [request, requestDispatch] = useReducer(reducer, 0);

    const mounted = useRef(false);

    useEffect(() => {
        // 避免memory leak
        mounted.current = true;
        return () => {
            mounted.current = false;
        };
    }, [mounted]);

    useEffect(() => {
        if (mounted.current) {
            requestDispatch({ type: 'ADD' });
            getStatisticData(major, year).then((data) => {
                if (mounted.current) {
                    requestDispatch({ type: 'SUB' });
                    setPassRate(data);
                }
            });
        }
    }, [major, year, mounted]);

    return { passRate, request };
}

export default useFetchGAS;
