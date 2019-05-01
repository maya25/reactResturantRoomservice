import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Tabs from '../../Components/Tabs';
import MissingItems from '../../Components/MissingItems';
import Maintenance from '../../Components/Maintenance';
import Schedule from '../../Components/Schedule';
import Modal from '../../Components/Modal';
import { selectRoom } from '../../selectors';
import {
    getRoom,
    sendServicesRequest,
} from '../../actions/room';
import Icon from '../../Components/Icon';
import {HOTEL_ID, ROOM_ID, SERVICES, TRANSLATIONS, USER_ID} from '../../utils/consts';

const mapStateToProps = state => ({
    room: selectRoom(state),
});

export function RoomServiceContainer({dispatch}) {
    const [isModalOpen, setModalOpen] = useState(false);
    const [requestedServices, setRequestedServices] = useState(null);

    useEffect(() => {
        dispatch(getRoom({ hotelId: HOTEL_ID, roomId: ROOM_ID }));
    }, []);

    const tabItems = [
        { title: TRANSLATIONS.SERVICES.CLEANING, url: 'cleaning', switchTitle: TRANSLATIONS.CLEANING_true, switchActive: false, id: SERVICES.CLEANING },
        { title: TRANSLATIONS.SERVICES.ALARM, url: 'wake-up',  id: SERVICES.ALARM },
        { title: TRANSLATIONS.SERVICES.MAINTENANCE, url: 'maintenance', id: SERVICES.MAINTENANCE },
        { title: TRANSLATIONS.SERVICES.MISSING_ITEMS, url: 'missing-items', id: SERVICES.MISSING_ITEMS },
    ];

    const activeTabUrl = window.location.hash.replace('#', '');
    const activeTab = tabItems.find(tab => tab.url === activeTabUrl);
    const activeTabName = activeTab ? activeTab.id : tabItems[tabItems.length -1].id;

    function handleSubmit(args) {
        setRequestedServices({
            [activeTab.id]: args
        });
        setModalOpen(true);
    }

    function handleModalClosed(modalConfirmed) {
        setModalOpen(false);

        if(!modalConfirmed) {
            return;
        }

        const defaultPayload = {
            user_id: USER_ID,
            hotel_id: HOTEL_ID,
            room_id: ROOM_ID,
        };
        Object.keys(requestedServices).forEach(
          serviceType => dispatch(
            sendServicesRequest({ ...defaultPayload, serviceType, data: {...requestedServices[serviceType], type: serviceType, ...defaultPayload} })
          )
        )
    }


    function renderTabByUrl() {
        switch(activeTabName) {
            case SERVICES.MAINTENANCE:
                return (<Maintenance onSubmit={handleSubmit} />);
            case SERVICES.MISSING_ITEMS:
                return (<MissingItems onSubmit={handleSubmit} />);
            default:
                return (
                  <Schedule
                    withSubmit
                    onSubmit={handleSubmit}
                    withTime={activeTab.url === 'wake-up'}
                    switchTitle={activeTab.switchTitle}
                    switchActive={activeTab.switchActive}
                  />);
        }
    }

    return (
      <div className="mh-container mh-room-service">
          <Tabs items={tabItems} />

          { !!activeTab && (
            <div className="mh-tabbed-page__content">
                <div className="mh-tab-icon">
                    <Icon icon={activeTab.url} />
                </div>
                { activeTab && renderTabByUrl() }
            </div>
          ) }

          { isModalOpen && (
            <Modal
              title={activeTab.title}
              content={TRANSLATIONS.REQUEST_RECEIVED}
              confirm={TRANSLATIONS.CONFIRM}
              cancel={TRANSLATIONS.DECLINE}
              onClose={handleModalClosed}
            />
          ) }
      </div>
    );
}

RoomServiceContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    room: PropTypes.shape({}).isRequired,
};

export default connect(mapStateToProps)(RoomServiceContainer);
