import React from 'react';
import Button from '../Button';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Popup from "../Popup";

export class Label extends React.Component {
    static propTypes = {
        text: PropTypes.string,
        testId: PropTypes.string,
        inputRef: PropTypes.func,
        onClick: PropTypes.func
    };

    render() {
        const {text, testId, inputRef, onClick} = this.props;

        return (
            <Button
                onClick={onClick}
                testId={testId}
                ref={inputRef}
                className="btn-link btn-m btn"
                value={text}
            />
        )
    }
}

export class MultiSelectInput extends React.Component {
    static propTypes = {
        value: PropTypes.array,
        id: PropTypes.any,
        inputRef: PropTypes.func,
        className: PropTypes.string,
        placeholder: PropTypes.string,
        testId: PropTypes.string,
        getText: PropTypes.func,
        dislabed: PropTypes.bool,

        tooltipOpen: PropTypes.bool,
        handleTooltipStateChange: PropTypes.func,
        onClick: PropTypes.func
    };

    static defaultProps = {
        placeholder: 'Select...',
        getText: selectedOptions => `${selectedOptions.length} item(s) selected`
    };

    render() {
        const {onClick, value, id, inputRef, testId, tooltipOpen} = this.props;

        const className = classNames(this.props.className, 'select', {
            placeholder: value.length === 0,
            disabled: this.props.disabled
        });

        return (
            <Popup
                attachment="bottom left"
                on="hover"
                popupClassName="tooltip"
                open={tooltipOpen}
                onPopupStateChange={this.handleTooltipStateChange}
                onClick={onClick}
            >
                <div id={id} ref={inputRef} tabIndex="0" className={className} data-test-id={testId}>
                    <div>{this.getText()}</div>
                    <i className="im icon-arrow-down" />
                </div>
                <div>
                    {value.map(option => {
                        return <div key={`tooltip-${option.id}`}>{option.displayString}</div>;
                    })}
                </div>
            </Popup>
        )
    }

    getText() {
        if (this.props.value.length === 0) {
            return this.props.placeholder;
        } else {
            return this.props.getText(this.props.value);
        }
    }

    handleTooltipStateChange = (open) => {
        if (this.props.value.length > 0) {
            this.props.handleTooltipStateChange(open);
        } else {
            this.props.handleTooltipStateChange(false);
        }
    }
}