import * as React from 'react';
import PropTypes from 'prop-types';
import {PROPERTY_TYPES as msPropTyes} from '../MultiSelect/MultiSelect';
import noop from 'lodash/noop';
import CheckBox from '../CheckBox';
import PopupWithControl from "../Popup/PopupWithControl";
import {SelectLabelInput, MultiSelectInput} from "../Select/SelectInput";
import {MultiTreeSelectContent, SingleTreeSelectContent} from "./TreeSelectContent";

const TREE_PROPS = {
    ...msPropTyes,
    hashLength: PropTypes.number.isRequired,
    renderHeader: PropTypes.func,
    footer: PropTypes.node,
    testId: PropTypes.string
};

export class TreeSelect extends React.Component {
    static propTypes = {
        ...TREE_PROPS,
    };

    static defaultProps = {
        onChange: noop
    };

    state = {
        popupOpen: false,
        tooltipOpen: false
    };

    constructor(...r) {
        super(...r);
        this.state.value = this.props.value || [];
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value && this.state.value !== nextProps.value) {
            this.setState({ value: nextProps.value });
        }
    }

    doChange = value => {
        this.setState({ value }, this.sync);
    };

    sync = () => {
        this.props.onChange(this.state.value);
    };

    render() {
        return (
            <PopupWithControl
                popupOpen={this.state.popupOpen}
                handlePopupStateChange={this.handlePopupStateChange}
                attachment="bottom left"
                popupClassName="select__popover"
                animationBaseName="select__popover--animation-slide-y"
                renderInput={this.renderInput}
                renderPopup={this.renderPopup}
                testId={this.props.testId}
            />
        );
    }

    handlePopupStateChange = (open) => {
        this.setState(prevState => ({
            popupOpen: open,
            tooltipOpen: open ? false: prevState.tooltipOpen
        }));
    };

    handleTooltipStateChange = (open) => {
        this.setState(prevState => ({
            tooltipOpen: prevState.popupOpen ? false : open
        }))
    };

    renderInput = (inputRef) => (
        <MultiSelectInput
            className={this.props.className}
            value={this.props.options.filter(option => this.state.value.find(val => val === option.id))}
            dislabed={this.props.disabled}
            tooltipOpen={this.state.tooltipOpen}
            handleTooltipStateChange={this.handleTooltipStateChange}
            testId={this.props.testId}
            inputRef={inputRef}
        />
    );

    renderPopup = () => (
        <MultiTreeSelectContent
            hashLength={this.props.hashLength}
            value={this.state.value}
            options={this.props.options}
            onChange={this.doChange}
            footer={this.props.footer}
            highlightBroken={this.props.highlightBroken}
        />
    )
}

export class TreeWithInactiveSwitch extends React.Component {
    static propTypes = {
        ...TREE_PROPS,
        label: PropTypes.node
    };

    static defaultProps = {
        label: 'Display inactive',
        onChange: noop
    };

    state = {
        showInactive: false,
        value: []
    };

    constructor(...r) {
        super(...r);
        this.state.value = this.props.value;
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.value !== nextProps.value) {
            this.setState({ value: nextProps.value });
        }
    }

    setVisibility = value => {
        this.setState(prevState => ({
            showInactive: value,
            value: value ? prevState.value : prevState.value.filter(prevValue => {
                const option = this.props.options.find(option => option.id === prevValue);
                return option && option.active;
            })
        }));

    };

    doChange = value => {
        this.setState({ value }, this.sync);
    };

    sync = () => {
        this.props.onChange(this.state.value);
    };

    render() {
        return (
            <TreeSelect
                {...this.props}
                options={this.props.options.filter(o => this.state.showInactive || o.active)}
                value={this.state.value}
                onChange={this.doChange}
                footer={
                    <CheckBox onChange={this.setVisibility} value={this.state.showInactive} label={this.props.label} />
                }
                highlightBroken={this.props.highlightBroken}
            />
        );
    }
}

export class SingleTreeSelect extends React.Component {
    static propTypes = {
        ...TREE_PROPS,
        label: PropTypes.string,
        popupWidth: PropTypes.number,
        attachment: PropTypes.string,
        popupClassName: PropTypes.string,
        onPopupStateChange: PropTypes.func
    };

    static defaultProps = {
        onChange: noop,
        popupWidth: 600,
        attachment: 'bottom right',
        popupClassName: 'tree-select__popup popover'
    };

    state = {
        popupOpen: false
    };

    doChange = value => {
        this.setState({
            popupOpen: false
        });

        this.props.onChange(value);
    };

    render() {
        return (
            <PopupWithControl
                popupOpen={this.state.popupOpen}
                handlePopupStateChange={this.handlePopupStateChange}
                popupWidth={this.props.popupWidth}
                attachment={this.props.attachment}
                popupClassName={this.props.popupClassName}
                renderInput={this.renderInput}
                renderPopup={this.renderPopup}
                testId={this.props.testId}
            />
        );
    }

    handlePopupStateChange = (open) => {
        this.setState({popupOpen: open});

        if (this.props.onPopupStateChange) {
            this.props.onPopupStateChange(open);
        }
    };

    renderInput = (inputRef) => (
        <SelectLabelInput text={this.props.label} testId={this.props.testId} inputRef={inputRef}  />
    );

    renderPopup = () => (
        <SingleTreeSelectContent
            hashLength={this.props.hashLength}
            value={this.props.value}
            options={this.props.options}
            onChange={this.doChange}
            footer={this.props.footer}
            highlightBroken={this.props.highlightBroken}
        />
    )
}
