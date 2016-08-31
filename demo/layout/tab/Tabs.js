import React from 'react';
import {Link} from 'react-router';

export default class Tabs extends React.Component {
    getTabs() {
        return this.props.tabs.map((tab) => {
            let active = this.context.router.isActive(tab.link, true);

            let className = 'tab';
            if (active) {
                className += ' active';
                className += ' demo-link';
            }
            return (<Link to={tab.link} className={className} key={tab.name}>{tab.name}</Link>);
        });
    }
    render() {
        return (
            <div>
                <div className="tabs">
                    {this.getTabs()}
                </div>
                <div className="tab-content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

Tabs.contextTypes = {
    router: React.PropTypes.object.isRequired
};
