import React from 'react';
import classNames from 'classnames';

const PROPERTY_TYPES = {
    tabId: React.PropTypes.any,
    onEnter: React.PropTypes.func
};
const DEFAULT_PROPS = {};

class Tab extends React.Component {

    constructor(props) {
        super(props);
    }

    _onChange(e) {
        if (this.props.onEnter) {
            this.props.onEnter(() => {
                this.props.onChange(e, this.props.tabId);
            });
        } else {
            this.props.onChange(e, this.props.tabId);
        }
    }

    render() {
        let {tabId, className, selected, children} = this.props;
        const style = classNames('ros-tabs__tab', className, {
            'ros-tab--selected': selected === tabId
        });

        return (
            <div className={style} onClick={(e) => this._onChange(e)}>
                <span>{name || children}</span>
            </div>
        );
    }
}

Tab.propTypes = PROPERTY_TYPES;
Tab.defaultProps = DEFAULT_PROPS;

export default Tab;

