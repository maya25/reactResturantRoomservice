import React, { useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import Input from '../../Components/Input';
import Button from '../../Components/Button';
import { getServicesRequests, modifyServicesRequest } from '../../actions/management';
import { HOTEL_ID, ROOM_ID, SERVICES, TRANSLATIONS } from '../../utils/consts';
import { initialState } from '../../reducers/servicesRequests';

const mapStateToProps = state => ({
    requests: state.servicesRequests.data || initialState,
});

function ManagementContainer({ requests, dispatch }) {
    useEffect(() => {
        dispatch(getServicesRequests({ hotelId: HOTEL_ID }));
    }, []);

    const room_nums = useMemo(() => Array.from(new Set(requests.map(request => request.room_num))), [requests]);

    function getWakeUpTime(date) {
        return date.format('לDD.M.YY בHH:mm');
    }
    function getCleaningTime(date) {
        return date.format('DD.M.YY');
    }
    function missingItemsHasRequiredProps(items) {
        return items.some(item => Object.keys(item).includes('item'));
    }

    function getRequestTitle(requestProps) {
        const { type, desc, items, date, is_handle } = requestProps;
        const parsedDate = moment(date);
        const categoryTranslated = TRANSLATIONS[type];

        switch (type) {
            case SERVICES.MISSING_ITEMS:
                if(!missingItemsHasRequiredProps(items)) {
                    return;
                }
                return `${categoryTranslated}: ${items.map(({ item, quantity }) => item && quantity ? `${TRANSLATIONS[item.toUpperCase()]}: ${quantity}` : null)}`;
            case SERVICES.MAINTENANCE:
                const descriptionTranslated = TRANSLATIONS.MAINTENANCE[desc.toUpperCase()];
                return `${categoryTranslated}: ${descriptionTranslated ? descriptionTranslated : desc}`;
            case SERVICES.ALARM:
                return `${categoryTranslated} ${getWakeUpTime(parsedDate)}`;
            case SERVICES.CLEANING:
                return `${TRANSLATIONS[`CLEANING_${!is_handle}`]} - ${getCleaningTime(parsedDate)}`;
            default:
                return;
        }
    }

    function filterRequestByRoom (request, room_num) {
        return request.room_num === room_num;
    }

    function handleResolved({ id, type }) {
        dispatch(modifyServicesRequest({ hotelId: HOTEL_ID, serviceType: type, data: { room_id: ROOM_ID, call_id: id } }))
    }

    function requestRow(request) {
        const details = getRequestTitle(request);
        if (!details) {
            return;
        }

        return (
          <li key={request.id} className="mh-flex mh-management__row">
              <div className="mh-flex-column mh-flex--justify-end">
                  <Button className="mh-management__button" variation="subtle" onClick={() => handleResolved(request)}>טופל</Button>
              </div>
              <div className="mh-flex-column mh-flex--justify-center mh-management__row--details">
                  <p>{details}</p>
                  <Input type="text" label="הערות" id="mh-management-rs-noted" onChange={() => console.log('change')} />
              </div>
          </li>
        );
    }

    return (
        <div className="mh-container mh-management">
            {room_nums.map(room_num => (
                <ul key={room_num} className="room-requests">
                    <p><b>{room_num}</b> חדר</p>
                    {requests
                      .filter(request => filterRequestByRoom(request, room_num))
                      .map(request => requestRow(request))}
                </ul>
            ))}
        </div>
    );
}

ManagementContainer.propTypes = {
    requests: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(ManagementContainer);
