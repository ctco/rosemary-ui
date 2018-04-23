import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Popup from '../Popup/Popup';

export default class Modal extends React.Component {
    render() {
        return (
            <Popup
                open={this.props.open}
                openByDefault={true}
                on={this.props.on || (this.props.trigger && 'click')}
                modal
                attachment="middle center"
                popupClassName={classNames(this.props.popupClassName, 'popup')}
                closeOnClickOutside={this.props.closeOnClickOutside}
                onClose={this.props.onClose}
                transparentOverlay={this.props.transparentOverlay}
            >
                {this.props.trigger || <span />}
                {this.props.content || this.props.children}
            </Popup>
        );
    }
}

Modal.propTypes = {
    open: PropTypes.bool,
    on: Popup.propTypes.on,
    trigger: PropTypes.element,
    closeOnClickOutside: PropTypes.bool,
    transparentOverlay: PropTypes.bool,
    popupClassName: PropTypes.string
};
