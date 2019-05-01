import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ofType } from 'redux-observable';
import { getUser, receiveUser, receiveUserError} from '../actions/user';

export function getUserEpic(action$, $state, { api }) {
  return action$.pipe(
    ofType(getUser.type),
    switchMap(({ userId }) => (
        api.getUser({ params: { userId } }).pipe(
        map(({response}) => receiveUser({ user: response })),
        catchError(() => of(receiveUserError()))
      )
    )),
  );
}
