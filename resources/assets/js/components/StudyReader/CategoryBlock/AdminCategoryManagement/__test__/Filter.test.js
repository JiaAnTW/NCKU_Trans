import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import Provider from '../Context/Provider';
import AdminEditCategory from '../index';
import { store as initStore } from './store';
import * as ReactRedux from 'react-redux';
import * as SudyModdleware from '~/model/middleware/study';
import { CLOSE_MODAL } from '~/model/action/modal';

const id = 'study-id';
let store;

jest.spyOn(ReactRedux, 'useSelector').mockImplementation((selector) =>
    selector(store)
);

const useDispatchMock = jest.fn();
jest.spyOn(ReactRedux, 'useDispatch').mockImplementation(() => useDispatchMock);

const updateStudyMock = jest.fn();
jest.spyOn(SudyModdleware, 'updateStudy').mockImplementation(updateStudyMock);

const createStudyTypeOrStatMock = jest.fn();
jest.spyOn(SudyModdleware, 'createStudyTypeOrStat').mockImplementation(
    createStudyTypeOrStatMock
);
const updateStudyTypeOrStatMock = jest.fn();
jest.spyOn(SudyModdleware, 'updateStudyTypeOrStat').mockImplementation(
    updateStudyTypeOrStatMock
);
const deleteStudyTypeOrStatMock = jest.fn();
jest.spyOn(SudyModdleware, 'deleteStudyTypeOrStat').mockImplementation(
    deleteStudyTypeOrStatMock
);

beforeEach(() => {
    useDispatchMock.mockClear();
    store = { ...initStore };
    render(
        <Provider value={{ id, data: store.study.filter.category }}>
            <AdminEditCategory />
        </Provider>
    );
    fireEvent.mouseDown(screen.getByRole('button'));
});

afterEach(() => {
    jest.clearAllMocks();
});

describe('Study Category Management Filter', () => {
    it('should open selects list', () => {
        expect(screen.queryByRole('listbox')).toBeTruthy();
        expect(screen.queryAllByRole('checkbox').length).toBe(
            initStore.study.filter.category.length
        );
    });

    it('should uncheck all checkboxes', () => {
        for (const checkbox of screen.getAllByRole('checkbox')) {
            fireEvent.click(checkbox);
        }
        expect(
            screen.queryAllByRole('checkbox', { checked: true }).length
        ).toBe(0);
    });

    it('should clear all changes', () => {
        for (const checkbox of screen.getAllByRole('checkbox')) {
            fireEvent.click(checkbox);
        }
        fireEvent.keyDown(screen.getByRole('button'), { key: 'Escape' });
        fireEvent.mouseDown(screen.getByRole('button'));
        expect(screen.getAllByRole('checkbox', { checked: true }).length).toBe(
            initStore.study.filter.category.length
        );
    });

    it('should close modal and dispatch update-study event', () => {
        fireEvent.click(screen.getAllByRole('checkbox')[0]);
        fireEvent.click(screen.getByText(/送出/));
        expect(updateStudyMock).toBeCalledWith({
            ...initStore.modal.context,
            category: [initStore.study.filter.category[1]],
        });
        expect(
            useDispatchMock.mock.calls.find(
                (args) => args[0] && args[0].type === CLOSE_MODAL
            )
        ).toBeTruthy();
    });

    it('should go to manage page', () => {
        fireEvent.click(screen.getByText(/管理類別設定/));
        expect(screen.queryByText(/取消管理/)).toBeTruthy();
        expect(screen.queryByText(/送出/)).not.toBeTruthy();
        expect(screen.queryByText(/新增項目/)).toBeTruthy();
        for (const category of initStore.study.filter.category) {
            expect(screen.queryByText(category.name)).toBeTruthy();
        }
    });

    it('should return to normal page', () => {
        fireEvent.click(screen.getByText(/管理類別設定/));
        fireEvent.click(screen.getByText(/取消管理/));
        expect(screen.queryByText(/管理類別設定/)).toBeTruthy();
        expect(screen.queryByText(/送出/)).toBeTruthy();
    });

    it('should go to modify page and show original name', () => {
        fireEvent.click(screen.getByText(/管理類別設定/));
        fireEvent.click(screen.queryAllByRole('button')[0]);
        expect(screen.queryByRole('textbox').value).toBe(
            initStore.study.filter.category[0].name
        );
    });

    it('should return to manage page', () => {
        fireEvent.click(screen.getByText(/管理類別設定/));
        fireEvent.click(screen.queryAllByRole('button')[0]);
        fireEvent.click(screen.queryByRole('button', { name: '返回' }));
        expect(screen.queryAllByRole('button').length).toBe(
            initStore.study.filter.category.length + 1
        );
    });
});

describe('Create, Update, Delete Category', () => {
    beforeEach(() => {
        fireEvent.click(screen.getByText(/管理類別設定/));
    });

    it('should create new category', () => {
        fireEvent.click(screen.getByText(/新增項目/));
        fireEvent.change(screen.queryByRole('textbox'), {
            target: { value: 'new-category' },
        });
        expect(screen.queryByRole('textbox').value).toBe('new-category');

        fireEvent.click(screen.queryByRole('button', { name: '送出' }));
        expect(createStudyTypeOrStatMock).toBeCalledWith({
            type: 'category',
            name: 'new-category',
        });
    });

    it('should update category', () => {
        fireEvent.click(screen.getAllByRole('button')[0]);
        fireEvent.change(screen.queryByRole('textbox'), {
            target: { value: 'update-category' },
        });
        fireEvent.click(screen.queryByRole('button', { name: '送出' }));

        expect(updateStudyTypeOrStatMock).toBeCalledWith({
            id: initStore.study.filter.category[0].id,
            type: 'category',
            name: 'update-category',
        });
    });

    it('should delete category', () => {
        fireEvent.click(screen.getAllByRole('button')[0]);
        fireEvent.click(screen.queryByRole('button', { name: '刪除' }));

        expect(deleteStudyTypeOrStatMock).toBeCalledWith({
            id: initStore.study.filter.category[0].id,
            type: 'category',
        });
    });
});
