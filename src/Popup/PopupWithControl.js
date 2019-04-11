import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import Popup from '../Popup';

import {withIdAndTypeContext} from '../util/hoc/WithIdAndTypeHOC';

export const PROPERTY_TYPES = {
    disabled: PropTypes.bool,
    handlePopupStateChange: PropTypes.func,
    renderInput: PropTypes.func,
    renderPopup: PropTypes.func,
    attachment: PropTypes.string,
    popupClassName: PropTypes.string,
    animationBaseName: PropTypes.string,
    animate: PropTypes.bool
};
const DEFAULT_PROPS = {
    disabled: false
};

class PopupWithControl extends React.Component {
    inputRef;

    handlePopupStateChange = (open) => {
        if (this.props.disabled) {
            return;
        }

        if (this.props.handlePopupStateChange) {
            this.props.handlePopupStateChange(open);
        }

        if (open) {
            this.handlePopupOpening();
        }
    };

    handlePopupOpening() {
        let popupContent = ReactDOM.findDOMNode(this.refs.popup.getContent());
        if (this.props.popupWidth) {
            popupContent.style.width = `${this.props.popupWidth}px`;
        } else {
            let input = ReactDOM.findDOMNode(this.inputRef);
            popupContent.style.width = `${input.offsetWidth}px`;
        }
    }

    render() {
        return (
            <Popup
                onContentDidMount={this.props.onContentDidMount}
                ref="popup"
                attachment={this.props.attachment}
                on="click"
                popupClassName={this.props.popupClassName}
                animationBaseName={this.props.animationBaseName}
                open={this.props.popupOpen}
                onPopupStateChange={this.handlePopupStateChange}
                animate={this.props.animate}
            >
                {this.props.renderInput(this.storeInputRef)}

                {this.props.renderPopup()}
            </Popup>
        );
    }

    storeInputRef = (ref) => this.inputRef = ref;
}

PopupWithControl.propTypes = PROPERTY_TYPES;
PopupWithControl.defaultProps = DEFAULT_PROPS;

export default withIdAndTypeContext(PopupWithControl, 'PopupWithControl');
