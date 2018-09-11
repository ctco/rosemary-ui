import React from 'react';
import { storiesOf } from '@storybook/react';
import noop from 'lodash/noop';

import { TreeSelect, TreeWithInactiveSwitch } from './TreeSelect';

let nextId = 0;
const makeOption = (displayString, treeNodeHash, leaf, active = true) => {
    nextId++;
    return {
        id: nextId,
        displayString,
        treeNodeHash,
        leaf,
        active
    };
};
const options = [
    makeOption('Test 1', '1'),
    makeOption('Test 11', '11', true, false),
    makeOption('Test 12', '12', false),
    makeOption('Test 121', '121', true),
    makeOption('Test 13', '13', true, false),
    makeOption('Test 2', '2'),
    makeOption('Test 21', '21', true)
];

storiesOf('TreeSelect', module).add('basic', () => <TreeSelect hashLength={1} options={options} onChange={noop} />);
storiesOf('TreeSelect', module).add('showActive', () => (
    <TreeWithInactiveSwitch hashLength={1} options={options} value={[4]} />
));
