import React from 'react';

export default class ButtonGroup extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <div className="btn--grouped">{this.props.children}</div>;
    }
}
