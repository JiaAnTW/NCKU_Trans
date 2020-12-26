import React, { useEffect } from 'react';

import { useMajor } from './utils/index';

function TestPage() {
    const data = useMajor();

    useEffect(() => {
        console.log(data);
    }, [data]);

    return <div> hello </div>;
}

export default TestPage;
