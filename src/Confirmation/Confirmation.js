import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '../Button/Button';

const PROPERTY_TYPES = {
    body: PropTypes.string,
    title: PropTypes.string,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    confirmBtnTxt: PropTypes.string,
    cancelBtnText: PropTypes.string
};
const DEFAULT_PROPS = {
    cancelBtnText: 'Cancel',
    confirmBtnText: 'Confirm',
    onCancel: () => {},
    onConfirm: () => {}
};

class Confirmation extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let style = classNames(this.props.className, 'ros-confirm');

        return (
            <div className={style}>
                <h2 className="ros-confirm__title">{this.props.title}</h2>
                <div className="ros-confirm__body">{this.props.body}</div>
                <div className="form-separator" />
                <div className="form-btn-group">
                    <Button className="btn btn--primary" onClick={() => this.props.onConfirm()}>
                        {this.props.confirmBtnText}
                    </Button>
                    <Button className="btn-link btn--m" onClick={() => this.props.onCancel()}>
                        {this.props.cancelBtnText}
                    </Button>
                </div>
            </div>
        );
    }
}

Confirmation.propTypes = PROPERTY_TYPES;
Confirmation.defaultProps = DEFAULT_PROPS;

export default Confirmation;
