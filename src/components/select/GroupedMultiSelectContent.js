import React from 'react';
import find from 'lodash/find';
import SelectionList from './SelectionList';
import IconInput from '../IconInput';
import {contains, findIdentifiables} from '../../util/utils';

const PROP_TYPES = {
    onChange: React.PropTypes.func,
    options: React.PropTypes.object.isRequired,
    groupView: React.PropTypes.object,
    value: React.PropTypes.object
};

const DEF_PROPS = {
    groups: [],
    keys: [],
    groupView: {},
    onChange: () => {
    },
    compare: () => {
    }
};

class GroupedMultiSelectContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: GroupedMultiSelectContent.groupSelected(props.keys, props.value, props.options)
        };
    }

    componentWillMount() {
        this.setState({
            filtered: this._groupFiltered(this.props.keys, this.props.options, this._getAllSorted)
        });
    }

    static groupSelected(keys, values, options) {
        return keys.reduce((result, key) => {
            if (!result[key]) {
                result[key] = findIdentifiables(options[key], values[key]);
            } else {
                throw new Error(`Found key duplication ${key}`);
            }
            return result;
        }, {});

    }

    _groupFiltered = (keys, options, fn) => {
        return keys.reduce((result, key) => {
            if (!result[key]) {
                result[key] = fn(options[key], key);
            }
            return result;
        }, {});
    };

    _setSelectedOptions = (options, key) => {
        const selectedMerged = this._mergeSelectedOptions(options, key);
        const selected = {
            ...this.state.selected,
            [key]: selectedMerged
        };

        this.setState({
            selected
        });

        this.props.onChange(selected, key);
    };

    _isOptionSelected = ({id}, key) => {
        return !!find(this.state.selected[key], ['id', id]);
    };

    _findOptionInList = (list = [], option) => {
        return find(list, (item) => item.id === option.id);
    };

    _getAllSorted = (options, key) => {
        const result = options.slice(0);
        result.sort(this._sortSelectedOnTop(key));
        return result;
    };

    _sortSelectedOnTop = (key) => {
        return (option1, option2) => {
            const isOption1Selected = this._isOptionSelected(option1, key);
            const isOption2Selected = this._isOptionSelected(option2, key);

            if (isOption1Selected && !isOption2Selected) {
                return -1;
            } else if (isOption2Selected && !isOption1Selected) {
                return 1;
            } else {
                return this.props.compare(option1.displayString, option2.displayString);
            }
        };
    };

    _mergeSelectedOptions = (selected, key) => {
        return this.state.selected[key]
            .filter((item) => {
                const found = this._findOptionInList(this.state.filtered[key], item);
                return !found;
            })
            .concat(selected);
    };

    _onSelect = (option, key) => {
        let selected;

        if (!this._isOptionSelected(option, key)) {
            selected = [option].concat(this.state.selected[key]);
        } else {
            selected = this.state.selected[key].filter((item) => {
                return item.id !== option.id;
            });
        }

        this._setSelectedOptions(selected, key);
    };

    _onSearch = (value) => {
        const filtered = this._groupFiltered(this.props.keys, this.props.options, (options, key) => {
            let temp = options.filter((option) => {
                return contains(option.displayString, value);
            });
            temp.sort(this._sortSelectedOnTop(key));
            return temp;
        });

        this.setState({
            filtered
        });
    };

    _getHeader(key) {
        const viewConfig = this.props.groupView[key] || {};
        const Header = viewConfig.header;

        return Header ? React.createElement(Header, {
            value: this.props.value[key],
            options: this.props.options[key]
        }) : <span>{key}</span>;
    }

    render() {
        return (
            <div className="select__popup" style={{fontSize: '1.4rem'}}>
                <div className="select__search-container">
                    <IconInput
                        fluid={true}
                        placeholder={this.props.placeholder}
                        size="sm"
                        onChange={this._onSearch}
                        className="select__search"
                        iconClassName="im icon-search"/>
                </div>
                <div className="select__options">
                    {
                        this.props.keys.map((key) => {
                            return (
                                <div key={key}>
                                    {this._getHeader(key)}
                                    <hr/>
                                    <SelectionList
                                        isSelected={this._isOptionSelected}
                                        onChange={this._onSelect}
                                        value={this.state.selected[key]}
                                        options={this.state.filtered[key]}
                                        type={key}/>
                                </div>
                            );
                        })
                    }
                </div >
            </div>
        );
    }
}
GroupedMultiSelectContent.propType = PROP_TYPES;
GroupedMultiSelectContent.defaultProps = DEF_PROPS;

export default GroupedMultiSelectContent;

