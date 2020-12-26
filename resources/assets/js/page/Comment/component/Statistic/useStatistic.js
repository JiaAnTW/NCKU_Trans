import { useMajor } from '../../../../utils/index';

export function useAverage() {
    const majorData = useMajor();
    if (majorData.length === 0) return 'null';
    return (
        majorData.reduce((init, current) => init + current.score, 0) /
        majorData.length
    );
}

export function useMin() {
    const majorData = useMajor();
    if (majorData.length === 0) return 'null';
    return majorData.reduce(
        (init, current) => (current.score < init ? current.score : init),
        100
    );
}
