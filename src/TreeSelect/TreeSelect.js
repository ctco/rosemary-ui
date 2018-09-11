import * as React from 'react';
import PropTypes from 'prop-types';
import ReactList from 'react-list';

import keyBoardNav from '../Select/KeyBoardNav';

import Link from '../Link';
import MultiSelect, { PROPERTY_TYPES as msPropTyes } from '../MultiSelect/MultiSelect';
import InputIcon from '../InputIcon';
import noop from 'lodash/noop';
import CheckBox from '../CheckBox';

const TREE_PROPS = {
    ...msPropTyes,
    hashLength: PropTypes.number.isRequired,
    footer: PropTypes.node
};

export class TreeSelectRaw extends React.Component {
    static propTypes = TREE_PROPS;

    static defaultProps = {
        hashLength: 6
    };

    state = {
        search: '',
        selected: []
    };

    optionsIn = [];

    constructor(...r) {
        super(...r);
        if (this.props.value) {
            this.state.selected = this.getValidValues(this.props);
        }
    }

    componentWillReceiveProps(props) {
        if (props.value) {
            this.setState({ selected: this.getValidValues(props) }, () => {
                if (props.value.length !== this.state.selected.length) {
                    this.sync();
                }
            });
        }
    }

    render() {
        // create a local copy of options - to prevent props modification
        this.optionsIn = [
            ...this.props.options.reduce((m, o) => m.set(o.id, Object.assign(m.get(o.id) || {}, o)), new Map()).values()
        ];

        this.optionsIn.forEach(item => {
            item.children = null;
            item.searchString = item.displayString.toLowerCase();
        });

        const treeNode = this.optionsIn.reduce((map, item) => {
            const parentTreeHash = item.treeNodeHash.substring(0, item.treeNodeHash.length - this.props.hashLength);
            const parent = this.optionsIn.find(node => node.treeNodeHash === parentTreeHash);
            if (parent) {
                parent.children = parent.children || [];
                parent.children.push(item);
                item.parent = parent;
            } else {
                map[item.treeNodeHash] = item;
            }
            return map;
        }, {});

        if (treeNode) {
            this.tree = {
                children: []
            };
            Object.keys(treeNode).forEach(nodeKey => {
                this.tree.children.push(treeNode[nodeKey]);
            });
        }

        this.options = this.buildOptionsFromTree(this.tree);
        return (
            <MultiSelect
                {...this.props}
                value={this.state.selected}
                options={this.options}
                renderOptions={this.renderOptions}
                onChange={this.onChange}
            />
        );
    }

    getValidValues = props => {
        return [...props.value.filter(val => !!props.options.find(o => o.id === val))];
    };

    onChange = newValue => {
        this.setState(
            {
                selected: newValue
            },
            this.sync
        );
    };

    sync = () => this.props.onChange(this.state.selected);

    buildOptionsFromTree(tree, options = []) {
        if (!tree) {
            return [];
        }

        tree.children.sort((ak, bk) => ak.displayString.localeCompare(bk.displayString));
        tree.children.forEach(key => {
            options.push(key);
            if (key.children) {
                this.buildOptionsFromTree(key, options);
            }
        });
        return options;
    }

    _applySearch = search => {
        this.setState({ search });
    };

    renderOptions = () => {
        return (
            <div className="select__popup">
                <div className="select__search-container">
                    <InputIcon
                        inputRef={this.handleInputRef}
                        value={this.state.search}
                        ref="searchInput"
                        fluid={true}
                        placeholder={'Search...'}
                        size="sm"
                        onChange={this._applySearch}
                        className="select__search"
                        iconClassName="im icon-search"
                    />
                </div>
                <div className="select__popup-header">
                    <div className="float-left">
                        <Link className="tree-select__clear-btn" onClick={this.expandCollapse(false)}>
                            Expand all
                        </Link>
                        <Link className="tree-select__clear-btn" onClick={this.expandCollapse(true)}>
                            Collapse all
                        </Link>
                    </div>
                    <div className="float-right">
                        <Link className="tree-select__clear-btn" onClick={this.clearSelected}>
                            Clear selected
                        </Link>
                    </div>
                </div>
                <div className="select__options" style={{ clear: 'both', margin: '20px 0 0 0' }}>
                    <List
                        options={this.options}
                        value={this.state.selected}
                        search={this.state.search.toLowerCase()}
                        onChange={this.onChange}
                        tree={this.tree}
                    />
                </div>
                {this.props.footer ? <div className="select__popup-footer">{this.props.footer}</div> : null}
            </div>
        );
    };

    handleInputRef = input => {
        setTimeout(() => {
            if (input) {
                input.focus();
                this.setState({
                    search: ''
                });
            }
        }, 50);
    };

    clearSelected = () => {
        this.setState(
            {
                selected: []
            },
            () => this.props.onChange(this.state.selected)
        );
    };

    expandCollapse = collapsed => e => {
        e.preventDefault();
        this.props.options.forEach(opt => {
            opt.collapsed = collapsed;
        });
        this.forceUpdate();
    };
}

class List extends React.Component {
    static selected = {
        NONE: 0,
        ALL: 1,
        SOME: 2
    };

    state = {
        selected: this.props.value ? [...this.props.value] : [],
        search: ''
    };

    componentWillReceiveProps(props) {
        if (props.value) {
            this.setState({
                selected: [...props.value] || []
            });
        }
    }

    isSelected = item => {
        if (item.leaf) {
            return this.state.selected.indexOf(item.id) > -1 ? List.selected.ALL : List.selected.NONE;
        } else if (
            item.children &&
            item.children.reduce((pv, it) => {
                if (pv) {
                    return this.isSelected(it) === List.selected.ALL;
                }
                return pv;
            }, true)
        ) {
            return List.selected.ALL;
        }

        if (this.findSelectedChild(item)) {
            return List.selected.SOME;
        }

        return List.selected.NONE;
    };

    findSelectedChild = item => {
        return (
            item.children &&
            item.children.find(child => {
                return this.isSelected(child) !== List.selected.NONE;
            })
        );
    };

    enable = option => {
        return this.select(option)(true);
    };

    disable = option => {
        return this.select(option)(false);
    };

    select = option => value => () => {
        if (this.isSelected(option)) {
            if (value === true) {
                return;
            }
            if (option.leaf) {
                this.state.selected = this.state.selected.filter(id => id !== option.id);
            } else {
                option.children && option.children.forEach(o => this.disable(o)());
            }
        } else {
            if (value === false) {
                return;
            }
            if (option.leaf) {
                this.state.selected = [...this.state.selected, option.id];
            } else {
                option.children && option.children.forEach(o => this.enable(o)());
            }
        }

        this.setState(
            {
                selected: this.state.selected
            },
            this.sync
        );
    };

    sync = () => this.props.onChange(this.selected);

    calcDepth = option => {
        let p = option.parent;
        let count = 1;
        // placeholders don't have ID
        while (p && p.id) {
            p = p.parent;
            count++;
        }
        return count;
    };

    renderItem = (index, key) => {
        const option = this.options[index];
        if (!this.isVisible(option)) {
            return null;
        }

        const selected = this.isSelected(option);
        const isBroken = !option.leaf && (!option.children || option.children.length === 0);

        return (
            <div
                className="check-box-list__item tree-select"
                key={option.id}
                style={{
                    paddingLeft: (this.calcDepth(option) * 6 - 3) * 4 + 'px',
                    color: option.active ? 'black' : 'grey'
                }}
            >
                {option.children ? (
                    <span
                        className={['expand im icon-arrow-down', this.isCollapsed(option) ? ' collapsed' : ''].join(
                            ' '
                        )}
                        onClick={this.toggleExpanded(option)}
                    />
                ) : (
                    <span className={'expand'} />
                )}
                <span onClick={this.select(option)()}>
                    <span className="check-box-list__check-box">
                        {selected === List.selected.ALL ? (
                            <div className="checkbox checked">
                                <i className="im icon-ok" />
                            </div>
                        ) : null}
                        {selected === List.selected.NONE ? <div className="checkbox" /> : null}
                        {selected === List.selected.SOME ? (
                            <div className="checkbox checked">
                                <i className="im ion-minus" />
                            </div>
                        ) : null}
                    </span>
                    <span
                        className={['check-box-list__label', isBroken ? 'check-box-list__broken' : ''].join(' ')}
                        key={key}
                    >
                        {option.displayString}
                    </span>
                </span>
            </div>
        );
    };

    isCollapsed = option => {
        return option.collapsed;
    };

    isParentCollapsed = option => {
        let p = option.parent;
        while (p) {
            if (this.isCollapsed(p)) {
                return true;
            }
            p = p.parent;
        }
    };

    isFound = option => {
        const match = option.searchString.indexOf(this.props.search) !== -1;
        if (match) {
            return true;
        }
        if (option.children) {
            return option.children.reduce((prev, child) => {
                if (prev) {
                    return prev;
                }
                return this.isFound(child);
            }, false);
        }

        let p = option.parent;
        while (p && p.displayString) {
            if (p.searchString.indexOf(this.props.search) !== -1) {
                return true;
            }
            p = p.parent;
        }

        return match;
    };

    isVisible = option => {
        if (this.props.search !== '') {
            if (this.isFound(option)) {
                return !this.isParentCollapsed(option);
            }

            if (option.children) {
                return option.children.reduce((prev, child) => {
                    if (prev) {
                        return prev;
                    }
                    return this.isFound(child);
                }, false);
            }

            return false;
        }
        return !this.isParentCollapsed(option);
    };

    toggleExpanded = option => () => {
        option.collapsed = !option.collapsed;

        this.setState({
            render: Date.now()
        });
    };

    renderOptions = (items, ref) => {
        return <div ref={ref}>{items}</div>;
    };

    get options() {
        return this.props.options.filter(o => this.isVisible(o));
    }

    get selected() {
        return this.state.selected.filter(id => {
            const item = this.props.options.find(o => o.id === id);
            if (!item) {
                console.warn('Impossible value detected');
            }
            return this.isSelected(item) === List.selected.ALL;
        });
    }

    renderTree = tree => {
        return tree.leaf ? (
            <div>{tree.displayString}</div>
        ) : (
            <details open>
                <summary>{tree.displayString}</summary>
                <div>{tree.children ? tree.children.map(chilld => this.renderTree(chilld)) : null}</div>
            </details>
        );
    };

    render() {
        return (
            <ReactList
                itemRenderer={this.renderItem}
                itemsRenderer={this.renderOptions}
                length={this.options.length}
                type="uniform"
            />
        );
    }
}

export const TreeSelect = keyBoardNav(true)(TreeSelectRaw);

export class TreeWithInactiveSwitch extends React.Component {
    static propTypes = {
        ...TREE_PROPS,
        label: PropTypes.node
    };

    static defaultProps = {
        label: 'Display inactive',
        onChange: noop
    };

    state = {
        showInactive: false,
        value: []
    };

    setVisibility = value => this.setState({ showInactive: value });

    constructor(...r) {
        super(...r);
        this.state.value = this.props.value;
    }

    doChange = value => {
        this.setState({ value }, this.sync);
    };

    sync = () => {
        this.props.onChange(this.state.value);
    };

    render() {
        return (
            <TreeSelect
                {...this.props}
                options={this.props.options.filter(o => this.state.showInactive || o.active)}
                value={this.state.value}
                onChange={this.doChange}
                footer={
                    <CheckBox onChange={this.setVisibility} value={this.state.showInactive} label={this.props.label} />
                }
            />
        );
    }
}
