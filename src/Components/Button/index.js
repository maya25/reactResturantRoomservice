import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';

export default function Button({ onClick, variation, children, icon, className, ...rest }) {
    if (variation === 'menu') {
        return (
            <a {...rest} className={`mh-button mh-button--${variation} ${className}`}>
                <Icon className="icon--menu" icon={icon} />
                <p>{children}</p>
            </a>
        );
    }
    return (
        <button className={`mh-button mh-button--${variation} ${className}`} role={variation} onClick={onClick}>
            {children}
        </button>
    );
}

Button.defaultProps = {
    variation: 'submit',
};

Button.propTypes = {
    variation: PropTypes.oneOf(['submit', 'menu', 'subtle']),
    onClick: PropTypes.func.isRequired,
};
