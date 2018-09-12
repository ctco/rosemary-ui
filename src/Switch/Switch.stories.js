import React from 'react';
import { storiesOf } from '@storybook/react';
import Switch from './Switch';

storiesOf('Switch', module)
    .add('Controlled', () => <Switch onChange={value => console.log(value)} value={false} title="This is Title" />)
    .add('Checked Not Controlled', () => (
        <Switch onChange={value => console.log(value)} checked title="This is Title" />
    ))
    .add('Disabled', () => <Switch title="title title" disabled />)
    .add('Uncontrolled Switch', () => <Switch />)
    .add('All in one', () => <div style={{margin: "10px"}}>
        <Switch title="This is title"/>
        <br />
        <br />
        <Switch title="This is title" value true/>
        <br />
        <br />
        <Switch title="This is title" disabled/>
        <br />
        <br />
        <Switch title="This is title" value={true} disabled/>
    </div>);
