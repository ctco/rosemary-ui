import React, {PropTypes} from 'react';
import cn from 'classnames';
import Input from './Input';
import * as sizes from '../constant/sizes';

const LEFT = 'left';
const RIGHT = 'right';

const PROPERTY_TYPES = {
    iconClassName: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func,
    onClick: React.PropTypes.func,
    onKeyPress: React.PropTypes.func,
    onKeyDown: React.PropTypes.func,
    position: React.PropTypes.oneOf([LEFT, RIGHT]),
    readOnly: React.PropTypes.bool,
    fluid: React.PropTypes.bool,
    placeholder: React.PropTypes.string,
    size: sizes.anySize,
    value: React.PropTypes.string
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

    focus() {
        this.refs.input.focus();
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
                <Input ref="input"
                       type="text"
                       value={this.props.value}
                       onChange={this.props.onChange}
                       onKeyPress={this.props.onKeyPress}
                       onKeyDown={this.props.onKeyDown}
                       readOnly={this.props.readOnly}
                       fluid={this.props.fluid}
                       placeholder={this.props.placeholder}
                       size={this.props.size}
                       onFocus={() => this.setState({focused: true})}
                       onBlur={() => this.setState({focused: false})}
                />
                <i className={iconClassName}/>
            </div>
        );
    }
}

IconInput.propTypes = PROPERTY_TYPES;
IconInput.defaultProps = DEFAULT_PROPS;

export default IconInput;