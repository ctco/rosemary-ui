import React from 'react';
import {Link} from 'react-router';

import DemoWithSnippet from '../../../demo/layout/DemoWithSnippet';
import {Nav, NavItem, NavDropDownItem, NavHrefItem} from '../../../src/components/navbar';
import Avatar from '../../../src/components/Avatar';

export default class NavBarDemo extends React.Component {
    render() {
        return (
            <DemoWithSnippet>
                <Nav>
                    <NavItem className="nav-brand">
                        <i className="im icon-logo icon nav-icon"/>
                        <a className="nav-bar__item-link" title="Back to main page">Brand</a>
                    </NavItem>
                    <NavHrefItem to="/page1" active={true}>
                        <i className="im icon-my-efforts icon nav-icon"/>
                        <span className="nav-bar__item-link">Page 1</span>
                    </NavHrefItem>
                    <NavHrefItem to="/page2">
                        <i className="im icon-my-efforts icon nav-icon"/>
                        <span className="nav-bar__item-link">Page 2</span>
                    </NavHrefItem>
                    <NavItem onClick={() => alert('some handler')}>
                        <a className="nav-bar__item-link">Link with handler</a>
                    </NavItem>
                    <NavDropDownItem right={true} className="nav-bar__item--user-menu">
                        <div>
                            <Avatar text="TC"/>
                            <i className="im nav-drop-down-icon"/>
                        </div>
                        <Nav className="nav-bar--vertical nav-bar--secondary">
                            <NavItem>
                                <a className="nav-bar__item-link">Settings</a>
                            </NavItem>
                            <NavHrefItem to="/logout">
                                <span className="nav-bar__item-link">Logout</span>
                            </NavHrefItem>
                        </Nav>
                    </NavDropDownItem>
                </Nav>

                <br/>
                <h4>Example of NavHrefItem between Internal and External </h4>
                <Nav>
                    <NavHrefItem to="http://www.google.com">
                        <i className="im icon-my-efforts icon nav-icon"/>
                        <span className="nav-bar__item-link">Internal to google</span>
                    </NavHrefItem>
                    <NavHrefItem internal={false} to="http://www.google.com">
                        <i className="im icon-my-efforts icon nav-icon"/>
                        <span className="nav-bar__item-link">External to google</span>
                    </NavHrefItem>
                </Nav>

            </DemoWithSnippet>
        );
    }
}
