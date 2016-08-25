'use strict';
import React from 'react';
import categories from '../data/categories';
import {Link} from 'react-router';

export default class MenuBar extends React.Component {
    render() {
        return (
            <div className="menu-bar">
                <div className="sidebar">
                    <div className="rosmary-logo" title="Rosmary framework 0.1"></div>
                    {this.createCategory()}
                </div>
            </div>
        );
    }

    createSubCategory(category, subcategories) {
        return subcategories.map((sc) => {
            return (<Link to={`/${category.toLowerCase()}/${sc.name.toLowerCase()}`} key={sc.name}
                         className="item">{sc.name}</Link>);
        });
    }

    createCategory() {
        return categories.map((category) => {
            return (
                <div key={category.name} className="item">
                    <div className="header">{category.name}</div>
                    <div className="menu">
                        {this.createSubCategory(category.name, category.subcategories)}
                    </div>
                </div>
            );
        });
    }
}
