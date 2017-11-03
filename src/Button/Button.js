import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const PROPERTY_TYPES = {
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    baseClassName: PropTypes.string,
    title: PropTypes.string,
    value: PropTypes.string
};
const DEFAULT_PROPS = {
    baseClassName: 'btn'
};

class Button extends React.Component {
    constructor(props) {
        super(props);

        this.onClickButton = this.onClickButton.bind(this);
    }

    render() {
        let style = classNames(this.props.className, this.props.baseClassName, {
            disabled: this.props.disabled
        });

        return (
            <div title={this.props.title} id={this.props.id} className={style} onClick={this.onClickButton}>
                {this.props.children || this.props.value}
            </div>
        );
    }

    onClickButton(e) {
        if (this.props.onClick && !this.props.disabled) {
            this.props.onClick(e);
        }
    }
}

Button.propTypes = PROPERTY_TYPES;
Button.defaultProps = DEFAULT_PROPS;

export default Button;
