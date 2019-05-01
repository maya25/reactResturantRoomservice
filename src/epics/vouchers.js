import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ofType } from 'redux-observable';
import { receiveVoucher, selectVoucher, selectVoucherError } from '../actions/vouchers';

export function selectVoucherEpic(action$, $state, { api }) {
  return action$.pipe(
    ofType(selectVoucher.type),
    switchMap(({data}) => (
        api.selectVoucher({ data }).pipe(
        map(({response}) => receiveVoucher({ voucher: response.data })),
        catchError(error => of(selectVoucherError({ error })))
      )
    )),
  );
}
