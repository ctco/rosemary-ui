import React from 'react';
import {Router, Route, IndexRoute, IndexRedirect, browserHistory} from 'react-router';
import categories from '../data/categories';

import Tabs from '../layout/tab/Tabs';
import TimelogLibrary from '../components/TimelogLibrary';


/**
 *
 * @param {Component} tabs component
 * @return {Component} returns wrapped component
 * @api public
 */
export let cTabs = function ctabs(tabs) {
    return class extends React.Component {
        render() {
            return (
                <Tabs tabs={tabs}>
                    {this.props.children}
                </Tabs>
            );
        }
    };
};

function removeSpaces(str) {
    return str.replace(/\s/g, '');
}

const routes = categories.map((category) => {
    return category.subcategories.map((subcategory) => {
        let components = subcategory.components.map((component, index) => {
            if (index === 0) {
                return (<IndexRoute key={index} component={component.component}/>);
            }
            return (<Route key={index} path={component.name.toLowerCase()} component={component.component}/>);
        });

        let names = subcategory.components.map((component, index) => {
            let name = component.name;
            let link;

            if (index === 0) {
                link = `/${category.name.toLowerCase()}/${subcategory.name.toLowerCase()}`;
            } else {
                link = `/${category.name.toLowerCase()}/${subcategory.name.toLowerCase()}/${component.name.toLowerCase()}`;
            }

            return {name, link};
        });

        return (
            <Route path={`/${category.name.toLowerCase()}/${subcategory.name.toLowerCase()}`} component={cTabs(names)}>
                {components}
            </Route>
        );
    });
});

export default <Router history={browserHistory}>
    <Route path="/">
        <IndexRedirect to="/rosemary-ui/"/>
        <Route path="/rosemary-ui/" component={TimelogLibrary}>
            {routes}
        </Route>
    </Route>
</Router>;
