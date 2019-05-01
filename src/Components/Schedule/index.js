import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DateTime from 'react-datetime';

import Switch from '../Switch';
import moment from 'moment';
import Button from '../Button';

export default function Schedule({ onSubmit, switchTitle, switchActive, withSubmit, withTime, timeConstraints, ...props }) {
    const [active, setActive] = useState(switchActive);
    const [schedule, setSchedule] = useState(null);

    function validateDate(current) {
        const checkoutDate = moment().add(3, 'days');
        const yesterday = moment().subtract(1, 'days');
        return current.isBefore(checkoutDate) && current.isAfter(yesterday);
    }

    return (
        <div className="mh-schedule">
            { switchTitle ? (
              <div className="mh-schedule__switch">
                  <Switch checked={active} onChange={e=> setActive(e.target.checked)} title={switchTitle}/>
              </div>
            ) : (<div className="mh-spacer" />) }
            <div className="mh-calendar">
                <DateTime
                  open
                  locale="he"
                  input={false}
                  timeFormat={withTime}
                  isValidDate={validateDate}
                  onChange={withSubmit ? setSchedule : onSubmit}
                  timeConstraints={timeConstraints}
                  {...props}
                />
            </div>

            { withSubmit && (
                <Button onClick={() => onSubmit({ date: schedule.toISOString() })}>
                    שלח
                </Button>
            ) }
        </div>
    );
}

Schedule.defaultProps = {
    switchTitle: null,
    withTime: false,
};

Schedule.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    switchTitle: PropTypes.string,
    withTime: PropTypes.bool,
};
