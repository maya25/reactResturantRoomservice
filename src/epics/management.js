import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ofType } from 'redux-observable';
import {
  deleteServicesRequest,
  getServicesRequests,
  modifyServicesRequest,
  modifyServicesRequestError,
  receiveServicesRequests,
  getServicesRequestsError,
} from '../actions/management';

export function getServiceRequestsEpic(action$, $state, { api }) {
  return action$.pipe(
    ofType(getServicesRequests.type),
    switchMap(({ hotelId }) => (
        api.getServicesRequests({ params: { hotelId } }).pipe(
        map(({response}) => receiveServicesRequests({ requests: response.data })),
        catchError(() => of(getServicesRequestsError()))
      )
    )),
  );
}

export function modifyServicesRequestEpic(action$, $state, { api }) {
  return action$.pipe(
    ofType(modifyServicesRequest.type),
    switchMap(({ hotelId, serviceType, room_id, data }) => (
      api.modifyServicesRequest({ params: { serviceType }, data: { room_id, ...data}  }).pipe(
          map(() => deleteServicesRequest({ serviceType, hotelId, data: { room_id, ...data} })),
          catchError(() => of(modifyServicesRequestError()))
        )
      ),
    )
  );
}

export function deleteServicesRequestEpic(action$, $state, { api }) {
  return action$.pipe(
    ofType(deleteServicesRequest.type),
    switchMap(({ serviceType, hotelId, data }) => (
        api.deleteServicesRequest({ params: { serviceType }, data }).pipe(
          map(() => getServicesRequests({ hotelId })),
          catchError(() => of(modifyServicesRequestError()))
        )
      ),
    )
  );
}
