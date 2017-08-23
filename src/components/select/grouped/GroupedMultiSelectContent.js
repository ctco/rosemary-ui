import React from 'react';
import isUndefined from 'lodash/isUndefined';
import lowerCase from 'lodash/lowerCase';
import noop from 'lodash/noop';

import SelectionList from '../SelectionList';
import IconInput from '../../IconInput';
import {contains, compare} from '../../../util/utils';

const PROP_TYPES = {
    onChange: React.PropTypes.func,
    options: React.PropTypes.object.isRequired,
    groupView: React.PropTypes.shape({
        noOptionPlaceholder: React.PropTypes.element
    }),
    value: React.PropTypes.object,
    extra: React.PropTypes.func
};

const DEF_PROPS = {
    searchPlaceholder: 'Search...',
    groups: [],
    height: 192,
    bindChildMethods: noop,
    options: [],
    keys: [],
    groupView: {},
    onChange: noop,
    compare: compare,
    methodCallback: noop
};

class GroupedMultiSelectContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: {},
            filtered: {}
        };
    }

    componentWillMount() {
        this.props.bindChildMethods(this._sortSelectedOnTop);
        this.setState({
            filtered: this._getFilteredOptions({options: this.props.options})
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.options && nextProps.options !== this.props.options) {
            const filtered = this._getFilteredOptions({
                options: nextProps.options,
                filterFn: (options) => this._filterByQueryStr(this._getSearchValue(), options)
            });

            this.setState({
                filtered
            });
        }
    }

    componentDidMount() {
        const x = window.scrollX, y = window.scrollY;
        this._searchInput.focus();
        window.scrollTo(x, y);
    }

    _sortSelectedOnTop = () => {
        const filtered = this._getFilteredOptions({
            options: this.props.options,
            sortFn: this._sortedOnTop
        });

        this.setState({
            filtered
        });
    };

    _getSearchValue() {
        return this._searchInput ? this._searchInput.value : '';
    }

    _getSelected(key) {
        if (this._isControlled()) {
            return this.props.value[key] || [];
        }

        return this.state.selected[key] || [];
    }

    _isControlled() {
        return !isUndefined(this.props.value);
    }

    _setSelectedOptions = (selectedIds, key) => {
        if (this._isControlled()) {
            this.props.onChange({
                ...this.props.value,
                [key]: selectedIds
            }, key);
        } else {
            const selected = {
                ...this.state.selected,
                [key]: selectedIds
            };
            this.setState({
                selected
            });
            this.props.onChange(selected, key);
        }
    };

    _isOptionSelected = ({id}, key) => {
        return this._getSelected(key).indexOf(id) !== -1;
    };

    _sortedOnTop = (key) => {
        return (option1, option2) => {
            const isOption1Selected = this._isOptionSelected(option1, key);
            const isOption2Selected = this._isOptionSelected(option2, key);

            if (isOption1Selected && !isOption2Selected) {
                return -1;
            } else if (isOption2Selected && !isOption1Selected) {
                return 1;
            } else {
                return this.props.compare(lowerCase(option1.displayString), lowerCase(option2.displayString));
            }
        };
    };

    _onSelect = (option, key) => {
        let selectedIds;
        if (this._isOptionSelected(option, key)) {
            selectedIds = this._getSelected(key).filter((id) => {
                return id !== option.id;
            });
        } else {
            selectedIds = [option.id].concat(this._getSelected(key));
        }
        this._setSelectedOptions(selectedIds, key);
    };

    _filterByQueryStr(queryString, options) {
        return options.filter((option) => {
            return contains(option.displayString, queryString);
        });
    }

    _getFilteredOptions({options, filterFn, sortFn}) {
        return this.props.keys.reduce((result, key) => {
            let filtered = options[key];

            if (filterFn) {
                filtered = filterFn(options[key]);
            }

            if (sortFn) {
                filtered = filtered.sort(sortFn(key));
            }
            result[key] = filtered;
            return result;
        }, {});
    }

    _applySearch = (searchQuery) => {
        const filtered = this._getFilteredOptions({
            options: this.props.options,
            filterFn: (options) => this._filterByQueryStr(searchQuery, options),
            sortFn: this._sortedOnTop
        });

        this.setState({
            filtered
        });
    };

    _doSearchMatchAnyResult = (key) => {
        if (this.props.options[key].length === 0) {
            return true;
        }
        return this.state.filtered[key].length !== 0;
    };

    _getGroupViewConfig = (key) => {
        return this.props.groupView[key] || {};
    };

    _getHeader(key) {
        const viewConfig = this._getGroupViewConfig(key);
        const Header = viewConfig.header;

        return Header ? React.createElement(Header, {
            value: this.props.value[key],
            options: this.props.options[key]
        }) : <span className="select__group-name">{key}</span>;
    }

    render() {
        return (
            <div className="select__popup" style={{fontSize: '1.4rem'}}>
                <div className="select__search-container">
                    <IconInput
                        inputRef={(input) => this._searchInput = input}
                        fluid={true}
                        placeholder={this.props.searchPlaceholder}
                        size="sm"
                        onChange={this._applySearch}
                        className="select__search"
                        iconClassName="im icon-search"/>
                </div>
                <div style={{maxHeight: this.props.height}} className="select__options">
                    {
                        this.props.keys.map((key) => {
                            const viewConfig = this._getGroupViewConfig(key);
                            return (
                                <div key={key} className="select__group">
                                    <div className="select__group-header">
                                        {this._getHeader(key)}
                                    </div>
                                    {(() => {
                                        if (this._doSearchMatchAnyResult(key)) {
                                            return (
                                                <SelectionList
                                                    extra={viewConfig.extra}
                                                    noOptionPlaceholder={viewConfig.noOptionPlaceholder}
                                                    isSelected={(option) => this._isOptionSelected(option, key)}
                                                    onChange={(option) => this._onSelect(option, key)}
                                                    value={this._getSelected(key)}
                                                    options={this.state.filtered[key]}
                                                />
                                            );
                                        } else {
                                            return <div className="no-results-found">No results found</div>;
                                        }
                                    })()}
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}

GroupedMultiSelectContent.propType = PROP_TYPES;
GroupedMultiSelectContent.defaultProps = DEF_PROPS;

export default GroupedMultiSelectContent;

