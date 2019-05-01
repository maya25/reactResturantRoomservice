import React from 'react';
import PropTypes from 'prop-types';

export default function Input({ id, label, onChange, ...props }) {
    return (
        <div className="mh-input__container">
            <input {...props} className="mh-input" onChange={e => onChange(e.target.value)} id={id} />
            { label && (<label htmlFor={id}>{label}</label>) }
        </div>
    );
}

Input.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};
