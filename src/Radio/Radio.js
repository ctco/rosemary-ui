import React, { PropTypes } from 'react';
import classNames from 'classnames';

const PROPERTY_TYPES = {
    onChange: PropTypes.func,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    checked: PropTypes.bool
};
const DEFAULT_PROPS = {};

class Radio extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange() {
        if (this.props.onChange && !this.props.disabled) {
            this.props.onChange(this.props);
        }
    }

    getRadioLabel() {
        return this.props.label ? <span className="radio-label">{this.props.label}</span> : null;
    }

    render() {
        let radioStyle = classNames({
            radio: true,
            disabled: this.props.disabled
        });
        let radioBtnStyle = classNames({
            'radio-btn': true,
            checked: this.props.checked
        });

        return (
            <div
                className={radioStyle}
                onClick={() => {
                    this.onChange();
                }}
            >
                <span className={radioBtnStyle} />
                {this.getRadioLabel()}
            </div>
        );
    }
}

Radio.propTypes = PROPERTY_TYPES;
Radio.defaultProps = DEFAULT_PROPS;

export default Radio;
