import React, {PropTypes} from 'react';
import classNames from 'classnames';
import {isDefined} from '../util/utils';

const PROPERTY_TYPES = {
    disabled: React.PropTypes.bool,
    placeholder: React.PropTypes.string,
    focus: React.PropTypes.bool,
    type: React.PropTypes.oneOf(['text', 'password']),
    value: React.PropTypes.any,
    onBlur: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onChange: React.PropTypes.func
};
const DEFAULT_PROPS = {
    type: 'text'
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
        let style = classNames(this.props.className, {
            'text-input': true,
            'disabled': this.props.disabled
        });

        return (
            <div className={style}>
                <input
                    autoFocus={this.props.focus}
                    ref="input"
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

