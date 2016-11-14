import React from 'react';
import classNames from 'classnames';

const Tab = (props) => {
    let {tabId, onChange, className, selected} = props;
    const style = classNames('ros-tabs__tab', className, {
        'ros-tab--selected': selected === tabId
    });

    return (
        <div onClick={(e) => onChange(e, tabId)} className={style}>
            <span>{name || props.children}</span>
        </div>
    );
};

export default Tab;
