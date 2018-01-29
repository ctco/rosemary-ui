import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Tab from './Tab/Tab';

const PROPERTY_TYPES = {
    onChange: PropTypes.func,
    onBeforeChange: PropTypes.func,
    selected: PropTypes.any,
    testId: PropTypes.any
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
            disabled: this.props.disabled
        });

        return (
            <div data-test-id={this.props.testId} className={style}>
                {this._renderTabs()}
            </div>
        );
    }
}

Tabs.propTypes = PROPERTY_TYPES;
Tabs.defaultProps = DEFAULT_PROPS;
Tabs.Tab = Tab;

export default Tabs;
