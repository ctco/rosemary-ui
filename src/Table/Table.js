import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isUndefined from 'lodash/isUndefined';
import some from 'lodash/some';
import isEmpty from 'lodash/isEmpty';
import find from 'lodash/find';
import isArray from 'lodash/isArray';
import isFunction from 'lodash/isFunction';

import Row from './Row/Row';

const DESC = 'DESC';
const ASC = 'ASC';

const PROPERTY_TYPES = {
    className: PropTypes.string,
    data: PropTypes.array,
    sorted: PropTypes.shape({
        key: PropTypes.any,
        direction: PropTypes.any
    }),
    colgroup: PropTypes.array,
    colSpanBottom: PropTypes.number,
    defSorting: PropTypes.number,
    headerCells: PropTypes.func,
    loadingIndicator: PropTypes.func,
    rowStyle: PropTypes.func,
    rowProps: PropTypes.func,
    row: PropTypes.object,
    cells: PropTypes.func.isRequired,
    rowIndex: PropTypes.func.isRequired,
    bottomSection: PropTypes.element,
    onHeaderClick: PropTypes.func,
    testId: PropTypes.any
};
const DEFAULT_PROPS = {
    data: [],
    headerCells: () => []
};

class Table extends React.Component {
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

        return create
            ? React.cloneElement(this.props.bottomSection, {
                  ...newProps
              })
            : null;
    }

    _renderBottomSection(showLoader, hasData, item, rowDetails) {
        return (
            <tr className="ros-table__bottom-section">
                <td colSpan={this.props.colSpanBottom || 0}>
                    {this._showLoadingIndicator(showLoader && !hasData)}
                    {this._createBottomSection(hasData, item, rowDetails)}
                </td>
            </tr>
        );
    }

    _sortIndicator(key) {
        return key === this._getSortIndex() ? (
            <span className="sort-indicator">
                {this._getSortDirection() === DESC ? <span>&darr;</span> : <span>&uarr;</span>}
            </span>
        ) : null;
    }

    _getSortIndex() {
        return this.props.sorted && this.props.sorted.key;
    }

    _isSortControlled() {
        return !isUndefined(this.props.sorted);
    }

    _getSortDirection() {
        let dir = this.props.sorted && this.props.sorted.direction;
        return dir && dir.toUpperCase();
    }

    _handleHeaderCellClick(key, index, cell, sortable) {
        if (this.props.onHeaderClick && sortable) {
            this.props.onHeaderClick(key, index, cell, this._toggleDirection());
        }
    }

    _toggleDirection = () => {
        return this._getSortDirection() === ASC ? DESC : ASC;
    };

    _renderHeader() {
        return this.props.headerCells().map((headerCell, index) => {
            const cellStyle = classNames('ros-table__header-cell');

            if (headerCell === null) {
                return <th className={cellStyle} key={index} />;
            }

            const sortable = headerCell.sortable === undefined ? true : headerCell.sortable;

            const isSorted = headerCell.key === this._getSortIndex();
            const style = classNames({
                'ros-table__header-sortable': this._isSortControlled() && sortable,
                sorted: isSorted
            });

            return (
                <th key={index} className={cellStyle} {...headerCell.props || {}}>
                    <span
                        onClick={e => this._handleHeaderCellClick(headerCell.key, index, headerCell, sortable)}
                        className={style}
                    >
                        {headerCell.el}
                    </span>
                    {isSorted && this._sortIndicator(headerCell.key)}
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

    _getRowProps(item) {
        if (this.props.rowProps) {
            return this.props.rowProps(item);
        }

        return {};
    }

    _findRowDetails(item) {
        return find(this.props.rowDetails, obj => {
            return obj.id === this.props.rowIndex(item);
        });
    }

    _renderRow(item, index) {
        let loadingDetails = some(this.props.rowDetails, { id: this.props.rowIndex(item) });

        let rowDetails = this._findRowDetails(item);
        let hasData = !isEmpty(rowDetails && rowDetails.data);

        let showLoader = loadingDetails && !hasData;

        let cellStyle = classNames('ros-table__cell');

        let style = classNames(
            'ros-table__row',
            {
                'row--expanded': loadingDetails || hasData
            },
            this._getRowStyle(item)
        );

        return (
            <React.Fragment>
                <Row className={style}
                     key={index}
                     item={item}
                     onClick={e => this._handleRowClick(item, index)}
                     rowProps={this._getRowProps(item)}>
                    {this._getCells(item).map((cell, key) => {
                        if (cell === null) {
                            return <td className={cellStyle} key={key} />;
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
                {this._renderBottomSection(showLoader, hasData, item, rowDetails)}
            </React.Fragment>
        );
    }

    _renderColGroup() {
        if (this.props.colgroup) {
            return (
                <colgroup>
                    {this.props.colgroup.map((col, index) => (
                        <col key={index} width={col} />
                    ))}
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

    render() {
        let style = classNames('ros-table', this.props.className);

        return (
            <table data-test-id={this.props.testId} className={style}>
                {this._renderColGroup()}
                <thead>
                    <tr className="ros-table__header">{this._renderHeader()}</tr>
                </thead>
                <tbody>
                    {this.props.data.map((item, index) => {
                        return this._renderRow(item, index);
                    })}
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
