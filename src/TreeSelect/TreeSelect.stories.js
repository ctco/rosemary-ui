import React from 'react';
import { storiesOf, action } from '@storybook/react';
import noop from 'lodash/noop';

import { TreeSelect, SingleTreeSelect, TreeWithInactiveSwitch } from './TreeSelect';

let nextId = 0;
const makeOption = (displayString, treeNodeHash, leaf, active = true, id = null) => {
    nextId++;
    return {
        id: id === null ? nextId : id,
        displayString,
        treeNodeHash,
        leaf,
        active
    };
};
const options = [
    makeOption('A Test 1', '1'),
    makeOption('B Test 11', '11', true, false),
    makeOption('C Test 12', '12', false),
    makeOption('D Test 121', '121', true),
    makeOption('X Test 13', '3', true, false, -1),
    makeOption('E Test 2', '2'),
    makeOption('F Test 21', '21', true)
];

storiesOf('TreeSelect', module)
    .add('basic', () => <TreeSelect hashLength={1} options={options} onChange={noop} />)
    .add('showActive', () => <TreeWithInactiveSwitch hashLength={1} options={options} value={[4]} />)
    .add('single select', () => (
        <div style={{ textAlign: 'center' }}>
            <SingleTreeSelect
                hashLength={1}
                options={options}
                onChange={action('onChange')}
                label="+ Add Org. Unit"
                sort={(a, b) => {
                    if (a.id === -1) {
                        return -1;
                    }
                    if (b.id === 1) {
                        return 1;
                    }
                    return a.displayString.localeCompare(b.displayString);
                }}
            />
        </div>
    ));
