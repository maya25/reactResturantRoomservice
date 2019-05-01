import * as roomEpics from './room';
import * as userEpics from './user';
import * as managementEpics from './management';
import * as restaurant from './restaurant';
import * as vouchers from './vouchers';

export default [
  ...Object.values(roomEpics),
  ...Object.values(userEpics),
  ...Object.values(managementEpics),
  ...Object.values(restaurant),
  ...Object.values(vouchers),
]