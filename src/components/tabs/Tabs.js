import React from 'react';
import classNames from 'classnames';
import Tab from './Tab';

const PROPERTY_TYPES = {
    onChange: React.PropTypes.func,
    onBeforeChange: React.PropTypes.func,
    selected: React.PropTypes.any
};

const DEFAULT_PROPS = {};

class Tabs extends React.Component {

    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
    }

    _renderTabs() {
        return React.Children.map(this.props.children, (tab, index) => {
            return React.cloneElement(tab, {
                key: index,
                onChange: this._onChange,
                selected: this.props.selected
            });
        });
    }

    _onChange(tabId) {
        if (this.props.onBeforeChange) {
            this.props.onBeforeChange(tabId, () => {
                this.props.onChange(tabId);
            });
        } else {
            this.props.onChange(tabId);
        }
    }

    render() {
        let style = classNames('ros-tabs', this.props.className, {
            'disabled': this.props.disabled
        });

        return (
            <div className={style}>
                {this._renderTabs()}
            </div>
        );
    }
}

Tabs.propTypes = PROPERTY_TYPES;
Tabs.defaultProps = DEFAULT_PROPS;
Tabs.Tab = Tab;

export default Tabs;
