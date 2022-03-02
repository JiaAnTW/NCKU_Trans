import { createSelector } from 'reselect';

const modalSelector = (state) => state.modal;

export const modalIsOpenSelector = createSelector(
    modalSelector,
    (state) => state.isOpen
);

export const modalContextSelector = createSelector(
    modalSelector,
    (state) => state.context
);

export const modalOnBeforeSelector = createSelector(
    modalSelector,
    (state) => state.onBefore
);
export const modalOnNextSelector = createSelector(
    modalSelector,
    (state) => state.onNext
);

export const modalOnConfirmSelector = createSelector(
    modalSelector,
    (state) => state.onConfirm
);
