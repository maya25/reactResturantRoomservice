import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon';
import Schedule from '../Schedule';
import Button from '../Button';
import getDropdownNumberedItems from '../../utils/getDropdownNumberedItems';
import Dropdown from "../Dropdown";

export default function MealBooking({ icon, onSubmit, defaultDate, timeRange }) {
  const [date, setDate] = useState(defaultDate);
  const [seats, setSeats] = useState('1');

  return (
    <div className="mh-tabbed-page__content">
      <div className="mh-tab-icon">
        <Icon icon={icon} />
      </div>

      <Dropdown id="mh-meal-selection" placeholder="בחר מספר אורחים" onChange={setSeats} options={getDropdownNumberedItems(4)}/>

      <Schedule
        onSubmit={setDate}
        defaultValue={defaultDate}
        timeConstraints={{hours: timeRange}}
      />

      <Button onClick={() => onSubmit(date, seats.value)}>
        שלח
      </Button>
    </div>
  );
}

MealBooking.propTypes = {
  defaultDate: PropTypes.any,
  icon: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  timeRange: PropTypes.shape({
    min: PropTypes.any.isRequired,
    max: PropTypes.any.isRequired,
  }).isRequired,
};
