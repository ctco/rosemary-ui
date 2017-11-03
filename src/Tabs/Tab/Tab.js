import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const PROPERTY_TYPES = {
    tabId: PropTypes.any,
    value: PropTypes.string,
    onEnter: PropTypes.func,
    onChange: PropTypes.func
};
const DEFAULT_PROPS = {};

class Tab extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        if (this._isSelected() && this.props.onEnter) {
            this.props.onEnter();
        }
    }

    _isSelected() {
        return this.props.selected === this.props.tabId;
    }

    _onChange() {
        this.props.onChange(this.props.tabId);
    }

    render() {
        let { className, children, value } = this.props;
        const style = classNames('ros-tabs__tab', className, {
            'ros-tab--selected': this._isSelected()
        });

        return (
            <div className={style} onClick={() => this._onChange()}>
                <span>{value || children}</span>
            </div>
        );
    }
}

Tab.propTypes = PROPERTY_TYPES;
Tab.defaultProps = DEFAULT_PROPS;

export default Tab;
