import React from 'react';
import ReactList from 'react-list';
import PropTypes from 'prop-types';
import cn from 'classnames';
import CheckBox from '../CheckBox';

const REACT_PROPS = {
    noOptionPlaceholder: PropTypes.element,
    extra: PropTypes.func,
    isSelected: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            displayString: PropTypes.string
        })
    ),
    onChange: PropTypes.func
};

const DEF_PROPS = {
    options: [],
    type: 'unknown type',
    extra: () => null,
    noOptionPlaceholder: <div />,
    onChange: () => {},
    isSelected: () => {}
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
        return (
            <tr className={style} tabIndex="0" key={key} onClick={() => this._onOptionSelect(option)}>
                <td className="check-box-list__check-box">
                    <CheckBox value={this.props.isSelected(option, this.props.type)} />
                </td>
                <td className="check-box-list__label">
                    <div className="check-box-list__extra" onClick={e => e.stopPropagation()}>
                        {this.props.extra(option)}
                    </div>
                    <span className="check-box-list__item-text" title={option.displayString}>
                        {option.displayString}
                    </span>
                </td>
            </tr>
        );
    }

    _renderOptions(options, ref) {
        return (
            <table className="check-box-list__table">
                <colgroup>
                    <col className="check-box-list__check-box-column" />
                    <col />
                </colgroup>
                <tbody ref={ref}>{options}</tbody>
            </table>
        );
    }

    render() {
        if (this.props.options.length === 0) {
            return this.props.noOptionPlaceholder;
        }

        return (
            <ReactList
                itemRenderer={this._renderOption}
                itemsRenderer={this._renderOptions}
                length={this.props.options.length}
                type="uniform"
            />
        );
    }
}

SelectionList.propTypes = REACT_PROPS;
SelectionList.defaultProps = DEF_PROPS;

export default SelectionList;
