import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import values from 'lodash/values';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Card from '../FeedbackCard';
import types from '../types';

const allowedTypes = values(types);

class FeedbackManager extends React.Component {
    static propTypes = {
        onCloseMessage: PropTypes.func,
        messages: PropTypes.arrayOf(
            PropTypes.shape({
                text: PropTypes.string,
                type: PropTypes.oneOf(allowedTypes)
            })
        ),
        testId: PropTypes.any
    };

    static defaultProps = {
        onCloseMessage: noop
    };

    render() {
        return (
            <div data-test-id={this.props.testId} className="feedback">
                <ReactCSSTransitionGroup
                    transitionEnter={true}
                    transitionLeave={true}
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}
                    transitionName={'card'}
                >
                    {this._renderCards()}
                </ReactCSSTransitionGroup>
            </div>
        );
    }

    _renderCards = () => {
        return this.props.messages.map(message => {
            return (
                <Card
                    key={message.id}
                    id={message.id}
                    text={message.text}
                    title={message.title}
                    type={message.type}
                    onClose={this.props.onCloseMessage}
                />
            );
        });
    };
}

export default FeedbackManager;
