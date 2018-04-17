import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import CheckBox from './CheckBox';

storiesOf('CheckBox', module)
    .add('Checked', () => <CheckBox onChange={action('onChange')} checked title="This is Title" />)
    .add('Disabled', () => <CheckBox title="title title" checked disabled />)
    .add('Uncontrolled CheckBox', () => <CheckBox />);
