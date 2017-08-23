import React from 'react';
import ReactDOM from 'react-dom';
import isUndefined from 'lodash/isUndefined';
import noop from 'lodash/noop';
import lowerCase from 'lodash/lowerCase';
import find from 'lodash/find';
import cn from 'classnames';

import {compare} from '../../../util/utils';
import Popup from '../../Popup';
import GroupedMultiSelectContent from './GroupedMultiSelectContent';
import GroupSubSection from './GroupSubSection';

const PROP_TYPES = {
    onChange: React.PropTypes.func,
    showSubSection: React.PropTypes.bool,
    placeholder: React.PropTypes.string,
    value: React.PropTypes.object,
    options: React.PropTypes.object,
    keys: React.PropTypes.arrayOf(React.PropTypes.string),
    extra: React.PropTypes.func,
    subSection: React.PropTypes.any,
    onGoBack: React.PropTypes.func,
    onPopupStateChange: React.PropTypes.func
};

const DEF_PROPS = {
    autoFocus: true,
    onPopupStateChange: noop,
    onChange: noop,
    extra: noop
};

class GroupedMultiSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showSubSection: false,
            popupOpen: false,
            tooltipOpen: false
        };
        this._sortSelectedOnTop = null;
    }

    _getSelectedValues() {
        if (this._isControlled()) {
            return this.props.value;
        }
        return this.state.selected;
    }

    _getSelectedOption(id, key) {
        return find(this.props.options[key], ['id', id]) || {};
    }

    _getSelectedValuesByKey(key) {
        return this._getSelectedValues()[key] || [];
    }

    _isSubSectionControlled = () => {
        return isUndefined(this.props.subSection);
    };

    _isSelectedEmpty() {
        return !Object.keys(this._getSelectedValues()).some((key) => {
            return this._getSelectedValuesByKey(key).length > 0;
        });
    }

    _isControlled() {
        return !isUndefined(this.props.value);
    }

    _showSubSection() {
        return this.props.showSubSection || this.state.showSubSection;
    }

    _goBack = () => {
        if (this._isSubSectionControlled()) {
            this.props.onGoBack();
        } else {
            this.setState({
                showSubSection: false
            });
        }
    };

    _defaultTemplate = (name, count) => {
        return `${name} (${count})`;
    };

    _onPopupStateChange = (open) => {
        this.setState({
            popupOpen: open,
            tooltipOpen: false
        });

        if (open) {
            if (!this.props.showSubSection) {
                this._sortSelectedOnTop();
            }
            this._onPopupOpening();
        }

        this.props.onPopupStateChange(open);
    };

    _onTooltipStateChange = (open) => {
        if (!this.state.popupOpen && !this._isSelectedEmpty()) {
            this.setState({tooltipOpen: open});
        }
    };

    _onPopupOpening = () => {
        const popupContent = ReactDOM.findDOMNode(this._popup.getContent());
        const input = ReactDOM.findDOMNode(this._input);
        popupContent.style.width = `${input.offsetWidth}px`;
    };

    _onChange = (values) => {
        if (this._isControlled()) {
            this.props.onChange(values);
        } else {
            this.setState({
                selected: values
            });
            this.props.onChange(values);
        }
    };

    _bindChildMethods = (sortSelectedOnTop) => {
        this._sortSelectedOnTop = sortSelectedOnTop;
    };

    _renderDefaultView() {
        return (
            <GroupedMultiSelectContent
                {...this.props}
                bindChildMethods={this._bindChildMethods}
                onChange={this._onChange}
                value={this._getSelectedValues()}/>
        );
    }

    _renderSubSection() {
        if (isUndefined(this.props.showSubSection)) {
            throw new Error('Subsection should be provided as property');
        }
        return (
            <GroupSubSection goBack={this._goBack}>
                {this.props.subSection}
            </GroupSubSection>
        );
    }

    _renderTooltip = (selected) => {
        let empty = true;
        const result = [];
        Object.keys(selected).forEach((key) => {
            const len = selected[key].length;
            if (len !== 0) {
                empty = false;
                result.push(this._defaultTemplate(key, selected[key].length));
            }
        });
        if (empty) {
            return this.props.placeholder;
        }
        return result.join(',');
    };

    _renderSelectedValues() {
        return (
            <div>
                {this.props.keys.map((key) => {
                    return this._getSelectedValuesByKey(key)
                        .map((id) => {
                            return this._getSelectedOption(id, key).displayString;
                        })
                        .sort((l, r) => compare(lowerCase(l), lowerCase(r)))
                        .map((option, index) => {
                            return (
                                <div key={`${key}-${index}`}>
                                    {option}
                                </div>
                            );
                        });
                })}
            </div>
        );
    }

    render() {
        let className = cn(this.props.className, 'select__popover');
        return (
            <Popup ref={(popup) => this._popup = popup}
                   attachment="bottom left" on="click"
                   popupClassName={className}
                   open={this.state.popupOpen}
                   animationBaseName="select__popover--animation-slide-y"
                   onPopupStateChange={(open) => this._onPopupStateChange(open)}>
                <Popup attachment="bottom left"
                       open={this.state.tooltipOpen}
                       on="hover"
                       popupClassName="tooltip"
                       onPopupStateChange={this._onTooltipStateChange}
                >
                    <div
                        ref={(input) => this._input = input}
                        id={this.props.id}
                        tabIndex="0"
                        className="select select--grouped">
                        {this._renderTooltip(this._getSelectedValues())}
                        <i className="im icon-arrow-down"/>
                    </div>
                    {this._renderSelectedValues()}
                </Popup>
                {this._showSubSection() ? this._renderSubSection() : this._renderDefaultView()}
            </Popup>
        );
    }
}

GroupedMultiSelect.propTypes = PROP_TYPES;
GroupedMultiSelect.defaultProps = DEF_PROPS;

export default GroupedMultiSelect;