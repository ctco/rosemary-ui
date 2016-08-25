import '../../assets/scss/components/_select.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import find from 'lodash/find';

import Popup from '../Popup';
import {isDefined, contains} from '../../util/utils';
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
            selected: [],
            popupState: 'closed',
            tooltipState: 'closed',
            filtered: props.options
        };

        this.sortSelectedOnTop = this.sortSelectedOnTop.bind(this);
    }

    isSelected(option) {
        let found = find(this.state.selected, (selected) => {
            if (option.id === selected.id) {
                return true;
            }
        });

        if (found) {
            return true;
        } else {
            return false;
        }
    }

    select(selected) {
        if (!this.isControlled()) {
            this.setState({
                selected
            });
        }

        if (this.props.onChange) {
            this.props.onChange(selected.map((option) => {
                return option.id;
            }));
        }
    }

    handlePopupStateChange(newPopupState) {
        let isOpening = newPopupState === 'open';

        let newState = {
            popupState: newPopupState,
            tooltipState: 'closed'
        };

        if (isOpening) {
            newState.filtered = this.getAllSorted();
        }

        this.setState(newState);
        if (isOpening) {
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

    handleTooltipStateChange(newTooltipState) {
        if (this.state.popupState === 'closed' && this.state.selected.length > 0) {
            this.setState({tooltipState: newTooltipState});
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
                   popupState={this.state.popupState}
                   onPopupStateChange={(newPopupState) => this.handlePopupStateChange(newPopupState)}>

                <Popup attachment="bottom left"
                       on="hover"
                       popupClassName="tooltip"
                       popupState={this.state.tooltipState}
                       onPopupStateChange={(newTooltipState) => this.handleTooltipStateChange(newTooltipState)}
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
                                      value={this.state.selected}
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