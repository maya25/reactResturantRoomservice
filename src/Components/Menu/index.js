import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import menuItems from '../../utils/menuItems'
import Button from '../Button';

export default function Menu() {
    function renderMenuItem({icon, text, url}) {
        return (
            <Button className="mh-menu__button" onClick={() => {}} variation="menu" icon={icon} key={url} href={url}>
                {text}
            </Button>
        );
    }

    return (
        <div className="mh-container--no-padding mh-menu">
            <div className="mh-menu__header">
                <h1>שירותי המלון</h1>

                <div className="mh-menu__circles">
                    <div className="circle circle-left" />
                    <div className="circle circle-mid" />
                    <div className="circle circle-right" />
                </div>
            </div>
            <div className="mh-menu__navigation">
                <Router>
                    {menuItems.map(item => renderMenuItem(item))}
                </Router>
            </div>
        </div>
    );
}
