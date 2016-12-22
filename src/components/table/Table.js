import React from 'react';
import createFragment from 'react-addons-create-fragment';
import classNames from 'classnames';
import isUndefined from 'lodash/isUndefined';
import some from 'lodash/some';
import isEmpty from 'lodash/isEmpty';
import find from 'lodash/find';
import isArray from 'lodash/isArray';
import isFunction from 'lodash/isFunction';

import Row from './Row';

const DESC = false;
const ASC = true;

const PROPERTY_TYPES = {
    data: React.PropTypes.array,
    order: React.PropTypes.bool,
    colgroup: React.PropTypes.array,
    colSpanBottom: React.PropTypes.number,
    defSorting: React.PropTypes.number,
    expand: React.PropTypes.array,
    headerCells: React.PropTypes.func,
    loadingIndicator: React.PropTypes.func,
    rowStyle: React.PropTypes.func,
    row: React.PropTypes.object,
    cells: React.PropTypes.func.isRequired,
    rowIndex: React.PropTypes.func.isRequired,
    bottomSection: React.PropTypes.element
};
const DEFAULT_PROPS = {
    data: [],
    headerCells: [],
    order: DESC
};

class Table extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            sorted: {
                index: this.props.defSorting,
                order: this.props.order
            }
        };
    }

    componentWillMount() {
        this.setState({
            data: this._getData()
        });
    }

    _getCells(obj) {
        return this.props.cells(obj);
    }

    _handleRowClick(item, index) {
        if (this.props.row.onClick) {
            this.props.row.onClick(item, this.props.rowIndex(item), index);
        }
    }

    _showLoadingIndicator(show) {
        if (this.props.loadingIndicator && show) {
            return this.props.loadingIndicator();
        }
        return show ? <span>Loading...</span> : null;
    }

    _createBottomSection(create, item, rowDetails = {}) {
        let newProps = {
            ...item
        };

        if (!isEmpty(rowDetails)) {
            newProps = {
                ...newProps,
                ...rowDetails
            };
        }

        return create ?
            React.cloneElement(this.props.bottomSection, {
                ...newProps
            }) : null;

    }

    _renderBottomSection(showLoader, hasData, item, rowDetails) {
        return (
            <tr className="ros-table__bottom-section">
                <td colSpan={this.props.colSpanBottom || 0}>
                    {this._showLoadingIndicator(showLoader && !hasData)}
                    {this._createBottomSection(hasData, item, rowDetails)}
                </td>
            </tr>);
    }

    _handleSort(comparator, cellIndex) {
        let data;
        let order;

        if (cellIndex === this.state.sorted.index) {
            order = !this.state.sorted.order;
            data = this._sortData(this.state.data, comparator, order);
        } else {
            order = DESC;
            data = this._sortData(this.state.data, comparator, order);
        }

        this.setState({
            data,
            sorted: {
                index: cellIndex,
                order
            }
        });
    }

    _sortIndicator(index) {
        return index === this.state.sorted.index ? (
            <span className="sort-indicator">
             {
                 this.state.sorted.order ?
                     <span>&uarr;</span> :
                     <span>&darr;</span>
             }
           </span>
        ) : null;
    }

    _renderHeader() {
        return this.props.headerCells().map((headerCell, index) => {

            let cellStyle = classNames('ros-table__header-cell');

            let style = classNames('ros-table__header-sortable', {
                'sorted': index === this.state.sorted.index
            });

            if (headerCell === null) {
                return <th className={cellStyle} key={index}/>;
            }

            if (React.isValidElement(headerCell)) {
                return (
                    <th key={index} className={cellStyle}>
                        {headerCell}
                    </th>
                );
            }

            if (typeof headerCell.comparator === 'function') {
                let innerEl = (
                    <span className={style}
                          onClick={() => this._handleSort(headerCell.comparator, index)}>
                             {this._sortIndicator(index)}
                        {headerCell.el}
                    </span>);

                return (
                    <th key={index} className={cellStyle} {...headerCell.props || {}}>
                        {innerEl}
                    </th>
                );
            }

            return (
                <th key={index} className={cellStyle} {...headerCell.props || {}}>
                    {headerCell.el}
                </th>
            );
        });
    }

    _getRowStyle(item) {
        if (this.props.rowStyle) {
            return this.props.rowStyle(item);
        }

        return {};
    }

    _findRowDetails(item) {
        return find(this.props.rowDetails, (obj) => {
            return obj.id === this.props.rowIndex(item);
        });
    }


    _renderRow(item, index) {
        let loadingDetails = some(this.props.rowDetails, {id: this.props.rowIndex(item)});

        let rowDetails = this._findRowDetails(item);
        let hasData = !isEmpty(rowDetails && rowDetails.data);

        let showLoader = loadingDetails && !hasData;

        let cellStyle = classNames('ros-table__cell');

        let style = classNames('ros-table__row', {
            'row--expanded': loadingDetails || hasData
        }, this._getRowStyle(item));

        return createFragment({
            row: (
                <Row className={style}
                     key={index}
                     item={item}
                     onClick={(e) => this._handleRowClick(item, index)}>

                    {this._getCells(item).map((cell, key) => {

                        if (cell === null) {
                            return <td className={cellStyle} key={key}/>;
                        }

                        if (React.isValidElement(cell)) {
                            return (
                                <td key={key} className={cellStyle}>
                                    {cell}
                                </td>
                            );
                        }

                        return (
                            <td key={key} className={cellStyle} {...cell.props || {}}>
                                {cell.el}
                            </td>
                        );

                    })}
                </Row>
            ),
            bottomSection: this._renderBottomSection(showLoader, hasData, item, rowDetails)
        });
    }

    _renderColGroup() {
        if (this.props.colgroup) {
            return (
                <colgroup>
                    {
                        this.props.colgroup.map((col, index) => <col key={index} width={col}/>)
                    }
                </colgroup>
            );
        }
        return null;
    }


    _getDefComparator() {
        if (!isUndefined(this.props.defSorting)) {
            let hCells = this.props.headerCells();
            if (!isArray(hCells)) {
                throw new Error('Expected the headerCells returns array');
            } else {
                let comparator = hCells[this.props.defSorting].comparator;
                if (!isFunction(comparator)) {
                    throw new Error('Expected comparator to be a function.Or you forgot to provide comparator fn');
                }

                return comparator;
            }
        }

        return null;
    }

    _sortData(data, comparator, order = DESC) {
        if (order) {
            return data.sort(comparator);
        }
        return data.sort(comparator).reverse();
    }

    _getData() {
        let comparator = this._getDefComparator();
        if (comparator) {
            return this._sortData(this.props.data, comparator, this.props.order);
        }

        return this.props.data;
    }

    render() {
        let style = classNames('ros-table', this.props.className);

        return (
            <table className={style}>
                {this._renderColGroup()}
                <thead>
                <tr className="ros-table__header">
                    {this._renderHeader()}
                </tr>
                </thead>
                <tbody>
                {
                    this.props.data.map((item, index) => {
                        return this._renderRow(item, index);
                    })
                }
                </tbody>
            </table>
        );
    }
}

Table.order = {
    ASC,
    DESC
};
Table.propTypes = PROPERTY_TYPES;
Table.defaultProps = DEFAULT_PROPS;

export default Table;
