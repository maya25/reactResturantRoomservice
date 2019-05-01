import createAction from './createAction';

export const selectVoucher = createAction('select_voucher');
export const selectVoucherError = createAction('select_voucher_error');
export const receiveVoucher = createAction('receive_voucher');
export const enableVoucherSelection = createAction('enable_voucher_selection');
