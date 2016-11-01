import React from 'react';
import {findDOMNode} from 'react-dom';
import cn from 'classnames';
import {segStyle} from './utils/eventLevels';
import {notify} from './utils/helpers';
import {dateCellSelection, slotWidth, getCellAtX, pointInBox} from './utils/selection';
import Selection, {getBoundsForNode} from './Selection';


const PROPERTY_TYPES = {
    selectable: React.PropTypes.bool,
    draggableSelect: React.PropTypes.bool,
    onSelect: React.PropTypes.func,
    slots: React.PropTypes.number,
    highlight: React.PropTypes.func,
    isSelected: React.PropTypes.func,
    isEndDate: React.PropTypes.func,
    isStartDate: React.PropTypes.func,
    onHover: React.PropTypes.func
};

class DisplayCells extends React.Component {

    constructor(props) {
        super(props);
        this.state = {selecting: false};
    }

    componentDidMount() {
        this.props.selectable && this._selectable();
        this.props.draggableSelect && this._draggableSelect();
    }

    componentWillUnmount() {
        this._teardownSelectable();
        this._teardownDraggable();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectable && !this.props.selectable)
            this._selectable();
        if (!nextProps.selectable && this.props.selectable)
            this._teardownSelectable();

        if (nextProps.draggableSelect && !this.props.draggableSelect)
            this._draggableSelect();
        if (!nextProps.draggableSelect && this.props.draggableSelect)
            this._teardownDraggable();
    }

    render() {
        let {slots} = this.props;
        let {selecting, startIdx, endIdx} = this.state;

        let children = [];

        for (let i = 0; i < slots; i++) {
            children.push(
                <div
                    key={'bg_' + i}
                    style={segStyle(1, slots)}
                    className={cn('rbc-day-bg', {
                        'rbc-selected': this.props.isSelected(i),
                        'rbc-day-highlighted': this.props.highlight(i),
                        'rbc-end-date': this.props.isEndDate(i),
                        'rbc-start-date': this.props.isStartDate(i),
                        'rbc-selected-cell': selecting && i >= startIdx && i <= endIdx
                    })}
                />
            );
        }

        return (
            <div className="rbc-row-bg">
                { children }
            </div>
        );
    }

    _draggableSelect() {
        let node = findDOMNode(this);
        let selector = this._draggableSelect = new Selection(this.props.container);
        selector.on('selecting', (box) => {
            let {slots} = this.props;

            let startIdx = -1;
            let endIdx = -1;

            if (!this.state.selecting) {
                notify(this.props.onSelectStart, [box]);
                this._initial = {x: box.x, y: box.y};
            }
            if (selector.isSelected(node)) {
                let nodeBox = getBoundsForNode(node);

                ({startIdx, endIdx} = dateCellSelection(
                    this._initial
                    , nodeBox
                    , box
                    , slots));
            }

            this.setState({
                selecting: true,
                startIdx, endIdx
            });
        });
        selector.on('select', () => {
            this._selectSlot(this.state);
            this._initial = {};
            this.setState({selecting: false});
            notify(this.props.onSelectEnd, [this.state]);
        });
    }

    _selectable() {
        let node = findDOMNode(this);
        let selector = this._selector = new Selection(this.props.container);
        selector.on('click', (point, event) => {
            let rowBox = getBoundsForNode(node);

            if (pointInBox(rowBox, point)) {
                let width = slotWidth(getBoundsForNode(node), this.props.slots);
                let currentCell = getCellAtX(rowBox, point.x, width);

                this._selectSlot({
                    startIdx: currentCell,
                    endIdx: currentCell,
                    selectedIndex: currentCell
                });
            }

            this._initial = {};

            this.setState({
                selecting: false
            });
        });
        selector.on('mouseover', (point) => {
            let node = findDOMNode(this);
            let rowBox = getBoundsForNode(node);
            if (pointInBox(rowBox, point)) {
                let width = slotWidth(getBoundsForNode(node), this.props.slots);
                let currentCell = getCellAtX(rowBox, point.x, width);
                this.props.onHover(currentCell);
            }
        });
    }

    _teardownSelectable() {
        if (!this._selector) return;
        this._selector.teardown();
        this._selector = null;
    }

    _teardownDraggable() {
        if (!this._draggableSelect) return;
        this._draggableSelect.teardown();
        this._draggableSelect = null;
    }

    _selectSlot({endIdx, startIdx, selectedIndex}) {
        this.props.onSelectSlot &&
        this.props.onSelectSlot({
            start: startIdx,
            end: endIdx,
            selectedIndex
        });
    }
}

DisplayCells.propTypes = PROPERTY_TYPES;

export default DisplayCells;
