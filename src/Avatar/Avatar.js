import React from 'react';
import PropTypes from 'prop-types';

const PROPERTY_TYPES = {
    text: PropTypes.string,
    avatarImgUrl: PropTypes.string,
    testId: PropTypes.any
};

class Avatar extends React.Component {
    render() {
        return (
            <div data-test-id={this.props.testId} className="avatar">
                {this.props.avatarImgUrl ? (
                    <img className="avatar__img" src={this.props.avatarImgUrl} />
                ) : (
                    this.props.text
                )}
            </div>
        );
    }
}

Avatar.propTypes = PROPERTY_TYPES;

export default Avatar;
