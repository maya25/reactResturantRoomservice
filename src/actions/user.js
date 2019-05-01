import createAction from './createAction';

export const getUser = createAction('get_user');
export const receiveUser = createAction('receive_user');
export const receiveUserError = createAction('receive_user_error');
