import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon';
import Dropdown from '../Dropdown';
import Button from '../Button';
import { TRANSLATIONS } from '../../utils/consts';

export default function CompensationSelection({ icon, onSubmit }) {
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const dropdownOptions = [
    { label: TRANSLATIONS.VOUCHERS.BAR, value: 'bar' },
    { label: TRANSLATIONS.VOUCHERS.LOBBY, value: 'lobby' },
    { label: TRANSLATIONS.VOUCHERS.ROOM_SERVICE, value: 'room service' },
  ];

  return (
    <div className="mh-tabbed-page__content">
      <div className="mh-tab-icon">
        <Icon icon={icon} />
      </div>

      <Dropdown id="mh-maintenance" options={dropdownOptions} placeholder="בחר שובר" onChange={selected => setSelectedVoucher(selected.value)} />

      <Button onClick={() => onSubmit(selectedVoucher)}>
        שלח
      </Button>
    </div>
  );
}

CompensationSelection.propTypes = {
  icon: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
