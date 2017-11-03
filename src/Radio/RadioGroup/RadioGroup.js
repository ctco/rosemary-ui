import Radio from '../Radio';
import React, { Children } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const PROPERTY_TYPES = {
    onChange: PropTypes.func
};
const DEFAULT_PROPS = {};

class RadioGroup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            radioList: []
        };
        this.onChange = this.onChange.bind(this);
    }

    componentWillMount() {
        let key = 0;
        let radioList = Children.map(this.props.children, child => {
            if (child.type === Radio) {
                return React.cloneElement(child, {
                    radioKey: key++,
                    onChange: this.onChange
                });
            } else {
                return child;
            }
        });

        this.setState({ radioList });
    }

    onChange({ radioKey, checked, data }) {
        if (checked) {
            return;
        }

        let newState = this.state.radioList.map(radio => {
            return React.cloneElement(radio, {
                checked: radio.props.radioKey === radioKey
            });
        });

        this.setState({ radioList: newState });

        this.props.onChange(data);
    }

    render() {
        let style = classNames(this.props.className, {
            'radio-group': true
        });
        return <div className={style}>{this.state.radioList}</div>;
    }
}

RadioGroup.propTypes = PROPERTY_TYPES;
RadioGroup.defaultProps = DEFAULT_PROPS;

export default RadioGroup;
