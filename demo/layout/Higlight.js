import hljs from 'highlight.js';
import React from 'react';
import ReactDOM from 'react-dom';

const Highlight = React.createClass({
    getDefaultProps: function() {
        return {
            innerHTML: false,
            className: null
        };
    },
    componentDidMount: function() {
        this.highlightCode();
    },
    componentDidUpdate: function() {
        this.highlightCode();
    },
    highlightCode: function() {
        let domNode = ReactDOM.findDOMNode(this);
        let nodes = domNode.querySelectorAll('pre code');
        if (nodes.length > 0) {
            for (let i = 0; i < nodes.length; i=i+1) {
                hljs.highlightBlock(nodes[i]);
            }
        }
    },
    render: function() {
        if (this.props.innerHTML) {
            return <div dangerouslySetInnerHTML={{__html: this.props.children}} className={this.props.className || null}></div>;
        } else {
            return <pre><code className={this.props.className}>{this.props.children}</code></pre>;
        }
    }
});

export default Highlight;
