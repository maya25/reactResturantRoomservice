import React from 'react';
import PropTypes from 'prop-types';

export default function Switch({ checked, onChange, title }) {
    return (
        <div className="mh-switch__container">
            <label className="mh-switch__label" htmlFor="mh-switch">
                { title }
            </label>
            <label className="mh-switch">
                <input id="mh-switch" type="checkbox" onChange={onChange} checked={checked} />
                <span className="mh-switch__slider mh-switch__slider--round" />
            </label>
        </div>
    );
}

Switch.defaultProps = {
    checked: true,
};

Switch.propTypes = {
    checked: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
};
