import * as React from 'react';
import PropTypes from 'prop-types';
import ReactList from 'react-list';

import { PROPERTY_TYPES as msPropTyes } from '../MultiSelect/MultiSelect';
import keyBoardNav from '../Select/KeyBoardNav';
import classNames from 'classnames';

import Link from '../Link';
import InputIcon from '../InputIcon';

const TREE_PROPS = {
    ...msPropTyes,
    hashLength: PropTypes.number.isRequired,
    renderHeader: PropTypes.func,
    footer: PropTypes.node,
    multiple: PropTypes.bool,
    highlightBroken: PropTypes.bool
};

export class TreeSelectContent extends React.Component {
    static propTypes = TREE_PROPS;

    static defaultProps = {
        hashLength: 6,
        multiple: true,
        highlightBroken: true,
        sort: (ak, bk) => ak.displayString.localeCompare(bk.displayString)
    };

    state = {
        search: ''
    };

    optionsIn = [];

    render() {
        // create a local copy of options - to prevent props modification
        this.optionsIn = [
            ...this.props.options.reduce((m, o) => m.set(o.id, Object.assign(m.get(o.id) || {}, o)), new Map()).values()
        ];

        this.optionsIn.forEach(item => {
            item.children = null;
            // allow to use Tree select as simple select
            item.treeNodeHash = item.treeNodeHash || item.id;
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
        return this.renderOptions();
    }

    onChange = newValue => {
        this.props.onChange(newValue);
    };

    buildOptionsFromTree(tree, options = []) {
        if (!tree) {
            return [];
        }

        tree.children.sort(this.props.sort);
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
                    {this.props.renderHeader ? (
                        this.props.renderHeader(this)
                    ) : (
                        <div>
                            <div className="float-left">
                                <Link testId="tree_select_expand_all"
                                      className="tree-select__clear-btn" onClick={this.expandCollapse(false)}>
                                    Expand all
                                </Link>
                                <Link testId="tree_select_collapse_all"
                                      className="tree-select__clear-btn" onClick={this.expandCollapse(true)}>
                                    Collapse all
                                </Link>
                            </div>
                            {this.props.multiple && (
                                <div className="float-right">
                                    <Link testId="tree_select_clear_selected"
                                          className="tree-select__clear-btn"
                                          onClick={this.clearSelected}>
                                        Clear selected
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="select__options" style={{ clear: 'both', margin: '20px 0 0 0' }}>
                    <List
                        options={this.options}
                        value={this.props.value}
                        search={this.state.search.toLowerCase()}
                        onChange={this.onChange}
                        tree={this.tree}
                        toggleExpanded={this.toggleExpanded}
                        multiple={this.props.multiple}
                        highlightBroken={this.props.highlightBroken}
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
        this.props.onChange([]);
    };

    expandCollapse = collapsed => e => {
        e.preventDefault();
        this.props.options.forEach(opt => {
            opt.collapsed = collapsed;
        });
        this.forceUpdate();
    };

    toggleExpanded = option => {
        const opt = this.props.options.find(op => op.id === option.id);
        opt.collapsed = !opt.collapsed;
    };
}

class List extends React.Component {
    static propTypes = {
        highlightBroken: PropTypes.bool
    };

    static selected = {
        NONE: 0,
        ALL: 1,
        SOME: 2
    };

    static defaultProps = {
        value: []
    };

    isSelected = item => {
        if (!this.props.multiple) {
            return this.props.value === item.id;
        }

        if (item.leaf) {
            return this.props.value.indexOf(item.id) > -1 ? List.selected.ALL : List.selected.NONE;
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
        if (this.props.multiple) {
            this.selectMultiple(option, value);
        } else {
            this.selectSingle(option, value);
        }
    };

    selectSingle = (option, value) => {
        this.props.onChange(option.id);
    };

    selectMultiple = (option, value) => {
        let newValue;

        if (this.isSelected(option)) {
            if (value === true) {
                return;
            }

            const leafs = this.getLeafs(option);
            newValue = this.props.value.filter(id => !leafs.find(leaf => leaf === id));
        } else {
            if (value === false) {
                return;
            }

            const leafs = this.getLeafs(option);
            const newValueSet = new Set(this.props.value);
            leafs.forEach(leaf => newValueSet.add(leaf));

            newValue = [...newValueSet];
        }

        this.props.onChange(newValue);
    };

    getLeafs = option => {
        const result = [];
        const stack = [option];

        while (stack.length !== 0) {
            const current = stack.pop();
            current.children && current.children.forEach(child => stack.push(child));
            if (current.leaf) {
                result.push(current.id);
            }
        }

        return result;
    };

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
        const isBroken =
            this.props.highlightBroken && !option.leaf && (!option.children || option.children.length === 0);

        const className = classNames('check-box-list__item tree-select', {
            'single-tree-select--selected': !this.props.multiple && selected,
            'tree-select--inactive': !option.active
        });

        return (
            <div
                className={className}
                key={option.id}
                style={{
                    paddingLeft: (this.calcDepth(option) * 6 - 3) * 4 + (option.children ? 0 : 16) + 'px'
                }}
            >
                {option.children ? (
                    <span
                        className={['expand im icon-arrow-down', this.isCollapsed(option) ? ' collapsed' : ''].join(
                            ' '
                        )}
                        onClick={this.toggleExpanded(option)}
                    />
                ) : null}
                <span onClick={this.select(option)()}
                      data-test-id={option.displayString + "_select_option"}
                      data-test-checked={selected === true || (option.leaf && selected === List.selected.ALL)}
                >
                    {this.props.multiple && (
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
                    )}
                    <span
                        className={[
                            'check-box-list__label',
                            'tree-select__label',
                            isBroken ? 'check-box-list__broken' : '',
                            option.className ? option.className : ''
                        ].join(' ')}
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
        this.props.toggleExpanded(option);
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
        if (this.props.multiple) {
            return this.props.value.filter(id => {
                const item = this.props.options.find(o => o.id === id);
                if (!item) {
                    console.warn('Impossible value detected');
                }
                return this.isSelected(item) === List.selected.ALL;
            });
        } else {
            if (!this.props.value) {
                return null;
            }

            const item = this.props.options.find(o => o.id === this.props.value);
            if (!item) {
                console.warn('Impossible value detected');
            }
            return this.props.value;
        }
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

class Single extends React.Component {
    render() {
        return <TreeSelectContent {...this.props} multiple={false} />;
    }
}

class Multi extends React.Component {
    render() {
        return <TreeSelectContent {...this.props} />;
    }
}

export const SingleTreeSelectContent = keyBoardNav(false)(Single);
export const MultiTreeSelectContent = keyBoardNav(true)(Multi);
