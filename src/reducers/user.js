import { getUser, receiveUser, receiveUserError } from '../actions/user';

export const initialState = {
    data: {},
    state: {
        pending: false,
        error: '',
    },
};

export default function (state = initialState, action) {
    if (action.type === getUser.type) {
        return {
            ...state,
            state: {
                pending: true,
                error: '',
            },
        }
    }

    if (action.type === receiveUser.type) {
        return {
            ...state,
            data: action.user,
            state: {
                pending: false,
                error: '',
            },
        }
    }

    if (action.type === receiveUserError.type) {
        return {
            ...state,
            state: {
                pending: false,
                error: 'Sorry, we couldn\'t get the user details',
            },
        }
    }

    return state;
}
