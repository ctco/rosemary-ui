require('highlight.js/styles/darkula.css');

import React, {Component} from 'react';
import jsxToString from 'jsx-to-string';
import classNames from 'classnames';

import Highlight from './Higlight';

class DemoWithSnippet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    toggle() {
        if (this.state.open) {
            this.setState({open: false});
        } else {
            this.setState({open: true});
        }
    }

    renderCode() {
        return React.Children.map(this.props.children, (child) => {
            return (
                <Highlight className="html">
                    {jsxToString(child)}
                </Highlight>
            );
        });
    }

    render() {
        let sourceStyle = classNames(this.props.className, {
            'hidden': !this.state.open
        });

        return (
            <div className="demo" {...this.props}>
                {this.props.children}
                <div className="demo__show-source" onClick={() => {this.toggle();}}>
                    <i className="im icon-arrow-left" />
                    <i className="im icon-arrow-right" />
                </div>
                <div className={sourceStyle}>
                    {this.renderCode()}
                </div>
            </div>
        );
    }
}

export default DemoWithSnippet;
