import { getServicesRequests, receiveServicesRequests, getServicesRequestsError } from '../actions/management';

export const initialState = {
    data: [],
    state: {
        pending: false,
        error: '',
    },
};

export default function (state = initialState, action) {
    if (action.type === getServicesRequests.type) {
        return {
            ...state,
            state: {
                pending: true,
                error: '',
            },
        }
    }

    if (action.type === receiveServicesRequests.type) {
        return {
            ...state,
            data: action.requests,
            state: {
                pending: false,
                error: '',
            },
        }
    }

    if (action.type === getServicesRequestsError.type) {
        return {
            ...state,
            state: {
                pending: false,
                error: action.error || 'Sorry, we couldn\'t get the services requests',
            },
        }
    }

    return state;
}
