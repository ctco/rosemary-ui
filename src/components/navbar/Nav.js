import '../../assets/scss/components/_nav.scss';

import React from 'react';
import classNames from 'classnames';

export default class Nav extends React.Component {

    render() {
        let navClassNames = classNames(this.props.className, {
            'nav-bar': true
        });
        return (
            <nav style={this.props.style} className={navClassNames}>
                {this.props.children}
            </nav>
        );
    }
}

Nav.propTypes = {
    className: React.PropTypes.string,
    style: React.PropTypes.object
};

Nav.defaultProps = {
    className: '',
    style: {}
};
