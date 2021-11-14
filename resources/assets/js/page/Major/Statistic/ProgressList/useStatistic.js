import { useSelector } from 'react-redux';
import { majorDisplaySelector } from '~/model/selector/major';

export function useAverage() {
    const majorData = useSelector(majorDisplaySelector);
    const passData = majorData.filter((data) => data.isPass !== 'false');

    if (passData.length === 0) return null;
    let size = passData.length;
    return passData.reduce((init, current) => init + current.score, 0) / size;
}

export function useMin() {
    const majorData = useSelector(majorDisplaySelector);
    const passData = majorData.filter((data) => data.isPass !== 'false');

    if (passData.length === 0) return null;
    return passData.reduce((init, current) => {
        return current.score < init ? current.score : init;
    }, 100);
}
