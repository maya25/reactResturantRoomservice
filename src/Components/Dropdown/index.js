import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DropdownComponent from 'react-dropdown';

export default function Dropdown({ id, placeholder, options, selectedOption, onChange, label }) {
    const [selectedItem, setSelectedItem] = useState(selectedOption);

    function handleDropdownChanged(item) {
        setSelectedItem(item);
        onChange(item);
    }

    return (
        <div className="mh-dropdown__container">
            <DropdownComponent
                id={id}
                className="mh-dropdown"
                options={options}
                placeholder={placeholder}
                onChange={handleDropdownChanged}
                value={selectedItem}
            />
            { label && (<label className="mh-dropdown__label" htmlFor={id}>{label}</label>) }
        </div>
    );
}

Dropdown.propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })),
    onChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string,
};
