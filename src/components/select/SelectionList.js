import React from 'react';
import ReactList from 'react-list';
import cn from 'classnames';
import CheckBox from '../CheckBox';

const REACT_PROPS = {
    type: React.PropTypes.string,
    placeholder: React.PropTypes.element,
    optionRenderer: React.PropTypes.func,
    optionsRenderer: React.PropTypes.func,
    isSelected: React.PropTypes.func.isRequired,
    value: React.PropTypes.arrayOf(React.PropTypes.number.isRequired),
    options: React.PropTypes.arrayOf(React.PropTypes.shape({
        id: React.PropTypes.number,
        displayString: React.PropTypes.string
    })),
    onChange: React.PropTypes.func
};

const DEF_PROPS = {
    options: [],
    type: 'unknown type',
    placeholder: <div>No options</div>,
    onChange: () => {
    },
    isSelected: () => {
    }
};

class SelectionList extends React.Component {
    constructor(props) {
        super(props);
        this._renderOptions = this._renderOptions.bind(this);
        this._renderOption = this._renderOption.bind(this);
        this._onOptionSelect = this._onOptionSelect.bind(this);
    }

    _onOptionSelect(option, type) {
        this.props.onChange(option, type);
    }

    _renderOption(index, key) {
        const option = this.props.options[index];
        let style = cn('check-box-list__item');

        if (this.props.optionRenderer) {
            return this.props.optionRenderer(option);
        }

        return (
            <tr
                className={style}
                tabIndex="0"
                key={key}
                onClick={() => this._onOptionSelect(option, this.props.type)}
            >
                <td className="check-box-list__check-box">
                    <CheckBox value={this.props.isSelected(option, this.props.type)}/>
                </td>
                <td className="check-box-list__label">
                    <span>{option.displayString}</span>
                </td>
            </tr>
        );
    }

    _renderOptions(options, ref) {
        if (this.props.optionsRenderer) {
            return this.props.optionsRenderer(options, ref);
        }
        return (
            <table className="check-box-list__table">
                <colgroup>
                    <col className="check-box-list__check-box-column"/>
                    <col/>
                </colgroup>
                <tbody ref={ref}>
                {options}
                </tbody>
            </table>
        );
    }

    render() {
        if (this.props.options.length === 0) {
            return this.props.placeholder;
        }

        return (
            <div style={{overflow: 'auto', maxHeight: 200}}>
                <ReactList
                    itemRenderer={this._renderOption}
                    itemsRenderer={this._renderOptions}
                    length={this.props.options.length}
                    type="uniform"
                />
            </div>

        );
    }
}

SelectionList.propTypes = REACT_PROPS;
SelectionList.defaultProps = DEF_PROPS;

export default SelectionList;