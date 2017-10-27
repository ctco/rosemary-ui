import React from 'react';
import ReactDOM from 'react-dom';
import { KEY_DOWN } from '../constant/events';
import { isFunction } from '../../util/utils';

export function enhanceWithKeyDown(ParentClass) {
    class Enhance extends ParentClass {
        static get displayName() {
            return ParentClass.displayName || ParentClass.name;
        }

        constructor() {
            super(...arguments);
            this.handleKeyDown = this.handleKeyDown.bind(this);
        }

        componentDidMount() {
            if (super.componentDidMount) {
                super.componentDidMount(...arguments);
            }
            document.addEventListener(KEY_DOWN, this.handleKeyDown);
        }

        componentWillUnmount() {
            if (super.componentWillUnmount) {
                super.componentWillUnmount(...arguments);
            }
            document.removeEventListener(KEY_DOWN, this.handleKeyDown);
        }

        handleKeyDown({ keyCode }) {
            if (isFunction(super.handleKeyDown)) {
                super.handleKeyDown(keyCode);
            }
        }
    }

    Enhance.propTypes = ParentClass.propTypes;
    Enhance.defaultProps = ParentClass.defaultProps;
    Enhance.childContextTypes = ParentClass.childContextTypes;
    Enhance.contextTypes = ParentClass.contextTypes;
    return Enhance;
}
