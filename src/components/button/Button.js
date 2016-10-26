import React, { PropTypes } from 'react';
import classNames from 'classnames';

const PROPERTY_TYPES = {
    onClick: React.PropTypes.func,
    disabled: React.PropTypes.bool,
    baseClassName: React.PropTypes.string,
    title: React.PropTypes.string,
    value: React.PropTypes.string
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
            'disabled': this.props.disabled
        });

        return (
            <div title={this.props.title} id={this.props.id} className={style} onClick={this.onClickButton}>
                {this.props.children || this.props.value}
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
