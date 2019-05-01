import React from 'react';
import PropTypes from 'prop-types';

export default function Modal({
    cancel,
    confirm,
    content,
    onClose,
    title,
}) {
    const confirmBtnClasses = !cancel ? 'mh-modal__btn--full-width' : '';
    return (
        <div className="mh-modal__wrapper">
            <div className="mh-modal">
                <div className="mh-modal__title">{title}</div>
                <div className="mh-modal__content">{content}</div>
                <div className="mh-modal__actions">
                    { !!cancel && <button onClick={() => onClose(false)}>{cancel}</button> }
                    <button onClick={() => onClose(true)} className={confirmBtnClasses}>{confirm}</button>
                </div>
            </div>
        </div>
    );
}

Modal.propTypes = {
    cancel: PropTypes.string,
    confirm: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
};
