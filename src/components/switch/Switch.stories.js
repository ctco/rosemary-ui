import React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import Switch from './Switch.js';

storiesOf('Switch', module)
    .add('Checked', () => (
        <Switch checked/>
    ))
    .add('Disabled', () => (
        <Switch checked disabled/>
    ))
    .add('Uncontrolled Switch', () => (
        <Switch />
    ));
