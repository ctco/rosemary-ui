import React from 'react';
import find from 'lodash/find';
import Link from '../Link';
import {isDefined, contains, findIdentifiables} from '../../util/utils';
import IconInput from '../IconInput';
import CheckBoxList from './CheckBoxList';

const PROPERTY_TYPES = {
    placeholder: React.PropTypes.string,
    options: React.PropTypes.arrayOf(React.PropTypes.shape({
        id: React.PropTypes.number.isRequired,
        displayString: React.PropTypes.string.isRequired
    })),
    onChange: React.PropTypes.func,
    value: React.PropTypes.arrayOf(React.PropTypes.number.isRequired)
};
const DEFAULT_PROPS = {
    placeHolder: 'Search ...'
};

class MultiSelectPopup extends React.Component {

    constructor(props) {
        super(props);
        this.sortSelectedOnTop = this.sortSelectedOnTop.bind(this);

        this.state = {
            selected: findIdentifiables(this.props.options, props.value)
        };

        this.state.filtered = this.getAllSorted();
    }

    componentDidMount() {
        if (this.refs.searchInput && this.refs.searchInput.focus) {
            setTimeout(() => this.refs.searchInput.focus(), 0);
        }
    }

    getAllSorted() {
        let result = this.props.options.slice(0);
        result.sort(this.sortSelectedOnTop);
        return result;
    }

    componentWillReceiveProps(nextProps) {
        let isValueChanged = nextProps.value !== this.props.value;
        if (isValueChanged) {
            this.setState({selected: findIdentifiables(nextProps.options, nextProps.value)});
        }
    }

    isSelected(option) {
        return this.findOptionInList(this.state.selected, option);
    }

    findOptionInList(list, option) {
        return find(list, (item) => item.id === option.id);
    }

    mergeSelectedOptions(selected) {
        return this.state.selected
            .filter((item) => {
                let found = this.findOptionInList(this.state.filtered, item);
                return !found;
            })
            .concat(selected);
    }

    select(selected) {
        let selectedMerged = this.mergeSelectedOptions(selected);

        if (!this.isControlled()) {
            this.setState({
                selected: selectedMerged
            });
        }

        if (this.props.onChange) {
            this.props.onChange(selectedMerged.map((option) => {
                return option.id;
            }), selectedMerged);
        }
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

    isControlled() {
        return isDefined(this.props.value);
    }

    applySearch(value) {
        let filtered = this.props.options.filter((option) => {
            return contains(option.displayString, value);
        });

        filtered.sort(this.sortSelectedOnTop);

        this.setState({
            filtered: filtered
        });
    }

    render() {
        return (
            <div className="select__popup">
                <div className="select__search-container">
                    <IconInput ref="searchInput"
                               fluid={true}
                               placeholder={this.props.placeholder}
                               size="sm"
                               onChange={(value) => this.applySearch(value)}
                               className="select__search"
                               iconClassName="im icon-search"/>
                </div>
                <div className="select__clear-btn">
                    <Link className="select__clear-btn" onClick={() => {this.select([]);}}>
                        Clear all selected
                    </Link>
                </div>
                <div className="select__options">
                    <CheckBoxList options={this.state.filtered}
                                  onChange={(selected) => this.select(selected)}
                                  value={this.state.selected.map((selected) => {
                                      return selected.id;
                                  })}
                    />
                </div>
            </div>
        );
    }
}

MultiSelectPopup.propTypes = PROPERTY_TYPES;
MultiSelectPopup.defaultProps = DEFAULT_PROPS;

export default MultiSelectPopup;
