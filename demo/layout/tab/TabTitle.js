import React from 'react';

export default class TabTitle extends React.Component {
    render() {
        return (
            <div ref="title" className="item">
                {this.props.children}
            </div>
        );
    }

}
