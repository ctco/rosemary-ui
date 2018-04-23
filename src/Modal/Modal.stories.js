import React from 'react';

import { storiesOf } from '@storybook/react/dist/client/preview/index';

import Modal from './Modal';

class ManagedModal extends React.Component {
    state = {
        isOpen: true
    };

    timeout = null;

    componentWillUnmount() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
    }

    render() {
        return (
            <Modal open={this.state.isOpen} onClose={this.doClose}>
                {this.props.children}
            </Modal>
        );
    }

    doClose = () => {
        this.setState({ isOpen: false });

        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        this.timeout = window.setTimeout(this.reOpen, 3000);
    };

    reOpen = () => {
        this.setState({ isOpen: true });
        this.timeout = null;
    };
}

storiesOf('Modal', module)
    .add('default', () => (
        <Modal>
            <h1>I should open automatically</h1>
        </Modal>
    ))
    .add('Close on click outside', () => (
        <Modal closeOnClickOutside>
            <h1>I will close on dimmer click</h1>
        </Modal>
    ))
    .add('transparentOverlay', () => (
        <Modal transparentOverlay>
            <h1>MyOverlay is transparent! transparentOverlay={true}</h1>
        </Modal>
    ))
    .add('Managed 1', () => (
        <Modal open>
            <h1>You won't be able to close me</h1>
        </Modal>
    ))
    .add('Managed 2', () => (
        <ManagedModal>
            <h1>I will re-open after 3 seconds</h1>
        </ManagedModal>
    ))
    .add('Colored', () => (
        <Modal open popupClassName="popup-blue-border">
            <h1>I have blue border</h1>
        </Modal>
    ));
