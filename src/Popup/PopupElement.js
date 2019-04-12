import React from 'react';
import PropTypes from 'prop-types';

class PopupElement extends React.Component {
    componentDidMount() {
        this.props.didMount(this._popupElement);
    }

    componentWillUnmount() {
        this.props.onUnmount();
    }

    render() {
        let attrForType = this.context.parentType;
        let attrForId = this.props.id || this.context.id;
        let testId = this.props.testId || (this.context.testId && this.context.testId + '_popup');
        return (
            <div
                ref={popupElement => (this._popupElement = popupElement)}
                data-attr-for-type={attrForType}
                data-attr-for-id={attrForId}
                data-test-id={testId}
                className="popup-content-wrapper"
                style={this.props.style}
            >
                <div className="popup-content">
                    {this.props.modal && (
                        <i className="im icon-close popup-close icon--xxs" onClick={() => this.props.close()} />
                    )}
                    {this.props.children}
                </div>
            </div>
        );
    }
}

PopupElement.contextTypes = {
    id: PropTypes.string,
    parentType: PropTypes.string,
    testId: PropTypes.string,
    style: PropTypes.any
};

export default PopupElement;
