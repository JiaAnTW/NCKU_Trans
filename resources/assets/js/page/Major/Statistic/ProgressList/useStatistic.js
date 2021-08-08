import { useMajor } from '@/utils/index';

export function useAverage() {
    const majorData = useMajor();
    if (majorData.length === 0) return null;
    let size = majorData.length;
    return (
        majorData.reduce((init, current) => {
            if (current.isPass && current.isPass === 'false') {
                size--;
                return init;
            }
            return init + current.score;
        }, 0) / size
    );
}

export function useMin() {
    const majorData = useMajor();
    if (majorData.length === 0) return null;
    return majorData.reduce((init, current) => {
        if (current.isPass && current.isPass === 'false') return init;
        return current.score < init ? current.score : init;
    }, 100);
}
