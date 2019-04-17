import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '../Button/Button';

const PROPERTY_TYPES = {
    body: PropTypes.node,
    title: PropTypes.node,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    confirmBtnTxt: PropTypes.string,
    cancelBtnText: PropTypes.string,
    testId: PropTypes.any
};
const DEFAULT_PROPS = {
    cancelBtnText: 'Cancel',
    confirmBtnText: 'Confirm',
    onCancel: () => {},
    onConfirm: () => {}
};

class Confirmation extends React.Component {
    render() {
        let style = classNames(this.props.className, 'ros-confirm');

        return (
            <div data-test-id={this.props.testId} className={style}>
                <h2 className="ros-confirm__title">{this.props.title}</h2>
                <div className="ros-confirm__body">{this.props.body}</div>
                <div className="form-separator" />
                <div className="form-btn-group">
                    <Button className="btn btn--primary"
                            testId={this.props.testId + "_confirm"}
                            onClick={this.props.onConfirm}>
                        {this.props.confirmBtnText}
                    </Button>
                    <Button className="btn-link btn--m"
                            testId={this.props.testId + "_cancel"}
                            onClick={this.props.onCancel}>
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
