import isUndefined from 'lodash/isUndefined';
import React from 'react';
import cn from 'classnames';

const PROP_TYPES = {
    disable: React.PropTypes.bool,
    checked: React.PropTypes.bool,
    title: React.PropTypes.string
};

const DEFAULT_PROPS = {
    disabled: false,
    onChange: () => {
    }
};

class Switch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: this.props.checked
        };
    }

    _isControlled() {
        return !isUndefined(this.props.checked);
    }

    _handleOnChange = (event) => {
        if (this.props.disabled) {
            return;
        }
        if (this._isControlled()) {
            this.props.onChange(this.props.checked, event);
        } else {
            this.setState((prevState, props) => ({
                checked: !this.state.checked
            }), () => {
                this.props.onChange(this.state.checked, event)
            });
        }
    };

    _isChecked() {
        return this._isControlled() ? this.props.checked : this.state.checked;
    }

    render() {
        const classNames = cn('ros-switch', {
            'disabled': this.props.disabled,
            'checked': this._isChecked()
        });

        return (
            <div onClick={this._handleOnChange} className={classNames}>
                <span className="ros-switch__control">
                     <i />
                </span>
                <label className="ros-switch__title">Test</label>
            </div>
        );
    }
}

Switch.propTypes = PROP_TYPES;
Switch.defaultProps = DEFAULT_PROPS;

export default Switch;