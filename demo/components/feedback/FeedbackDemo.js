import DemoWithSnippet from '../../../demo/layout/DemoWithSnippet';
import {FeedbackManager} from '../../../src';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {feedbackAction, removeFeedback} from '../../actions/feedback-action';

import React from 'react';

class FeedbackDemo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <DemoWithSnippet>
                <button onClick={this.props.feedbackAction}>Test</button>
                <FeedbackManager messages={this.props.messages} onHide={this.props.removeFeedback}/>
            </DemoWithSnippet>
        );
    }
}

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({
        feedbackAction,
        removeFeedback
    }, dispatch)
);

const mapStateToProps = ({messages}) => ({
    messages
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackDemo);