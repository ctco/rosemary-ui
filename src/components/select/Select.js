import '../../assets/scss/components/_select.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import find from 'lodash/find';
import Popup from '../Popup';
import Input from '../Input';
import {isDefined, contains} from '../../util/utils';

const PROPERTY_TYPES = {
    placeholder: React.PropTypes.string,
    search: React.PropTypes.bool,
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
            popupState: 'closed',
            filtered: props.options
        };
    }

    componentWillReceiveProps(nextProps) {
        if (isDefined(nextProps.value)) {
            this.setState({selected: this.findById(nextProps.options, nextProps.value)});
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
                popupState: 'closing'
            });
        } else {
            this.setState({popupState: 'closing'});
        }
        if (this.props.onChange) {
            this.props.onChange(option.id, option);
        }
    }

    handlePopupStateChange(newPopupState) {
        this.setState({popupState: newPopupState});
        if (newPopupState === 'open') {
            this.handlePopupOpening();
        }
    }

    isControlled() {
        return isDefined(this.props.value);
    }

    handlePopupOpening() {
        this.setState({filtered: this.props.options});
        let popupContent = ReactDOM.findDOMNode(this.refs.popup.getContent());
        let input = ReactDOM.findDOMNode(this.refs.input);
        popupContent.style.width = `${input.offsetWidth}px`;

        if (this.refs.selected) {
            let selectedItem = ReactDOM.findDOMNode(this.refs.selected);
            popupContent.scrollTop = selectedItem.offsetTop;
        }
    }

    renderItems() {
        let selectedObject = this.state.selected;
        return this.state.filtered.map((option) => {
            let selected = selectedObject && selectedObject.id === option.id;
            let className = classNames('select__option', {
                'selected': selected
            });

            let ref = selected ? {ref: 'selected'} : null;

            return (
                <div {...ref} className={className} key={option.id}
                              onClick={() => this.select(option)}>{option.displayString}</div>
            );
        });
    }

    applySearch(value) {
        let filtered = this.props.options.slice(0).filter((option) => {
            return contains(option.displayString, value);
        });

        this.setState({
            filtered: filtered
        });
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
                   popupState={this.state.popupState}
                   onPopupStateChange={(newPopupState) => this.handlePopupStateChange(newPopupState)}>
                <div ref="input" tabIndex="0" className={className}>
                    <div title={text}>
                        {text}
                    </div>
                    <i className="im icon-arrow-down" />
                </div>

                <div className="select__popup">
                    { this.props.search &&
                        <div className="select__search-container">
                            <Input className="select__search text-input--sm"
                                   onChange={(value) => this.applySearch(value)}
                                   placeholder="Search ... "/>
                        </div>
                    }

                    <div className="select__options">
                        {this.renderItems()}
                    </div>
                </div>
            </Popup>
        );
    }
}

Select.propTypes = PROPERTY_TYPES;
Select.defaultProps = DEFAULT_PROPS;

export default Select;