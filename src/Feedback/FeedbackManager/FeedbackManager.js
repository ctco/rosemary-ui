import React from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import FeedbackCard from '../FeedbackCard/FeedbackCard';
import { isInArray } from '../../util/utils';
import { ERRORS, INFOS, SUCCESS_MSGS, WARNINGS } from '../card-types';

const PROPERTY_TYPES = {
    messages: PropTypes.shape({
        errors: PropTypes.array,
        infos: PropTypes.array,
        successMsgs: PropTypes.array,
        warnings: PropTypes.array
    }),
    onHide: PropTypes.func
};
const DEFAULT_PROPS = {
    messages: {
        errors: [],
        infos: [],
        successMsgs: [],
        warnings: []
    }
};

class FeedbackManager extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: []
        };
    }

    componentWillReceiveProps(props) {
        this.setState({
            messages: this.getMessages(props.messages)
        });
    }

    getMessages(messages) {
        const result = [];
        Object.keys(messages).forEach(key => {
            if (!isInArray(key, [ERRORS, SUCCESS_MSGS, INFOS, WARNINGS])) {
                return;
            }
            return messages[key].forEach(messageObj => {
                messageObj.text = messageObj.localizedMessage;
                messageObj.type = key;

                result.push(messageObj);
            });
        });

        return result;
    }

    componentDidMount() {
        const messages = this.getMessages(this.props.messages);
        this.setState({
            messages
        });
    }

    hide(removedCard) {
        if (this.props.onHide) {
            this.props.onHide(removedCard);
        } else {
            const messages = this.state.messages.filter(card => {
                return card.type !== removedCard.type || card.text !== removedCard.text;
            });

            this.setState({
                messages
            });
        }
    }

    getFeedbackCard(card) {
        return (
            <FeedbackCard
                onHide={removedCard => this.hide(removedCard)}
                key={`${card.type}_${card.text}`}
                message={card}
            />
        );
    }

    getCards() {
        return this.state.messages.map(card => {
            return this.getFeedbackCard(card);
        });
    }

    render() {
        return (
            <div className="feedback">
                <ReactCSSTransitionGroup
                    transitionEnter={true}
                    transitionLeave={true}
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}
                    transitionName={'card'}
                >
                    {this.getCards()}
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}

FeedbackManager.propTypes = PROPERTY_TYPES;
FeedbackManager.defaultProps = DEFAULT_PROPS;

export default FeedbackManager;
