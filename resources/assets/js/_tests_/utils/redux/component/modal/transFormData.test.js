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
        id: -1,
        tags: [
            {
                type: '申請年度',
                value: '110',
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
        ],
        index: -1,
        confirm: false,
        type: '雙主修',
        content: 'test data',
        subtitle: '材料系',
        title: '工資系',
    });
});
