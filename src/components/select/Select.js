import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import find from 'lodash/find';
import Popup from '../Popup';
import IconInput from '../IconInput';
import {isDefined, contains} from '../../util/utils';

import {withIdAndTypeContext} from '../hoc/WithIdAndTypeHOC';
import keyBordNav from './KeyBoardNav';

const PROPERTY_TYPES = {
    placeholder: React.PropTypes.string,
    search: React.PropTypes.bool,
    open: React.PropTypes.bool,
    onPopupStateChange: React.PropTypes.func,
    value: React.PropTypes.number,
    options: React.PropTypes.arrayOf(React.PropTypes.shape({
        id: React.PropTypes.number.isRequired,
        displayString: React.PropTypes.string.isRequired
    })),
    className: React.PropTypes.string
};
const DEFAULT_PROPS = {
    placeholder: 'Select...',
    search: false
};

class Select extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: this.findById(this.props.options, props.value),
            open: false,
            filtered: props.options
        };
    }

    componentDidUpdate() {
        if (this.refs.searchInput && this.refs.searchInput.focus) {
            if (this.isOpen()) {
                this.refs.searchInput.focus();
            }
        }
    }

    componentWillReceiveProps(nextProps) {

        if (isDefined(nextProps.value)) {
            this.setState({selected: this.findById(nextProps.options, nextProps.value)});
        }

        if (isDefined(nextProps.open)) {
            this.setState({open: nextProps.open}, () => {
                this.handlePopupOpening();
            });
        }
    }

    findById(options, id) {
        return find(options, (option) => option && (option.id === id));
    }

    select(option) {
        this.refs.input.focus();
        if (!this.isControlled()) {
            this.setState({
                selected: option,
                open: false
            });
        } else {
            this.setState({open: false});
        }

        this.navigate(null, option);

        if (this.props.onChange) {
            this.props.onChange(option.id, option);
        }
    }

    handlePopupStateChange(open) {

        if (!this.isPopupControlled()) {
            this.setState({open}, () => {
                this.handlePopupOpening();
            });
        }

        if (this.props.onPopupStateChange) {
            this.props.onPopupStateChange(open);
        }
    }

    isControlled() {
        return isDefined(this.props.value);
    }

    handlePopupOpening() {
        if (!this.isOpen()) {
            return;
        }
        this.setState({filtered: this.props.options}, () => {
            if (this.refs.selected) {
                let selectedItem = this.refs.selected;
                this._optionContainer.scrollTop = selectedItem.offsetTop;
            }
        });
        let popupContent = ReactDOM.findDOMNode(this.refs.popup.getContent());
        let input = ReactDOM.findDOMNode(this.refs.input);
        popupContent.style.width = `${input.offsetWidth}px`;
    }

    renderItems() {
        let selectedObject = this.state.selected;
        let tempSelectionObject = this.state.tempSelection;

        return this.state.filtered.map((option) => {
            let selected = selectedObject && selectedObject.id === option.id;
            let tempSelection = tempSelectionObject && tempSelectionObject.id === option.id;
            let className = classNames('select__option', {
                'selected': tempSelection
            });

            let ref = selected || tempSelection ? {ref: 'selected'} : null;
            return (
                <div tabIndex="0" {...ref} className={className} key={option.id}
                     onClick={() => this.select(option)}>{option.displayString}</div>
            );
        });
    }

    applySearch(value) {
        let filtered = this.props.options.filter((option) => {
            return contains(option.displayString, value);
        });

        this.setState({
            filtered: filtered
        });

        this.resetNav();
    }

    isOpen() {
        return isDefined(this.props.open) ? this.props.open : this.state.open;
    }

    isPopupControlled() {
        return isDefined(this.props.open);
    }

    getInput() {
        if (this.props.search && this.refs.searchInput) {
            return this.refs.searchInput;
        } else {
            return this.refs.input;
        }
    }

    getSelectedOptionEl() {
        return this.refs.selected;
    }

    getOptions() {
        return this.state.filtered;
    }

    render() {
        let selectedObject = this.state.selected;
        let text = selectedObject ? selectedObject.displayString : this.props.placeholder;

        let className = classNames(this.props.className, 'select', {
            'placeholder': !selectedObject
        });
        return (
            <Popup ref="popup"
                   attachment="bottom left" on="click"
                   popupClassName="select__popover"
                   animationBaseName="select__popover--animation-slide-y"
                   open={this.isOpen()}
                   onPopupStateChange={(open) => this.handlePopupStateChange(open)}>
                <div onKeyDown={(e) => this.navigate(e)}
                     id={this.props.id}
                     ref="input"
                     tabIndex="0"
                     className={className}>
                    <div title={text}>
                        {text}
                    </div>
                    <i className="im icon-arrow-down"/>
                </div>

                <div className="select__popup">
                    { this.props.search &&
                    <div className="select__search-container">
                        <IconInput ref="searchInput"
                                   fluid={true}
                                   placeholder="Search ... "
                                   size="sm"
                                   onKeyDown={(e) => this.navigate(e)}
                                   onChange={(value) => this.applySearch(value)}
                                   className="select__search"
                                   iconClassName="im icon-search"/>
                    </div>
                    }

                    <div ref={(optionContainer) => this._optionContainer = optionContainer} className="select__options">
                        {this.renderItems()}
                    </div>
                </div>
            </Popup>
        );
    }
}

Select.propTypes = PROPERTY_TYPES;
Select.defaultProps = DEFAULT_PROPS;

export default withIdAndTypeContext(keyBordNav(false)(Select));