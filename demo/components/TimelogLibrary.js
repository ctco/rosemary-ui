import React from 'react';
import MenuBar from './MenuBar';

export default class TimelogLibrary extends React.Component {
    render() {
        return (
            <div className="ui grid">
                <MenuBar/>
                <div className="content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
