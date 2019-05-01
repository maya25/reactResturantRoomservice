import createAction from './createAction';

export const getMeals = createAction('get_meals');
export const getMealsError = createAction('get_meals_error');
export const receiveMeals = createAction('receive_meals');
export const requestTableBooking = createAction('request_table_booking');
export const requestTableBookingError = createAction('request_table_booking_error');
export const confirmTableBooking = createAction('confirm_table_booking');
export const resetStatus = createAction('reset_table_status');
