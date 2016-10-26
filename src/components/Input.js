import React, {PropTypes} from 'react';
import cn from 'classnames';
import {isDefined} from '../util/utils';
import * as sizes from '../constant/sizes';

const PROPERTY_TYPES = {
    disabled: React.PropTypes.bool,
    placeholder: React.PropTypes.string,
    maxLength: React.PropTypes.number,
    type: React.PropTypes.oneOf(['text', 'password']),
    value: React.PropTypes.any,
    onBlur: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onChange: React.PropTypes.func,
    readOnly: React.PropTypes.bool,
    fluid: React.PropTypes.bool,
    size: sizes.anySize
};
const DEFAULT_PROPS = {
    type: 'text',
    maxLength: 254,
    readOnly: false,
    fluid: false,
    sizes: sizes.NORMAL
};

class Input extends React.Component {
    constructor(props) {
        super(props);
        if (!this.isControlled()) {
            this.state = {
                value: ''
            };
        }
        this.update = this.update.bind(this);
    }

    focus() {
        this.refs.input.focus();
    }

    update(e) {
        let value = e.target.value;
        if (!this.isControlled()) {
            this.setState({
                value
            });
        }
        if (this.props.onChange && !this.props.disabled) {
            this.props.onChange(value);
        }
    }

    isControlled() {
        return isDefined(this.props.value);
    }

    render() {
        let style = cn(this.props.className, 'text-input', {
            'disabled': this.props.disabled,
            'text-input--fluid': this.props.fluid,
            'text-input--sm': this.props.size === sizes.SMALL,
            'text-input--lg': this.props.size === sizes.LARGE
        });

        return (
            <div className={style}>
                <input
                    maxLength={this.props.maxLength}
                    ref="input"
                    readOnly={this.props.readOnly}
                    value={this.isControlled() ? this.props.value : this.state.value}
                    placeholder={this.props.placeholder}
                    onChange={(e) => this.update(e)}
                    onBlur={this.props.onBlur}
                    onFocus={this.props.onFocus}
                    type={this.props.type}/>
            </div>
        );
    }
}

Input.propTypes = PROPERTY_TYPES;
Input.defaultProps = DEFAULT_PROPS;

export default Input;

