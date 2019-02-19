import React from 'react';
import PropTypes from 'prop-types';
import find from 'lodash/find';
import trim from 'lodash/trim';
import Fuse from 'fuse.js';
import Link from '../Link/Link';
import { compare, findIdentifiables, isDefined } from '../util/utils';
import IconInput from '../InputIcon/IconInput';
import CheckBoxList from '../Select/CheckBoxList';
import keyNav from '../Select/KeyBoardNav';
import fuseConfig from '../Select/fuseSearchConfig';

const PROPERTY_TYPES = {
    placeholder: PropTypes.string,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            displayString: PropTypes.string.isRequired
        })
    ),
    onChange: PropTypes.func,
    value: PropTypes.arrayOf(PropTypes.number.isRequired),
    compare: PropTypes.func,
    showSearch: PropTypes.bool,
    showClear: PropTypes.bool,
    selectedOnTop: PropTypes.bool,
    popupHeader: PropTypes.element
};
const DEFAULT_PROPS = {
    placeHolder: 'Search ...',
    compare: compare,
    showSearch: true,
    showClear: true,
    popupHeader: null,
    selectedOnTop: true
};

class MultiSelectPopup extends React.Component {
    constructor(props) {
        super(props);
        this._sortSelectedOnTop = this._sortSelectedOnTop.bind(this);
        this.getOptions = this.getOptions.bind(this);
        this.state = {
            selected: findIdentifiables(this.props.options, props.value)
        };

        this.fuse = new Fuse(props.options, fuseConfig);

        this.state.filtered = this.getAllSorted();
    }

    componentDidMount() {
        if (this.refs.searchInput && this.refs.searchInput.focus) {
            setTimeout(() => this.refs.searchInput.focus(), 0);
        }
    }

    getAllSorted() {
        let result = this.props.options.slice(0);
        if (this.props.selectedOnTop) {
            result.sort(this._sortSelectedOnTop);
        }
        return result;
    }

    componentWillReceiveProps(nextProps) {
        this.fuse.setCollection(nextProps.options);

        let isValueChanged = nextProps.value !== this.props.value;
        if (isValueChanged) {
            if (this.props.options !== nextProps.options) {
                this.resetSearch(nextProps.options);
            }
            this.setState({ selected: findIdentifiables(nextProps.options, nextProps.value) });
        }
    }

    isSelected(option) {
        return this.findOptionInList(this.state.selected, option);
    }

    findOptionInList(list, option) {
        return find(list, item => item.id === option.id);
    }

    mergeSelectedOptions(selected) {
        return this.state.selected
            .filter(item => {
                let found = this.findOptionInList(this.state.filtered, item);
                return !found;
            })
            .concat(selected);
    }

    select(option) {
        let beforeLen = this.state.selected.length;

        let selected = this.state.selected.filter(item => {
            return item.id !== option.id;
        });

        if (beforeLen === selected.length) {
            selected.push(option);
        }

        this._selectOptions(selected);
    }

    _selectOptions(selected) {
        let selectedMerged = this.mergeSelectedOptions(selected);

        if (!this._isControlled()) {
            this.setState({
                selected: selectedMerged
            });
        }

        if (this.getInput()) {
            this.getInput().focus();
        }

        if (this.props.onChange) {
            this.props.onChange(
                selectedMerged.map(option => {
                    return option.id;
                }),
                selectedMerged
            );
        }
    }

    _sortSelectedOnTop(option1, option2) {
        let isOption1Selected = this.isSelected(option1);
        let isOption2Selected = this.isSelected(option2);

        if (isOption1Selected && !isOption2Selected) {
            return -1;
        } else if (isOption2Selected && !isOption1Selected) {
            return 1;
        } else {
            return this.props.compare(option1.displayString, option2.displayString);
        }
    }

    _isControlled() {
        return isDefined(this.props.value);
    }

    _applySearch = value => {
        if (this.state.query === value) {
            return;
        }
        this.resetNav();
        let filtered = trim(value).length === 0 ? this.props.options : this.fuse.search(value);

        if (this.props.selectedOnTop) {
            filtered.sort(this._sortSelectedOnTop);
        }

        this.setState({
            filtered: filtered,
            query: value
        });
    };

    resetSearch = (options = this.props.options) => {
        this.resetNav();
        this.setState({
            filtered: this.props.selectedOnTop ? options.sort(this._sortSelectedOnTop) : options,
            query: ''
        });
    };

    getOptions() {
        return this.state.filtered;
    }

    getSelectedOptionEl() {
        return this._checkBoxList.getFocusedEl();
    }

    getInput() {
        return this._searchInput;
    }

    render() {
        return this.props.renderOptions ? this.props.renderOptions() : this.renderOptions();
    }

    renderOptions = () => {
        return (
            <div className="select__popup">
                {this.props.popupHeader ? this.props.popupHeader : null}
                {this.props.showSearch ? (
                    <div className="select__search-container">
                        <IconInput
                            inputRef={input => (this._searchInput = input)}
                            onKeyDown={e => this.navigate(e)}
                            ref="searchInput"
                            fluid={true}
                            placeholder={this.props.placeholder}
                            size="sm"
                            onChange={this._applySearch}
                            className="select__search"
                            iconClassName="im icon-search"
                        />
                    </div>
                ) : null}
                {this.props.showClear ? (
                    <div>
                        <div className="select__clear-btn">
                            <Link
                                className="select__clear-btn"
                                onClick={() => {
                                    this._selectOptions([]);
                                }}
                            >
                                Clear all selected
                            </Link>
                        </div>
                    </div>
                ) : null}

                <div className="select__options">
                    <CheckBoxList
                        ref={checkBoxList => (this._checkBoxList = checkBoxList)}
                        focus={this.state.tempSelection}
                        options={this.state.filtered}
                        onChange={selected => this._selectOptions(selected)}
                        value={this.state.selected.map(selected => {
                            return selected.id;
                        })}
                    />
                </div>
            </div>
        );
    };
}

MultiSelectPopup.propTypes = PROPERTY_TYPES;
MultiSelectPopup.defaultProps = DEFAULT_PROPS;

export default keyNav(true)(MultiSelectPopup);
