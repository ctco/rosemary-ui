import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import noop from 'lodash/noop';
import omit from 'lodash/omit';

class Button extends React.Component {
    static propTypes = {
        onClick: PropTypes.func,
        selected: PropTypes.bool,
        disabled: PropTypes.bool,
        className: PropTypes.string,
        baseClassName: PropTypes.string,
        title: PropTypes.string,
        value: PropTypes.string,
        testId: PropTypes.any,
        as: PropTypes.string,
        children: PropTypes.node
    };
    static defaultProps = {
        baseClassName: 'btn',
        onClick: noop
    };

    render() {
        let style = classNames(this.props.className, this.props.baseClassName, {
            disabled: this.props.disabled,
            selected: this.props.selected
        });

        const Element = this.props.as || 'div';
        return (
            <Element
                {...omit(this.props, [
                    'baseClassName',
                    'disabled',
                    'selected',
                    'className',
                    'onClick',
                    'data-test-id',
                    'testId',
                    'as'
                ])}
                data-test-id={this.props.testId}
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

export default Button;
