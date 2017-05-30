import React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import Switch from './Switch.js';

storiesOf('Switch', module)
    .add('Checked', () => (
        <Switch checked title="This is Title"/>
    ))
    .add('Disabled', () => (
        <Switch title="title title" checked disabled/>
    ))
    .add('Uncontrolled Switch', () => (
        <Switch />
    ));
