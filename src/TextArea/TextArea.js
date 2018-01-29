import { isDefined } from '../util/utils';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const PROPERTY_TYPES = {
    placeholder: PropTypes.string,
    value: PropTypes.any,
    maxLength: PropTypes.number,
    testId: PropTypes.any
};
const DEFAULT_PROPS = {};

class TextArea extends React.Component {
    constructor(props) {
        super(props);
        if (!this.isControlled()) {
            this.state = {
                value: ''
            };
        }
        this.update = this.update.bind(this);
    }

    getValue() {
        return this.refs.textarea.value;
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
        let style = classNames(this.props.className, 'textarea', {
            disabled: this.props.disabled
        });

        return (
            <div className={style}>
                <textarea
                    data-test-id={this.props.testId}
                    ref="textarea"
                    value={this.isControlled() ? this.props.value : this.state.value}
                    onChange={e => this.update(e)}
                    placeholder={this.props.placeholder}
                    onBlur={this.props.onBlur}
                    maxLength={this.props.maxLength}
                />
            </div>
        );
    }
}

TextArea.propTypes = PROPERTY_TYPES;
TextArea.defaultProps = DEFAULT_PROPS;

export default TextArea;
