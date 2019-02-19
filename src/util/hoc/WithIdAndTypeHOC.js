import React from 'react';
import PropTypes from 'prop-types';

export function withIdAndTypeContext(ParentClass, parentType) {
    class Enhance extends ParentClass {
        static get displayName() {
            return ParentClass.displayName || ParentClass.name;
        }

        constructor() {
            super(...arguments);
        }

        getChildContext() {
            let result = {};
            if (super.getChildContext) {
                result = super.getChildContext(...arguments);
            }
            return {
                ...result,
                parentType: parentType || ParentClass.displayName || ParentClass.name,
                id: this.props.id || this.context.id
            };
        }
    }
    Enhance.propTypes = ParentClass.propTypes;
    Enhance.defaultProps = ParentClass.defaultProps;

    let parentChildContextTypes = ParentClass.childContextTypes;
    let parentContextTypes = ParentClass.contextTypes;

    Enhance.childContextTypes = {
        ...parentChildContextTypes,
        parentType: PropTypes.string,
        id: PropTypes.string
    };
    Enhance.contextTypes = {
        ...parentContextTypes,
        id: PropTypes.string
    };
    return Enhance;
}
