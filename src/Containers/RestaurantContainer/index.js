import React, { useState, useMemo, useEffect } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Tabs from '../../Components/Tabs';
import Modal from '../../Components/Modal';
import MealBooking from '../../Components/MealBooking';
import VouchersPage from '../../Components/VouchersPage';
import { initialState as initialRestaurantState } from '../../reducers/restaurant';
import {getMeals, requestTableBooking, resetStatus} from '../../actions/restaurant';
import {BOOKING_STATUSES, ERRORS, HOTEL_ID, ROOM_ID, TRANSLATIONS, USER_ID} from '../../utils/consts';
import {getRoom} from "../../actions/room";

const mapStateToProps = state => ({
    meals: (state.restaurant.meals || initialRestaurantState.meals).data,
    status: (state.restaurant || initialRestaurantState).status,
    error: state.restaurant.error || null,
    voucherMealData: state.restaurant.mealData || null,
});

// TODO: Modal is not displaying, should apply logic
function RestaurantContainer({dispatch, voucherMealData, error, meals, status}) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setIsModalOpen([BOOKING_STATUSES.CONFIRMED, BOOKING_STATUSES.DECLINED].includes(status) || !!error);
    }, [status, error]);

    useEffect(() => {
        dispatch(getRoom({ hotelId: HOTEL_ID, roomId: ROOM_ID }));
        dispatch(getMeals({ hotelId: HOTEL_ID }));
    }, []);

    function isValidMeal({ name }) {
        return ['dinner', 'lunch', 'breakfast'].includes(name);
    }

    const tabItems = useMemo(() => meals.filter(isValidMeal).map(({ _id, name, int }) => ({
        id: _id,
        title: TRANSLATIONS.MEALS[name],
        url: name,
        timeRange: [int.startTime / 100, int.endTime / 100],
    })).reverse(), [meals]);

    const activeTabName = window.location.hash.replace('#', '');
    const activeTab = tabItems.find(tab => tab.url === activeTabName);

    function bookTable(date, seats) {
        const bookingInfo = {
            meal: activeTab.id,
            date,
            user: USER_ID,
            seats,
        };

        if (!bookingInfo.meal ||
          !bookingInfo.date ||
          !bookingInfo.user ||
          !bookingInfo.seats
        ) {
            return;
        }
        dispatch(requestTableBooking({data: bookingInfo}));
    }

    function handleModalConfirmed() {
        setIsModalOpen(false);
        dispatch(resetStatus())
    }

    const modalProps = useMemo(() => {
        if (status === BOOKING_STATUSES.CONFIRMED) {
            return {
                title: activeTab.title,
                content: TRANSLATIONS.BOOKING.CONFIRMED,
                confirm: TRANSLATIONS.CONFIRM,
                onClose: handleModalConfirmed,
            };
        }

        if (status === BOOKING_STATUSES.DECLINED) {
            return {
                title: activeTab.title,
                content: TRANSLATIONS.BOOKING.DECLINED,
                confirm: TRANSLATIONS.BOOKING.COMPENSATE,
                onClose: () => setIsModalOpen(false),
            };
        }

        if (error) {
            return {
                title: activeTab.title,
                content: ERRORS[error],
                confirm: TRANSLATIONS.CONFIRM,
                onClose: handleModalConfirmed,
            };
        }
    }, [status, activeTab, error]);

    if (!meals.length) {
        return <div>Loading...</div>
    }

    return (
        <div className="mh-container mh-room-service">
            <Tabs items={tabItems} />
            {!voucherMealData && activeTab &&
            <MealBooking
              icon={activeTab.url}
              onSubmit={bookTable}
              defaultDate={moment().hour(activeTab.timeRange[0])}
              timeRange={{ min: activeTab.timeRange[0], max: activeTab.timeRange[1] }}
            />}

            { isModalOpen && <Modal {...modalProps} /> }

            { !!voucherMealData && <VouchersPage icon={activeTab.url} /> }
        </div>
    );
}

RestaurantContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    error: PropTypes.string,
    meals: PropTypes.array.isRequired,
    voucherMealData: PropTypes.shape({}),
    status: PropTypes.oneOf(['na', 'confirmed', 'declined']).isRequired,
};

export default connect(mapStateToProps)(RestaurantContainer)
