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
                    <NavItem className="rm-nav-brand">
                        <i className="im icon-logo icon rm-nav-icon"/>
                        <a className="rm-nav-bar__item-link" title="Back to main page">Brand</a>
                    </NavItem>
                    <NavHrefItem active={true}>
                        <Link to="/page1">
                            <i className="im icon-my-efforts icon rm-nav-icon"/>
                            <span className="rm-nav-bar__item-link">Page 1</span>
                        </Link>
                    </NavHrefItem>
                    <NavHrefItem>
                        <Link to="/page2">
                            <i className="im icon-my-efforts icon rm-nav-icon"/>
                            <span className="rm-nav-bar__item-link">Page 2</span>
                        </Link>
                    </NavHrefItem>
                    <NavItem onClick={() => alert('some handler')}>
                        <a className="rm-nav-bar__item-link">Link with handler</a>
                    </NavItem>
                    <NavDropDownItem right={true} className="rm-nav-bar__item--user-menu">
                        <div>
                            <Avatar text="TC"/>
                            <i className="im rm-nav-drop-down-icon"/>
                        </div>
                        <Nav className="rm-nav-bar--vertical rm-nav-bar--secondary">
                            <NavHrefItem>
                                <Link to="/settings">
                                    <span className="rm-nav-bar__item-link">Settings</span>
                                </Link>
                            </NavHrefItem>
                            <NavHrefItem>
                                <Link to="/page2">
                                    <span className="rm-nav-bar__item-link">Logout</span>
                                </Link>
                            </NavHrefItem>
                        </Nav>
                    </NavDropDownItem>
                </Nav>

                <br/>
                <h4>Example of NavHrefItem: between Internal and External resources</h4>
                <Nav>
                    <NavHrefItem>
                        <Link to="http://www.google.com">
                            <i className="im icon-my-efforts icon rm-nav-icon"/>
                            <span className="rm-nav-bar__item-link">Internal_Link</span>
                        </Link>
                    </NavHrefItem>
                    <NavHrefItem>
                        <a href="http://www.google.com">
                            <i className="im icon-my-efforts icon rm-nav-icon"/>
                            <span className="rm-nav-bar__item-link">External_Link</span>
                        </a>
                    </NavHrefItem>
                </Nav>


                <br/>
                <h4>With hover-Effect Example</h4>
                <Nav>
                    <NavHrefItem>
                        <Link to="/p1">
                            <i className="im icon-my-efforts icon rm-nav-icon"/>
                            <span className="rm-nav-bar__item-link">NavHrefItemNoHover</span>
                        </Link>
                    </NavHrefItem>
                    <NavHrefItem withHoverEffect={true}>
                        <Link to="/p3">
                            <i className="im icon-my-efforts icon rm-nav-icon"/>
                            <span className="rm-nav-bar__item-link">NavHrefItemHasHover</span>
                        </Link>
                    </NavHrefItem>

                    <NavItem onClick={() => alert('some handler')}>
                        <i className="im icon-my-efforts icon rm-nav-icon"/>
                        <a className="rm-nav-bar__item-link">NavItemNoHover</a>
                    </NavItem>
                    <NavItem withHoverEffect={true} onClick={() => alert('some handler')}>
                        <i className="im icon-my-efforts icon rm-nav-icon"/>
                        <a className="rm-nav-bar__item-link">NavItemHasHover</a>
                    </NavItem>
                </Nav>

            </DemoWithSnippet>
        );
    }
}
