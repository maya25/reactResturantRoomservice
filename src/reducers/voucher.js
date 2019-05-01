import {
    enableVoucherSelection,
    receiveVoucher,
    selectVoucher,
    selectVoucherError
} from '../actions/vouchers';

export const initialState = {
    data: {},
    mealData: {},
    state: {
        pending: false,
        error: '',
    },
};

export default function (state = initialState, action) {
    if (action.type === selectVoucher.type) {
        return {
            ...state,
            state: {
                pending: true,
                error: '',
            },
        }
    }

    if (action.type === selectVoucherError.type) {
        return {
            ...state,
            state: {
                pending: false,
                error: action.error,
            },
        }
    }

    if (action.type === receiveVoucher.type) {
        return {
            ...state,
            data: action.voucher,
            state: {
                pending: false,
                error: '',
            },
        }
    }

    if (action.type === enableVoucherSelection.type) {
        return {
            ...state,
            mealData: action.mealData,
        }
    }

    return state;
}
