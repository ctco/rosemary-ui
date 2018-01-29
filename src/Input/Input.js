import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { isDefined } from '../util/utils';
import * as sizes from '../util/constant/sizes';

const PROPERTY_TYPES = {
    disabled: PropTypes.bool,
    inputRef: PropTypes.func,
    placeholder: PropTypes.string,
    maxLength: PropTypes.number,
    type: PropTypes.oneOf(['text', 'password']),
    value: PropTypes.any,
    onBlur: PropTypes.func,
    onKeyPress: PropTypes.func,
    onKeyDown: PropTypes.func,
    onFocus: PropTypes.func,
    onChange: PropTypes.func,
    readOnly: PropTypes.bool,
    fluid: PropTypes.bool,
    autoFocus: PropTypes.bool,
    size: sizes.anySize,
    testId: PropTypes.any
};
const DEFAULT_PROPS = {
    inputRef: input => {},
    onFocus: () => {},
    type: 'text',
    maxLength: 254,
    autoFocus: false,
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
    }

    _onFocus = e => {
        e.preventDefault();
        this.props.onFocus(e);
    };

    getValue() {
        return this.state.value;
    }

    focus() {
        //hoc is using this method
        this._searchInput.focus();
    }

    update = e => {
        let value = e.target.value;
        if (!this.isControlled()) {
            this.setState({
                value
            });
        }
        if (this.props.onChange && !this.props.disabled) {
            this.props.onChange(value);
        }
    };

    isControlled() {
        return isDefined(this.props.value);
    }

    _attachInput = input => {
        this._input = input;
        this.props.inputRef(input);
    };

    render() {
        let style = cn(this.props.className, 'text-input', {
            disabled: this.props.disabled,
            'text-input--fluid': this.props.fluid,
            'text-input--sm': this.props.size === sizes.SMALL,
            'text-input--lg': this.props.size === sizes.LARGE
        });

        return (
            <div className={style}>
                <input
                    data-test-id={this.props.testId}
                    autoFocus={this.props.autoFocus}
                    maxLength={this.props.maxLength}
                    ref={this._attachInput}
                    readOnly={this.props.readOnly}
                    value={this.isControlled() ? this.props.value : this.state.value}
                    placeholder={this.props.placeholder}
                    onChange={e => this.update(e)}
                    onKeyPress={this.props.onKeyPress}
                    onKeyDown={this.props.onKeyDown}
                    onBlur={this.props.onBlur}
                    onFocus={this._onFocus}
                    type={this.props.type}
                    disabled={this.props.disabled}
                />
            </div>
        );
    }
}

Input.propTypes = PROPERTY_TYPES;
Input.defaultProps = DEFAULT_PROPS;

export default Input;
