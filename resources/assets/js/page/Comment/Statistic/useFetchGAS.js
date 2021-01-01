import { useState, useEffect } from 'react';

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

function useFetchGAS(major, year) {
    const [passRate, setPassRate] = useState(undefined);

    useEffect(() => {
        setPassRate(undefined);
        getStatisticData(major, year).then((data) => setPassRate(data));
    }, [major, year]);

    return passRate;
}

export default useFetchGAS;
