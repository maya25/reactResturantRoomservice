import {
    confirmTableBooking,
    getMeals,
    getMealsError,
    receiveMeals,
    requestTableBooking,
    requestTableBookingError, resetStatus
} from '../actions/restaurant';
import {enableVoucherSelection} from "../actions/vouchers";

export const initialState = {
    pending: false,
    status: 'na',
    meals: {
        data: [],
        pending: false,
        error: '',
    },
};

export default function (state = initialState, action) {
    if (action.type === requestTableBooking.type) {
        return {
            ...state,
            pending: true,
        }
    }

    if (action.type === requestTableBookingError.type) {
        return {
            ...state,
            pending: true,
            error: action.error,
        }
    }

    if (action.type === confirmTableBooking.type) {
        return {
            ...state,
            pending: false,
            status: 'confirmed',
        }
    }

    if (action.type === resetStatus.type) {
        return {
            ...state,
            pending: false,
            status: 'na',
        }
    }

    if (action.type === enableVoucherSelection.type) {
        return {
            ...state,
            mealData: action.mealData,
            pending: false,
            status: 'declined',
        }
    }

    if (action.type === receiveMeals.type) {
        return {
            ...state,
            meals: {
                ...state.meals,
                data: action.meals,
                pending: false,
                error: '',
            },
        }
    }

    if (action.type === getMeals.type) {
        return {
            ...state,
            meals: {
                ...state.meals,
                pending: true,
                error: '',
            },
        }
    }

    if (action.type === getMealsError.type) {
        return {
            ...state,
            meals: {
                ...state.meals,
                pending: false,
                error: action.error,
            },
        }
    }

    return state;
}
