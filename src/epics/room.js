import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ofType } from 'redux-observable';
import {
  getRoom,
  receiveRoom,
  getRoomError,
  sendServicesRequest,
  sendServicesRequestError,
  sendServicesRequestSuccess
} from '../actions/room';

export function getRoomEpic(action$, $state, { api }) {
  return action$.pipe(
    ofType(getRoom.type),
    switchMap(({ roomId, hotelId }) => (
        api.getRoom({ params: { hotelId, roomId } }).pipe(
        map(({response}) => receiveRoom({ room: response.data })),
        catchError(() => of(getRoomError()))
      )
    )),
  );
}

export function sendServicesRequestEpic(action$, $state, { api }) {
  return action$.pipe(
    ofType(sendServicesRequest.type),
    switchMap(({ serviceType, roomId, data }) => (
      api.sendServicesRequest({ params: { serviceType }, data: { roomId, ...data}  }).pipe(
          map(() => sendServicesRequestSuccess()),
          catchError(() => of(sendServicesRequestError()))
        )
      ),
    )
  );
}
