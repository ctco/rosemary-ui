import React from 'react';
import {Link} from 'react-router';

import DemoWithSnippet from '../../../demo/layout/DemoWithSnippet';
import {Nav, NavItem, NavDropDownItem} from '../../../src/components/navbar';
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
                    <NavItem active={true}>
                        <i className="im icon-my-efforts icon nav-icon"/>
                        <Link className="nav-bar__item-link" to={'/link2'}>Page 1</Link>
                    </NavItem>
                    <NavItem>
                        <i className="im icon-menu-vacation icon nav-icon"/>
                        <Link className="nav-bar__item-link" to={'/link2'}>Page 2</Link>
                    </NavItem>
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
                            <NavItem>
                                <a className="nav-bar__item-link">Logout</a>
                            </NavItem>
                        </Nav>
                    </NavDropDownItem>
                </Nav>
            </DemoWithSnippet>
        );
    }
}
