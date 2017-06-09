import React from 'react';
import ReactDOM from 'react-dom';
import mapValues from 'lodash/mapValues';
import Popup from '../Popup';
import cn from 'classnames';
import GroupedMultiSelectContent from './GroupedMultiSelectContent';

const PROP_TYPES = {
    onChange: React.PropTypes.func,
    value: React.PropTypes.object,
    option: React.PropTypes.object,
    keys: React.PropTypes.arrayOf(React.PropTypes.string)
};

const DEF_PROPS = {
    onChange: () => {
    }
};

class GroupedMultiSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            popupOpen: false,
            tooltipOpen: false,
            selected: GroupedMultiSelectContent.groupSelected(props.keys, props.value, props.options)
        };
    }

    _buildTooltip = (selected) => {
        const result = [];
        Object.keys(selected).forEach((key) => {
            const len = selected[key].length;
            if (len !== 0) {
                result.push(this._defaultTemplate(key, selected[key].length));
            }
        });
        return result.join(',');
    };

    _defaultTemplate = (name, count) => {
        return `${name} (${count})`;
    };

    _onPopupStateChange = (open) => {
        let newState = {
            popupOpen: open,
            tooltipOpen: false
        };

        this.setState(newState);
        if (open) {
            this._onPopupOpening();
        }
    };

    _onPopupOpening = () => {
        const popupContent = ReactDOM.findDOMNode(this._popup.getContent());
        const input = ReactDOM.findDOMNode(this._input);
        popupContent.style.width = `${input.offsetWidth}px`;
    };

    _onChange = (values) => {
        this.setState({
            selected: values
        });

        this.props.onChange(values);
    };

    _keepOnlyIds = (options) => {
        return mapValues(options, (value) => {
            return value.map((option) => option.id);
        });
    };

    render() {
        let className = cn(this.props.className, 'select');
        return (
            <Popup ref={(popup) => this._popup = popup}
                   attachment="bottom left" on="click"
                   popupClassName="select__popover"
                   open={this.state.popupOpen}
                   animationBaseName="select__popover--animation-slide-y"
                   onPopupStateChange={(open) => this._onPopupStateChange(open)}>
                <Popup attachment="bottom left"
                       on="hover"
                       popupClassName="tooltip"
                >
                    <div
                        ref={(input) => this._input = input }
                        tabIndex="0"
                        className={className}>

                        {this._buildTooltip(this.state.selected)}

                        <i className="im icon-arrow-down"/>
                    </div>
                    <div>
                        {this.props.keys.map((key) => {
                            return this.state.selected[key].map((option, index) => {
                                return (
                                    <div key={`${key}-${index}`}>{option.displayString}</div>
                                );
                            });
                        })}
                    </div>
                </Popup>
                <GroupedMultiSelectContent
                    {...this.props}
                    onChange={this._onChange}
                    value={this._keepOnlyIds(this.state.selected)}/>
            </Popup>
        );
    }
}

GroupedMultiSelect.propTypes = PROP_TYPES;
GroupedMultiSelect.defaultProps = DEF_PROPS;

export default GroupedMultiSelect;