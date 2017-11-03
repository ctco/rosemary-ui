import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Popup from '../../Popup';

const PROPERTY_TYPES = {
    className: PropTypes.string,
    active: PropTypes.bool,
    right: PropTypes.bool
};
const DEFAULT_PROPS = {
    className: ''
};

export default class NavDropDownItem extends React.Component {
    render() {
        let navItemClassNames = classNames(this.props.className, {
            'rm-nav-bar__item': true,
            'rm-nav-bar__item--right': this.props.right,
            'rm-nav-bar__item--active': this.props.active
        });

        return (
            <Popup targetClassName={navItemClassNames} attachment="bottom right" on="click">
                {this.props.children[0]}
                {this.props.children[1]}
            </Popup>
        );
    }
}

NavDropDownItem.propTypes = PROPERTY_TYPES;
NavDropDownItem.defaultProps = DEFAULT_PROPS;
