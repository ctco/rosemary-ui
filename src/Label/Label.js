import React from 'react';

const PROPERTY_TYPES = {
    placeholder: React.PropTypes.string,
    type: React.PropTypes.oneOf(['text', 'password'])
};
const DEFAULT_PROPS = {
    type: 'text'
};

class Label extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="label">Default label</div>;
    }
}

Label.propTypes = PROPERTY_TYPES;
Label.defaultProps = DEFAULT_PROPS;

export default Label;
