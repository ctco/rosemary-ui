import React from 'react';
import ReactDOM from 'react-dom';
import { CLICK } from '../constant/events';
import { isFunction } from '../../util/utils';

export function enhanceWithClickOutside(ParentClass) {
    class Enhance extends ParentClass {
        static get displayName() {
            return ParentClass.displayName || ParentClass.name;
        }

        constructor() {
            super(...arguments);
            this.handleClickOutside = this.handleClickOutside.bind(this);
        }

        componentDidMount() {
            if (super.componentDidMount) {
                super.componentDidMount(...arguments);
            }
            document.addEventListener(CLICK, this.handleClickOutside, true);
        }

        componentWillUnmount() {
            if (super.componentWillUnmount) {
                super.componentWillUnmount(...arguments);
            }
            document.removeEventListener(CLICK, this.handleClickOutside, true);
        }

        handleClickOutside(e) {
            const domNode = ReactDOM.findDOMNode(this);
            if ((!domNode || !domNode.contains(e.target)) && isFunction(super.handleClickOutside)) {
                super.handleClickOutside(e);
            }
        }
    }
    Enhance.propTypes = ParentClass.propTypes;
    Enhance.defaultProps = ParentClass.defaultProps;
    Enhance.childContextTypes = ParentClass.childContextTypes;
    Enhance.contextTypes = ParentClass.contextTypes;
    return Enhance;
}
