import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import noop from 'lodash/noop';
import types from '../types';

const cardTitle = {
    [types.error]: 'Error',
    [types.success]: 'Success',
    [types.waring]: 'Warning',
    [types.info]: 'Info'
};

class FeedbackCard extends React.Component {
    static propTypes = {
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        onClose: PropTypes.func,
        text: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        testId: PropTypes.any
    };

    static defaultProps = {
        onClose: noop
    };

    render() {
        const { waring, success, error, info } = types;
        const { type } = this.props;

        let className = classNames(this.props.className, 'card', {
            'card--success': success === type,
            'card--error': error === type,
            'card--warning': waring === type,
            'card--info': info === type
        });

        return (
            <div data-test-id={this.props.testId} className={className}>
                <div className="card__content">
                    <i className="im card__icon" />
                    <div className="card-message">
                        <div className="card-message__title">{cardTitle[type]}</div>
                        <div className="card-message__description">
                            <span dangerouslySetInnerHTML={{ __html: this.props.text }} />
                        </div>
                        <i onClick={this._onClose} className="im icon-close close-message" />
                    </div>
                </div>
            </div>
        );
    }

    _onClose = e => {
        this.props.onClose(this.props.id);
    };
}

export default FeedbackCard;
