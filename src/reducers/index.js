import { combineReducers } from 'redux';

import room from './room';
import servicesRequests from './servicesRequests';
import restaurant from './restaurant';
import voucher from './voucher';

export default combineReducers({
    room,
    servicesRequests,
    restaurant,
    voucher,
});
