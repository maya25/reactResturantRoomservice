import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

export default function Textarea({ id, label, placeholder, onChange }) {
    return (
        <Fragment>
            { label && (<label htmlFor={id}>{label}</label>) }
            <textarea className="mh-textarea" onChange={e => onChange(e.target.value)} placeholder={placeholder} id={id} />
        </Fragment>
    );
}

Textarea.propTypes = {
    id: PropTypes.string.isRequired,
    labelText: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};
