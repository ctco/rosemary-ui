import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { isDefined } from '../util/utils';

const PROPERTY_TYPES = {
    disabled: PropTypes.bool,
    label: PropTypes.string,
    defaultValue: PropTypes.bool,
    value: PropTypes.bool,
    onChange: PropTypes.func,
    testId: PropTypes.any
};
const DEFAULT_PROPS = {
    disabled: false,
    defaultValue: false,
    label: ''
};

class CheckBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: isDefined(props.value) ? props.value : props.defaultValue
        };
        this.onClickCheckBox = this.onClickCheckBox.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (isDefined(nextProps.value)) {
            this.setState({
                value: nextProps.value
            });
        }
    }

    onClickCheckBox(event) {
        if (!this.props.disabled) {
            if (isDefined(this.props.value)) {
                this.onChange(!this.state.value);
            } else {
                this.setState({ value: !this.state.value }, () => {
                    this.onChange(this.state.value);
                });
            }
        }
    }

    onChange(value) {
        if (this.props.onChange) {
            this.props.onChange(value);
        }
    }

    render() {
        let style = classNames(this.props.className, {
            checkbox: true,
            disabled: this.props.disabled,
            checked: this.state.value
        });

        return (
            <div
                data-test-id={this.props.testId}
                data-test-checked={this.state.value}
                tabIndex="1"
                onClick={e => this.onClickCheckBox(e)}
                className={style}
            >
                <i className="im icon-ok" />
                {this.props.label ? <label className="checkbox-label">{this.props.label}</label> : null}
            </div>
        );
    }
}

CheckBox.propTypes = PROPERTY_TYPES;
CheckBox.defaultProps = DEFAULT_PROPS;

export default CheckBox;
