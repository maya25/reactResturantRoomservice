import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Dropdown from '../Dropdown';
import Textarea from '../Textarea';
import Button from '../Button';
import getDropdownNumberedItems from '../../utils/getDropdownNumberedItems';
import { TRANSLATIONS } from '../../utils/consts';

export default function MissingItems({ onSubmit }) {
    const [missingItems, setMissingItems] = useState([]);
    const [notes, setNotes] = useState('');
    const placeholder = `בקשות מיוחדות`;

    const requestOpts = [
        { id: 'blanket', title: TRANSLATIONS.BLANKET, availableAmount: 4 },
        { id: 'pillow', title: TRANSLATIONS.PILLOW, availableAmount: 2 },
        { id: 'shampoo', title: TRANSLATIONS.SHAMPOO, availableAmount: 2 },
        { id: 'towel', title: TRANSLATIONS.TOWEL, availableAmount: 2 },
    ];

    function renderRequestOptionDropdown({id, title, availableAmount}) {
        const items = getDropdownNumberedItems(availableAmount);
        return (
            <Dropdown
                key={id}
                id={id}
                label={title}
                options={items}
                placeholder="כמות"
                onChange={selectedAmount => setMissingItems([ ...missingItems, { item: id, quantity: selectedAmount.value }])}
            />
        );
    }

    function handleSubmit() {
        onSubmit({ items: missingItems, notes });
        setMissingItems([]);
        setNotes('');
    }

    return (
        <div className="mh-missing-items">
            { requestOpts.map(opt => renderRequestOptionDropdown(opt)) }
            <div className="textarea-container">
                <Textarea id="mh-maintenance-text" onChange={setNotes} placeholder={placeholder}/>
            </div>

            <Button onClick={handleSubmit}>
                שלח
            </Button>
        </div>
    );
}

MissingItems.protoTypes = {
    onSubmit: PropTypes.func.isRequired,
};
