import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MobileFliter from '../components/mobileFliter';
const majorfliter = [
    {
        id: 0,
        now: -1,
        name: '依學院篩選',
        type: 'deapartment',
        option: [
            ['全部學院', -1],
            ['工學院', 1],
            ['文學院', 2],
        ],
    },
    {
        id: 1,
        now: -1,
        name: ['deapartment', '工學院'],
        type: 'in_maj',
        option: [
            ['全部學系', -1],
            ['系統系', -1],
            ['工科系', -1],
        ],
    },
    {
        id: 2,
        now: -1,
        name: ['deapartment', '文學院'],
        type: 'in_maj',
        option: [
            ['全部學系', -1],
            ['外文系', -1],
            ['台文系', -1],
        ],
    },
];

const type = '依學院/系';

const JSXMobileFilter = (
    <MobileFliter
        controllArray={[0, -1, -1]}
        mobile={'mobile'}
        fliter={() => {}}
        type={type}
        value={majorfliter}
        style={{
            position: 'absolute',
            top: '0px',
            left: '6%',
            width: '59%',
            backgroundColor: 'rgb(229,68,109)',
            color: 'white',
            lineHeight: '31px',
            fontSize: '12px',
            outline: 'none',
        }}
    />
);

describe('MobileFliter', () => {
    test('確認所有選單是否有被創造並隱藏子選單', () => {
        const { getByText, getAllByText } = render(JSXMobileFilter);
        const startMenu = getByText(`${type}:`);
        expect(startMenu.textContent).toBe(`${type}: 全部學院全部學系全部學系`);

        const subMenuArr = getAllByText('全部學系');
        expect(subMenuArr.length).toBe(majorfliter.length - 1);

        const subMenuStyleArr = subMenuArr.map(
            (item) => item.parentNode.style.display
        );
        const expectRes = new Array(majorfliter.length - 1);
        expect(subMenuStyleArr).toEqual(expectRes.fill('none'));
    });

    test('點擊第一個選單子項目後出現對應子選單', () => {
        const { getByText, getAllByText } = render(JSXMobileFilter);
        const startMenuBtn = getByText(`全部學院`);
        fireEvent.click(startMenuBtn);

        const nestItemForSecondMenu = getByText(majorfliter[0].option[1][0]);
        fireEvent.click(nestItemForSecondMenu);
        expect(startMenuBtn.textContent).toBe(majorfliter[0].option[1][0]);

        const secondIndex = majorfliter[0].option[1][1];
        const subMenuArr = getAllByText('全部學系');
        expect(subMenuArr[secondIndex - 1].parentNode.style.display).toBe(
            'block'
        );
    });

    test('子選單能正常運作', () => {
        const { getByText, getAllByText } = render(JSXMobileFilter);
        const startMenuBtn = getByText(`全部學院`);
        fireEvent.click(startMenuBtn);

        const nestItemForSecondMenu = getByText(majorfliter[0].option[1][0]);
        fireEvent.click(nestItemForSecondMenu);
        expect(startMenuBtn.textContent).toBe(majorfliter[0].option[1][0]);

        const secondIndex = majorfliter[0].option[1][1];
        const subMenuArr = getAllByText('全部學系');
        expect(subMenuArr[secondIndex - 1].parentNode.style.display).toBe(
            'block'
        );

        fireEvent.click(subMenuArr[secondIndex - 1]);
        const nestItemOfSecondMenu = getByText(
            majorfliter[secondIndex].option[1][0]
        );
        fireEvent.click(nestItemOfSecondMenu);
        expect(subMenuArr[secondIndex - 1].parentNode.style.display).toBe(
            'block'
        );
        expect(subMenuArr[secondIndex - 1].textContent).toBe(
            majorfliter[secondIndex].option[1][0]
        );
    });

    test('在子選單顯示的情況下，點選第一個選單中的其他有子選單的子項目', () => {
        const { getByText, getAllByText } = render(JSXMobileFilter);
        const startMenuBtn = getByText(`全部學院`);
        fireEvent.click(startMenuBtn);

        const navForSecondMenu = getByText(majorfliter[0].option[1][0]);
        fireEvent.click(navForSecondMenu);
        expect(startMenuBtn.textContent).toBe(majorfliter[0].option[1][0]);

        const subMenuArr = getAllByText('全部學系');
        expect(subMenuArr[0].parentNode.style.display).toBe('block');

        fireEvent.click(startMenuBtn);
        const navForThirdMenu = getByText(majorfliter[0].option[2][0]);
        fireEvent.click(navForThirdMenu);
        expect(startMenuBtn.textContent).toBe(majorfliter[0].option[2][0]);
        expect(subMenuArr[0].parentNode.style.display).toBe('none');
        expect(subMenuArr[1].parentNode.style.display).toBe('block');
    });

    test('在子選單顯示的情況下，點選第一個選單中沒有子選單的子項目', () => {
        const { getByText, getAllByText } = render(JSXMobileFilter);
        const startMenuBtn = getByText(`全部學院`);
        fireEvent.click(startMenuBtn);

        const navForSecondMenu = getByText(majorfliter[0].option[1][0]);
        fireEvent.click(navForSecondMenu);
        expect(startMenuBtn.textContent).toBe(majorfliter[0].option[1][0]);

        const subMenuArr = getAllByText('全部學系');
        expect(subMenuArr[0].parentNode.style.display).toBe('block');

        fireEvent.click(startMenuBtn);
        const navForThirdMenu = getByText(majorfliter[0].option[2][0]);
        fireEvent.click(navForThirdMenu);
        expect(startMenuBtn.textContent).toBe(majorfliter[0].option[2][0]);
        expect(subMenuArr[0].parentNode.style.display).toBe('none');
        expect(subMenuArr[1].parentNode.style.display).toBe('block');

        fireEvent.click(startMenuBtn);
        const navForNoMenu = getByText(majorfliter[0].option[0][0]);
        fireEvent.click(navForNoMenu);
        expect(startMenuBtn.textContent).toBe(majorfliter[0].option[0][0]);

        const subMenuStyleArr = subMenuArr.map(
            (item) => item.parentNode.style.display
        );
        const expectRes = new Array(majorfliter.length - 1);
        expect(subMenuStyleArr).toEqual(expectRes.fill('none'));
    });
});
