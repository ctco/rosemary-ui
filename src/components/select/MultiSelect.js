import '../../assets/scss/components/_select.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import find from 'lodash/find';

import Popup from '../Popup';
import {isDefined, contains, findIdentifiables} from '../../util/utils';
import Input from '../Input';
import CheckBoxList from './CheckBoxList';

const PROPERTY_TYPES = {
    placeholder: React.PropTypes.string,
    searchPlaceholder: React.PropTypes.string,
    options: React.PropTypes.arrayOf(React.PropTypes.shape({
        id: React.PropTypes.number.isRequired,
        displayString: React.PropTypes.string.isRequired
    })),
    className: React.PropTypes.string,
    onChange: React.PropTypes.func,
    getText: React.PropTypes.func,
    inputProps: React.PropTypes.object,
    tooltipProps: React.PropTypes.object
};
const DEFAULT_PROPS = {
    placeholder: 'Select...',
    searchPlaceholder: 'Search ...',
    getText: (selectedOptions) => `${selectedOptions.length} item(s) selected`
};

class MultiSelect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: findIdentifiables(this.props.options, props.value),
            popupOpen: false,
            tooltipOpen: false,
            filtered: props.options
        };

        this.sortSelectedOnTop = this.sortSelectedOnTop.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        let isValueChanged = nextProps.value !== this.props.value;
        if (isValueChanged) {
            this.setState({selected: findIdentifiables(nextProps.options, nextProps.value)});
        }
    }

    isSelected(option) {
        return find(this.state.selected, (selected) => {
            if (option.id === selected.id) {
                return true;
            }
        });
    }

    select(selected) {
        if (!this.isControlled()) {
            this.setState({
                selected
            });
        }

        if (this.props.onChange) {
            this.props.onChange(selected.map((option) => {return option.id;}), selected);
        }
    }

    handlePopupStateChange(open) {
        let newState = {
            popupOpen: open,
            tooltipOpen: false
        };

        if (open) {
            newState.filtered = this.getAllSorted();
        }

        this.setState(newState);
        if (open) {
            this.handlePopupOpening();
        }
    }

    getAllSorted() {
        let result = this.props.options.slice(0);
        result.sort(this.sortSelectedOnTop);
        return result;
    }

    sortSelectedOnTop(option1, option2) {
        let isOption1Selected = this.isSelected(option1);
        let isOption2Selected = this.isSelected(option2);

        if (isOption1Selected && !isOption2Selected) {
            return -1;
        } else if (isOption2Selected && !isOption1Selected) {
            return 1;
        } else {
            return option1.displayString.localeCompare(option2.displayString);
        }
    }

    handleTooltipStateChange(open) {
        if (!this.state.popupOpen && this.state.selected.length > 0) {
            this.setState({tooltipOpen: open});
        }
    }

    isControlled() {
        return isDefined(this.props.value);
    }

    handlePopupOpening() {
        let popupContent = ReactDOM.findDOMNode(this.refs.popup.getContent());
        let input = ReactDOM.findDOMNode(this.refs.input);
        popupContent.style.width = `${input.offsetWidth}px`;
    }

    getText() {
        if (this.state.selected.length === 0) {
            return this.props.placeholder;
        } else {
            return this.props.getText(this.state.selected);
        }
    }

    applySearch(value) {
        let filtered = this.props.options.slice(0).filter((option) => {
            return contains(option.displayString, value);
        });

        filtered.sort(this.sortSelectedOnTop);

        this.setState({
            filtered: filtered
        });
    }

    render() {
        let className = classNames(this.props.className, 'select', {
            'placeholder': this.state.selected.length === 0
        });

        return (
            <Popup ref="popup"
                   attachment="bottom left" on="click"
                   popupClassName="select__popover"
                   animationBaseName="select__popover--animation-slide-y"
                   open={this.state.popupOpen}
                   onPopupStateChange={(open) => this.handlePopupStateChange(open)}>

                <Popup attachment="bottom left"
                       on="hover"
                       popupClassName="tooltip"
                       open={this.state.tooltipOpen}
                       onPopupStateChange={(open) => this.handleTooltipStateChange(open)}
                    >
                    <div {...this.props.inputProps} ref="input" tabIndex="0" className={className}>
                        <div>{this.getText()}</div>
                        <i className="im select__icon"/>
                    </div>
                    <div {...this.props.tooltipProps}>
                        {this.state.selected.map((option) => {
                            return (
                                <div key={`tooltip-${option.id}`}>{option.displayString}</div>
                            );
                        })}
                    </div>
                </Popup>


                <div className="select__popup">
                    <div className="select__search-container">
                        <Input className="select__search text-input--sm"
                               onChange={(value) => this.applySearch(value)}
                               placeholder={this.props.searchPlaceholder}/>
                    </div>

                    <div className="select__options">
                        <CheckBoxList options={this.state.filtered}
                                      onChange={(selected) => this.select(selected)}
                                      value={this.state.selected.map((selected) => {return selected.id;})}
                            />
                    </div>


                </div>
            </Popup>
        );
    }
}

MultiSelect.propTypes = PROPERTY_TYPES;
MultiSelect.defaultProps = DEFAULT_PROPS;

export default MultiSelect;