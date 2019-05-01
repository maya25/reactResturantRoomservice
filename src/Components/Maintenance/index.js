import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';

import Textarea from '../Textarea';
import Dropdown from '../Dropdown';
import Button from '../Button';
import { MAINTENANCE_OPTIONS, TRANSLATIONS } from '../../utils/consts';

export default function Maintenance({ onSubmit }) {
    const [maintenanceSubject, setMaintenanceSubject] = useState('');
    const [notes, setNotes] = useState('');

    const options = useMemo(() => MAINTENANCE_OPTIONS.map(
        opt => ({ label: TRANSLATIONS.MAINTENANCE[opt.toUpperCase()], value: opt })
    ), []);

    const placeholder = `.תיאור הבעיה
    לדוגמא: המזגן בחדר 003 לא עובד`;
    return (
        <div className="mh-maintenance">
            <Dropdown id="hm-maintenance" options={options} placeholder="נושא הבעיה" onChange={setMaintenanceSubject} />
            <Textarea id="mh-maintenance-text" onChange={setNotes} placeholder={placeholder}/>

            <Button onClick={() => onSubmit({ desc: maintenanceSubject.label, notes })}>
                שלח
            </Button>
        </div>
    );
}

Maintenance.prototype = {
    onSubmit: PropTypes.func.isRequired,
};
