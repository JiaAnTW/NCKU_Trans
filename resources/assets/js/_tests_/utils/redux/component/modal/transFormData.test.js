import transFormData from '~/utils/redux/components/modal/transFormData';
import transFormDataInput from './transFormData.input.json';

test('[Post] Should transForm data correctly when preivew new comment', () => {
    expect(
        transFormData(transFormDataInput, {
            title: 'in_maj',
            subtitle: 'out_maj',
            type: 'category',
            content: 'comment',
        })
    ).toEqual({
        confirm: false,
        content: 'test data',
        id: -1,
        index: -1,
        subtitle: '材料系',
        tags: [
            {
                type: '申請年度',
                value: 110,
            },
            {
                type: '排名上',
                value: '5',
            },
            {
                type: '排名下',
                value: '6',
            },
            {
                type: '學年分數',
                value: '78',
            },
            {
                type: '申請結果',
                value: '未通過',
            },
            {
                type: undefined,
                value: undefined,
            },
        ],
        title: '工資系',
        type: '雙主修',
    });
});
