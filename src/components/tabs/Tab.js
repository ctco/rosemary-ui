import React from 'react';
import classNames from 'classnames';

const PROPERTY_TYPES = {
    tabId: React.PropTypes.any,
    onEnter: React.PropTypes.func,
    onChange: React.PropTypes.func
};
const DEFAULT_PROPS = {};

class Tab extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        if (this._isSelected() && this.props.onEnter) {
            this.props.onEnter(() => {
                this._triggerChangeEvent();
            });
        }
    }

    _isSelected() {
        return this.props.selected === this.props.tabId;
    }

    _triggerChangeEvent() {
        this.props.onChange(this.props.tabId);
    }

    _onChange() {
        if (this.props.onEnter) {
            this.props.onEnter(() => {
                this._triggerChangeEvent();
            });
        } else {
            this.props.onChange(this.props.tabId);
        }
    }

    render() {
        console.log('render');
        let {className, children} = this.props;
        const style = classNames('ros-tabs__tab', className, {
            'ros-tab--selected': this._isSelected()
        });

        return (
            <div className={style} onClick={() => this._onChange()}>
                <span>{name || children}</span>
            </div>
        );
    }
}

Tab.propTypes = PROPERTY_TYPES;
Tab.defaultProps = DEFAULT_PROPS;

export default Tab;

