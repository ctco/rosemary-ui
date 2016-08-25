import '../assets/scss/components/_avatar.scss';

import React, {PropTypes} from 'react';

const PROPERTY_TYPES = {
    text: React.PropTypes.string
};
const DEFAULT_PROPS = {
};

class Avatar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="avatar">
                {this.props.text}
            </div>
        );
    }
}

Avatar.propTypes = PROPERTY_TYPES;
Avatar.defaultProps = DEFAULT_PROPS;

export default Avatar;