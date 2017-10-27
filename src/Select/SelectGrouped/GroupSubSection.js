import React from 'react';

class GroupSubSection extends React.Component {
    _handleCallback = (onSave, onBack) => {
        this._onSaveChild = onSave;
        this._onBackChild = onBack;
    };

    _onSave = () => {
        if (this._onSaveChild) {
            this._onSaveChild(this.props.goBack);
        }
    };

    _goBack = () => {
        if (this._onBackChild) {
            this._onBackChild(this.props.goBack);
        }
    };

    render() {
        return (
            <div className="ros-group-subs">
                <div className="ros-group-subs__header-wrap">
                    <div className="ros-group-subs__header">
                        <span className="ros-group-subs__control ros-group-subs__back" onClick={this._goBack}>
                            &#8592; Back&nbsp;
                        </span>
                        <span className="ros-group-subs__control ros-group-subs__save" onClick={this._onSave}>
                            &nbsp; Save
                        </span>
                    </div>
                    <br />
                </div>
                {React.createElement(this.props.children, {
                    methodCallback: this._handleCallback,
                    ref: child => (this._child = child)
                })}
            </div>
        );
    }
}

export default GroupSubSection;
