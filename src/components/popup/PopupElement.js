import React from 'react';

class PopupElement extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.didMount(this._popupElement);
    }

    componentWillUnmount() {
        this.props.onUnmount();
    }

    render() {
        let attrForType = this.context.parentType;
        let attrForId = this.props.id || this.context.id;
        return (
            <div ref={(popupElement) => this._popupElement = popupElement}
                 data-attr-for-type={attrForType}
                 data-attr-for-id={attrForId}
                 className="popup-content-wrapper">
                <div className="popup-content">
                    {this.props.modal &&
                    <i className="im icon-close popup-close icon--xxs"
                       onClick={() => this.props.close()}/>}
                    {this.props.children}
                </div>
            </div>
        );
    }
}

PopupElement.contextTypes = {
    id: React.PropTypes.string,
    parentType: React.PropTypes.string
};

export default PopupElement;