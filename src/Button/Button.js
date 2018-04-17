import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import noop from 'lodash/noop';

const PROPERTY_TYPES = {
    onClick: PropTypes.func,
    selected: PropTypes.bool,
    disabled: PropTypes.bool,
    baseClassName: PropTypes.string,
    title: PropTypes.string,
    value: PropTypes.string,
    testId: PropTypes.any,
    as: PropTypes.string
};
const DEFAULT_PROPS = {
    baseClassName: 'btn',
    onClick: noop
};

class Button extends React.Component {
    render() {
        let style = classNames(this.props.className, this.props.baseClassName, {
            disabled: this.props.disabled,
            selected: this.props.selected
        });
        const Element = this.props.as || 'div';
        return (
            <Element
                data-test-id={this.props.testId}
                title={this.props.title}
                id={this.props.id}
                className={style}
                onClick={this.onClickButton}
            >
                {this.props.children || this.props.value}
            </Element>
        );
    }

    onClickButton = e => {
        if (this.props.onClick && !this.props.disabled) {
            this.props.onClick(e);
        }
    };
}

Button.propTypes = PROPERTY_TYPES;
Button.defaultProps = DEFAULT_PROPS;

export default Button;
