import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export default class NavBar extends React.Component {
    render() {
        let navClassNames = classNames(this.props.className, {
            'rm-nav-bar': true
        });
        return (
            <nav style={this.props.style} className={navClassNames}>
                {this.props.children}
            </nav>
        );
    }
}

NavBar.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object
};

NavBar.defaultProps = {
    className: '',
    style: {}
};
