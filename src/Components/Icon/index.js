import React from 'react';
import PropTypes from 'prop-types';
import iconMap from './iconMap';

export default function Icon({ icon, className }) {
    return (
        <img className={className} src={iconMap[icon]} alt={icon} />
    );
}

Icon.propTypes = {
    icon: PropTypes.oneOf(Object.keys(iconMap)),
    className: PropTypes.string,
};
