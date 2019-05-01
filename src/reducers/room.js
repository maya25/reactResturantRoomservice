import { getRoom, receiveRoom, getRoomError } from '../actions/room';

export const initialState = {
    data: {},
    state: {
        pending: false,
        error: '',
    },
};

export default function (state = initialState, action) {
    if (action.type === getRoom.type) {
        return {
            ...state,
            state: {
                pending: true,
                error: '',
            },
        }
    }

    if (action.type === receiveRoom.type) {
        return {
            ...state,
            data: action.room,
            state: {
                pending: false,
                error: '',
            },
        }
    }

    if (action.type === getRoomError.type) {
        return {
            ...state,
            state: {
                pending: false,
                error: action.error || 'Sorry, we couldn\'t get the room details',
            },
        }
    }

    return state;
}
