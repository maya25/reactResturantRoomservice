import { ajax } from 'rxjs/ajax';
import { BASE_URL } from './consts';

const apiConfig = {
    getUser: {
        method: 'GET',
        url: ({userId}) => `/user/${userId}`,
    },
    getRoom: {
        method: 'GET',
        url: ({ roomId }) => `/hotel/rooms/${roomId}`,
    },
    getAllServiceRequests: {
        method: 'GET',
        url: ({ hotelId }) => `hotel/rooms/services/${hotelId}`,
    },
    sendServicesRequest: {
        method: 'POST',
        url: ({serviceType}) => `/hotel/rooms/services/${serviceType}`,
    },
    getServicesRequests: {
        method: 'GET',
        url: ({ hotelId }) => `/hotel/rooms/services/${hotelId}`,
    },
    modifyServicesRequest: {
        method: 'PUT',
        url: ({serviceType}) => `/hotel/rooms/services/${serviceType}`,
    },
    deleteServicesRequest: {
        method: 'DELETE',
        url: ({serviceType}) => `/hotel/rooms/services/${serviceType}`,
    },
    requestTableBooking: {
        method: 'POST',
        url: () => '/hotel/tables/orders',
    },
    getMeals: {
        method: 'GET',
        url: ({hotelId}) => `/hotel/meals/${hotelId}`,
    },
    selectVoucher: {
        method: 'POST',
        url: () => '/hotel/tables/orders/vouchers',
    }
};

const api = {};

const creator = ({ url, method }) => ({ params, options, data } = {}) => {
    const urlWithParams = url(params);
    return ajax({
        ...options,
        url: BASE_URL + urlWithParams,
        method,
        headers: {
            'Content-Type': 'Application/json',
        },
        body: JSON.stringify(data),
    })
};

Object.keys(apiConfig).forEach(reqName => api[reqName] = creator(apiConfig[reqName]));

export default api;
