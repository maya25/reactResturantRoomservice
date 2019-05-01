import React from 'react';
import menuItems from '../../utils/menuItems'

export default function TopBar() {
    return (
        <nav role="navigation" className="mh-top-bar">
            <div className="mh-top-bar__toggle">
                <input type="checkbox" />

                <span />
                <span />
                <span />

                <ul className="mh-top-bar__menu">
                    {menuItems.map(({ text, url }) => (
                        <a key={url} className="mh-topbar-menu__link" href={url}><li>{text}</li></a>
                    ))}
                </ul>
            </div>
        </nav>
    );
}
