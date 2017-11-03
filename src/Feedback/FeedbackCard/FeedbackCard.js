import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ERRORS, INFOS, SUCCESS_MSGS, WARNINGS } from '../card-types';

const PROPERTY_TYPES = {
    onHide: PropTypes.func,
    message: PropTypes.shape({
        text: PropTypes.string.isRequired,
        type: PropTypes.oneOf([ERRORS, INFOS, SUCCESS_MSGS, WARNINGS]).isRequired
    }).isRequired
};
const DEFAULT_PROPS = {};

class FeedbackCard extends React.Component {
    constructor(props) {
        super(props);
    }

    hide() {
        this.props.onHide(this.props.message);
    }

    getTitle(type) {
        switch (type) {
            case ERRORS:
                return 'Error';
            case SUCCESS_MSGS:
                return 'Success';
            case WARNINGS:
                return 'Warning';
            case INFOS:
                return 'Info';
        }
    }

    render() {
        let className = classNames(this.props.className, 'card', {
            'card--success': SUCCESS_MSGS === this.props.message.type,
            'card--error': ERRORS === this.props.message.type,
            'card--warning': WARNINGS === this.props.message.type,
            'card--info': INFOS === this.props.message.type
        });
        return (
            <div className={className}>
                <div className="card__content">
                    <i className="im card__icon" />
                    <div className="card-message">
                        <div className="card-message__title">{this.getTitle(this.props.message.type)}</div>
                        <div className="card-message__description">
                            <span dangerouslySetInnerHTML={{ __html: this.props.message.text }} />
                        </div>
                        <i onClick={e => this.hide()} className="im icon-close close-message" />
                    </div>
                </div>
            </div>
        );
    }
}

FeedbackCard.propTypes = PROPERTY_TYPES;
FeedbackCard.defaultProps = DEFAULT_PROPS;

export default FeedbackCard;
