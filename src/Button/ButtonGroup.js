import React from 'react';
import classNames from 'classnames';

export default class ButtonGroup extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <div className="btn--grouped">{this.props.children}</div>;
    }
}
