import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import TetherComponent from 'react-tether';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {values} from 'lodash';
import {ESCAPE} from '../constant/key-codes';
import {enhanceWithClickOutside} from './hoc/OnClickOutsideHOC';
import {enhanceWithKeyDown} from './hoc/OnKeyDownHOC';
import {isDefined} from '../util/utils';

export const attachmentPositions = {
    'top left': {attachment: 'bottom left', targetAttachment: 'top left'},
    'top center': {attachment: 'bottom center', targetAttachment: 'top center'},
    'top right': {attachment: 'bottom right', targetAttachment: 'top right'},
    'middle left': {attachment: 'middle right', targetAttachment: 'middle left'},
    'middle right': {attachment: 'middle left', targetAttachment: 'middle right'},
    'bottom left': {attachment: 'top left', targetAttachment: 'bottom left'},
    'bottom center': {attachment: 'top center', targetAttachment: 'bottom center'},
    'bottom right': {attachment: 'top right', targetAttachment: 'bottom right'},
    'middle center': {attachment: 'middle center', targetAttachment: 'middle center'}
};

const POPUP_STATE = {
    OPEN: 'open',
    CLOSING: 'closing',
    CLOSED: 'closed'
};

const PROPERTY_TYPES = {
    attachment: React.PropTypes.oneOf(Object.keys(attachmentPositions)).isRequired,
    on: React.PropTypes.oneOf(['hover', 'click', 'focus']),
    popupClassName: React.PropTypes.string,
    targetClassName: React.PropTypes.string,
    changeAttachmentDynamically: React.PropTypes.bool,
    modal: React.PropTypes.bool,
    animationBaseName: React.PropTypes.string,
    onOpen: React.PropTypes.func,
    onTransitionClosedToOpen: React.PropTypes.func,
    onPopupStateChange: React.PropTypes.func,
    open: React.PropTypes.bool,
    onContentDidMount: React.PropTypes.func
};
const DEFAULT_PROPS = {
    on: 'hover',
    popupClassName: 'popover',
    targetClassName: '',
    changeAttachmentDynamically: false,
    modal: false,
    animationBaseName: 'popup--animation-scale',
    onContentDidMount: () => {
    }
};

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

class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            popupState: isDefined(props.open) && props.open ? POPUP_STATE.OPEN : POPUP_STATE.CLOSED
        };
        this.overlayElement = null;
        this.openTimeout = null;
        this.additionalChecks = [];

        this.doCheck = this.doCheck.bind(this);
        this.isContainedByPopup = this.isContainedByPopup.bind(this);
        this.close = this.close.bind(this);
    }

    componentDidMount() {
        if (this.context.addCheck) {
            this.context.addCheck(this.doCheck);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (isDefined(nextProps.open)) {
            const isOpen = nextProps.open;

            if (isOpen && POPUP_STATE.OPEN !== this.state.popupState) {
                this.updatePopupState(POPUP_STATE.OPEN);
            } else if (!isOpen && POPUP_STATE.OPEN === this.state.popupState) {
                this.updatePopupState(POPUP_STATE.CLOSING);
            }
        }
    }

    updatePopupState(popupState) {
        this.setState({popupState});
        this.applyOverlay(popupState);
    }

    getChildContext() {
        return {
            addCheck: (func) => {
                this.additionalChecks.push(func);
            }
        };
    }

    applyOverlay(popupState) {
        if (this.isModal()) {
            let overlayElement = this.overlayElement;
            let modalPopUpOverlayClassNames = classNames({
                'popup-overlay-opening': this.isModal() && popupState === POPUP_STATE.OPEN,
                'popup-overlay-closing': this.isModal() && popupState === POPUP_STATE.CLOSING,
                'popup-overlay': this.isModal()
            });

            switch (popupState) {
                case POPUP_STATE.OPEN:
                    if (overlayElement == null) {
                        overlayElement = document.createElement('div');
                    }
                    overlayElement.className = modalPopUpOverlayClassNames;
                    this.overlayElement = overlayElement;
                    document.body.appendChild(overlayElement);
                    break;
                case POPUP_STATE.CLOSING:
                    if (overlayElement != null) {
                        overlayElement.className = modalPopUpOverlayClassNames;
                    }
                    break;
                case POPUP_STATE.CLOSED:
                    if (overlayElement != null) {
                        document.body.removeChild(overlayElement);
                        this.overlayElement = null;
                    }
                    break;
                default:
                    break;
            }
        }
    }

    changeState(popupState) {
        if (POPUP_STATE.CLOSED !== popupState && this.props.onPopupStateChange) {
            this.props.onPopupStateChange(POPUP_STATE.OPEN === popupState);
        }

        if (POPUP_STATE.CLOSED === popupState || !this.isPopupStateControlled()) {
            this.updatePopupState(popupState);
        }
    }

    isPopupStateControlled() {
        return isDefined(this.props.open);
    }

    scheduleOpen() {
        if (this.isOpen()) {
            return;
        }

        if (!this.isClosing()) {
            if (this.props.onTransitionClosedToOpen) {
                this.props.onTransitionClosedToOpen();
            }
        }

        this.openTimeout = setTimeout(() => {
            this.changeState(POPUP_STATE.OPEN);
            this.openTimeout = null;
            if (this.props.onOpen) {
                this.props.onOpen();
            }
        }, 50);
    }

    handleClickOutside(e) {
        if (this.isModal()) {
            return;
        }

        if (!this.isOpen()) {
            return;
        }

        if (this.isContainedByPopup(e.target)) {
            return;
        }

        if (this.applyAdditionalChecks(e.target)) {
            return;
        }

        this.close();
    }

    doCheck(element) {
        if (this.isContainedByPopup(element)) {
            return true;
        }

        return this.applyAdditionalChecks(element);
    }

    handleKeyDown(keyCode) {
        if (keyCode === ESCAPE && this.isOpen()) {
            this.close();
        }
    }

    close() {
        if (this.openTimeout) {
            clearTimeout(this.openTimeout);
            this.openTimeout = null;
            this.changeState(POPUP_STATE.CLOSED);
        } else {
            this.changeState(POPUP_STATE.CLOSING);
        }
    }

    getContent() {
        return this._content;
    }

    closeCompletely() {
        this.changeState(POPUP_STATE.CLOSED);
    }

    isOpen() {
        return this.state.popupState === POPUP_STATE.OPEN;
    }

    isClosing() {
        return this.state.popupState === POPUP_STATE.CLOSING;
    }

    isClosed() {
        return this.state.popupState === POPUP_STATE.CLOSED;
    }

    isModal() {
        return this.props.modal === true;
    }

    toggle() {
        if (this.isOpen()) {
            this.close();
        } else {
            this.scheduleOpen();
        }
    }

    isComponentChild(element) {
        return this.isContainedByComponent(element) || this.isContainedByPopup(element);
    }

    isContainedByPopup(element) {
        const domNode = ReactDOM.findDOMNode(this.refs.popup);
        if (domNode && domNode.parentNode.contains(element)) {
            return true;
        }
        return false;
    }

    applyAdditionalChecks(element) {
        for (let i = 0; i < this.additionalChecks.length; i++) {
            if (this.additionalChecks[i](element)) {
                return true;
            }
        }
        return false;
    }

    isContainedByComponent(element) {
        const currentNode = ReactDOM.findDOMNode(this);
        if (currentNode && currentNode.contains(element)) {
            return true;
        }
        return false;
    }

    getHandlers() {
        if (this.props.on === 'focus') {
            return {
                onClick: () => {
                    this.scheduleOpen();
                },
                onFocus: () => {
                    this.scheduleOpen();
                },
                onBlur: () => {
                    setTimeout(() => {
                        let focused = document.activeElement;

                        if (this.isComponentChild(focused)) {
                            return;
                        }

                        this.close();
                    }, 50);
                }
            };
        } else if (this.props.on === 'hover') {
            return {
                onMouseEnter: () => this.scheduleOpen(),
                onMouseLeave: () => this.close()
            };
        } else {
            return {
                onClick: () => this.toggle()
            };
        }
    }

    renderTarget() {
        let target = React.Children.toArray(this.props.children)[0];
        let handlers = this.getHandlers();

        let targetClassNames = classNames(target.props.className, this.props.targetClassName, {
            'open': this.isOpen()
        });

        target = React.cloneElement(target, {
            ...handlers,
            onClick: () => {
                if (this.props.onClick) {
                    this.props.onClick();
                }
                if (handlers.onClick) {
                    handlers.onClick();
                }
            },
            className: targetClassNames,
            id: target.props.id || this.props.id
        });

        return target;
    }

    renderPopupElement() {
        if (this.isClosing()) {
            return null;
        }

        let element = React.Children.toArray(this.props.children)[1];
        return (
            <PopupElement
                modal={this.isModal()}
                close={this.close}
                id={this.props.id}
                ref={(content) => this._content = content}
                key="popup"
                onUnmount={() => {
                    this.closeCompletely();
                }}
                didMount={(content) => this.props.onContentDidMount(content)}
            >
                {element}
            </PopupElement>
        );
    }

    renderElement() {
        if (this.isClosed()) {
            return null;
        }

        return (
            <ReactCSSTransitionGroup ref="popup"
                                     transitionAppear={true}
                                     transitionLeave={true}
                                     transitionAppearTimeout={300}
                                     transitionEnterTimeout={300}
                                     transitionLeaveTimeout={300}
                                     transitionName={this.props.animationBaseName}>
                {this.renderPopupElement()}
            </ReactCSSTransitionGroup>
        );
    }

    getProperties() {
        let attachmentProps = attachmentPositions[this.props.attachment];

        let properties = {...attachmentProps};

        if (this.isModal()) {
            properties.target = document.body;
            properties.targetModifier = 'visible';
        }

        if (this.props.changeAttachmentDynamically) {
            properties.constraints = [{to: 'window', attachment: 'together'}];
        } else {
            properties.constraints = [];
        }

        return properties;
    }

    render() {
        let tetherProperties = this.getProperties();

        return (
            <TetherComponent {...tetherProperties}
                             className={this.props.popupClassName}>
                {this.renderTarget()}
                {this.renderElement()}
            </TetherComponent>
        );
    }
}

Popup.propTypes = PROPERTY_TYPES;
Popup.defaultProps = DEFAULT_PROPS;

Popup.childContextTypes = {addCheck: React.PropTypes.func};
Popup.contextTypes = {addCheck: React.PropTypes.func};

export default enhanceWithKeyDown(enhanceWithClickOutside(Popup));
