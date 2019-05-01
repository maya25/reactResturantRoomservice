import React from 'react';
import PropTypes from 'prop-types';

export default function Tabs({ items }) {
    const activeTabUrl = window.location.hash.replace('#', '');
    if (!window.location.hash) {
        window.location.hash = items[items.length - 1].url;
    }

    const tabClasses = url => url === activeTabUrl ? 'mh-tabs__tab mh-tabs__tab--active' : 'mh-tabs__tab';

    return (
        <div className="mh-tabs">
            {
                items.map(({ title, url }) => (
                    <a key={url} href={`#${url}`} className={tabClasses(url)}>
                        {title}
                    </a>
                ))
            }
        </div>
    );
}

Tabs.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
    })).isRequired,
};
