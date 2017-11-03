import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Input from '../Input/Input';
import * as sizes from '../util/constant/sizes';

const LEFT = 'left';
const RIGHT = 'right';

const PROPERTY_TYPES = {
    iconClassName: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    onKeyPress: PropTypes.func,
    onKeyDown: PropTypes.func,
    position: PropTypes.oneOf([LEFT, RIGHT]),
    readOnly: PropTypes.bool,
    fluid: PropTypes.bool,
    placeholder: PropTypes.string,
    inputRef: PropTypes.func,
    size: sizes.anySize,
    value: PropTypes.string
};

const DEFAULT_PROPS = {
    position: LEFT,
    readOnly: false,
    fluid: false,
    size: sizes.NORMAL
};

class IconInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            focused: false
        };
    }

    render() {
        let className = cn('icon-input', this.props.className, {
            'icon-input--left': this.props.position === LEFT,
            'icon-input--right': this.props.position === RIGHT,
            'icon-input--fluid': this.props.fluid,
            'icon-input--focused': this.state.focused
        });

        let iconClassName = cn(this.props.iconClassName, {
            'icon--xs': true //TODO ???
        });

        return (
            <div className={className} onClick={this.props.onClick}>
                <Input
                    {...this.props}
                    type="text"
                    value={this.props.value}
                    onChange={this.props.onChange}
                    onKeyPress={this.props.onKeyPress}
                    onKeyDown={this.props.onKeyDown}
                    readOnly={this.props.readOnly}
                    fluid={this.props.fluid}
                    placeholder={this.props.placeholder}
                    size={this.props.size}
                    onFocus={() => this.setState({ focused: true })}
                    onBlur={() => this.setState({ focused: false })}
                />
                <i className={iconClassName} />
            </div>
        );
    }
}

IconInput.propTypes = PROPERTY_TYPES;
IconInput.defaultProps = DEFAULT_PROPS;

export default IconInput;
