import React, { PropTypes } from 'react';
import classNames from 'classnames';

const PROPERTY_TYPES = {
    onClick: React.PropTypes.func,
    disabled: React.PropTypes.bool
};
const DEFAULT_PROPS = {};

class Button extends React.Component {

    constructor(props) {
        super(props);

        this.onClickButton = this.onClickButton.bind(this);
    }

    render() {
        let style = classNames(this.props.className, {
            'btn': true,
            'disabled': this.props.disabled
        });

        return (
            <div id={this.props.id} className={style} onClick={this.onClickButton}>
                {this.props.children || this.props.text}
            </div>
        );
    }

    onClickButton() {
        if (this.props.onClick && !this.props.disabled) {
            this.props.onClick();
        }
    }
}

Button.propTypes = PROPERTY_TYPES;
Button.defaultProps = DEFAULT_PROPS;

export default Button;
