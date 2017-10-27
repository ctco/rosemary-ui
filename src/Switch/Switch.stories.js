import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Switch from './Switch';

storiesOf('Switch', module)
    .add('Controlled', () => <Switch onChange={value => console.log(value)} value={false} title="This is Title" />)
    .add('Checked Not Controlled', () => (
        <Switch onChange={value => console.log(value)} checked title="This is Title" />
    ))
    .add('Disabled', () => <Switch title="title title" disabled />)
    .add('Uncontrolled Switch', () => <Switch />);
