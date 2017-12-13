import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import CheckBox from './CheckBox';

storiesOf('CheckBox', module)
    .add('Checked', () => <CheckBox onChange={action('onChange')} checked title="This is Title" />)
    .add('Disabled', () => <CheckBox title="title title" checked disabled />)
    .add('Uncontrolled CheckBox', () => <CheckBox />);
