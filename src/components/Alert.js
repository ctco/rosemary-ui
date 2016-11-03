import React, {PropTypes} from 'react';
import classNames from 'classnames';

const Types = {
    SUCCESS: 'success',
    DANGER: 'danger',
    INFO: 'info',
    WARNING: 'warning'
};

const PROPERTY_TYPES = {
    extra:React.PropTypes.any,
    type: React.PropTypes.oneOf([
        Types.SUCCESS,
        Types.WARNING,
        Types.DANGER,
        Types.INFO
    ])
};
const DEFAULT_PROPS = {};

class Alert extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let style = classNames(this.props.className, 'ros-alert', {
            'ros-alert--success': this.props.type === Types.SUCCESS,
            'ros-alert--danger': this.props.type === Types.DANGER,
            'ros-alert--info': this.props.type === Types.INFO,
            'ros-alert--warning': this.props.type === Types.WARNING
        });

        return (
            <div className={style}>
                <div className="ros-alert__title">{this.props.title}</div>
                <div className="ros-alert__description">{this.props.description}</div>
                <div className="ros-alert__extra">{this.props.extra}</div>
            </div>
        );
    }
}

Alert.propTypes = PROPERTY_TYPES;
Alert.defaultProps = DEFAULT_PROPS;

export const AlertType = Types;
export default Alert;
