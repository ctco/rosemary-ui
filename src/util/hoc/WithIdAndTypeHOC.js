import React from 'react';

export function withIdAndTypeContext(ParentClass) {
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
                parentType: ParentClass.displayName || ParentClass.name,
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
        parentType: React.PropTypes.string,
        id: React.PropTypes.string
    };
    Enhance.contextTypes = {
        ...parentContextTypes,
        id: React.PropTypes.string
    };
    return Enhance;
}
