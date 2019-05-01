import createAction from './createAction';

export const getServicesRequests = createAction('get_services_requests');
export const receiveServicesRequests = createAction('receive_services_requests');
export const getServicesRequestsError = createAction('get_services_request_error');
export const modifyServicesRequest = createAction('modify_services_request');
export const modifyServicesRequestError = createAction('modify_services_request_error');
export const deleteServicesRequest = createAction('delete_services_request');