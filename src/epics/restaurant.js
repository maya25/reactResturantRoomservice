import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ofType } from 'redux-observable';

import {
  confirmTableBooking,
  getMeals,
  getMealsError,
  receiveMeals,
  requestTableBooking,
  requestTableBookingError
} from '../actions/restaurant';
import {enableVoucherSelection} from "../actions/vouchers";

export function getMealsEpic(action$, $state, { api }) {
  return action$.pipe(
    ofType(getMeals.type),
    switchMap(({ hotelId }) => (
      api.getMeals({ params: {hotelId} }).pipe(
        map(({response}) => receiveMeals({ meals: response.data })),
        catchError((error) => of(getMealsError({ error })))
      )
    )),
  );
}

export function bookTableEpic(action$, $state, { api }) {
  return action$.pipe(
    ofType(requestTableBooking.type),
    switchMap(({ data }) => (
      api.requestTableBooking({ data }).pipe(
        map(({response}) => response.data.order_id
          ? confirmTableBooking()
          : enableVoucherSelection({ mealData: data })),
        catchError(({ response }) => of(requestTableBookingError({ error: response.err })))
      )
    )),
  );
}
