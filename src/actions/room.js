import createAction from './createAction';

export const getRoom = createAction('get_room');
export const getRoomError = createAction('get_room_error');
export const receiveRoom = createAction('receive_room');
export const sendServicesRequest = createAction('send_services_request');
export const sendServicesRequestSuccess = createAction('send_services_request_success');
export const sendServicesRequestError = createAction('send_services_request_error');
