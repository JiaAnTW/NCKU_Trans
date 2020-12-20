import { useSelector } from 'react-redux';

function useRequest() {
    const requestNum = useSelector((state) => state.request);
    return requestNum === 0;
}

export default useRequest;
