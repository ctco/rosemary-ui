import React from 'react';
import { storiesOf } from '@storybook/react';
import MonthPicker from './MonthPicker';
import Button from '../Button/Button';

storiesOf('MonthPicker', module).add('default', () => (
    <div style={{ textAlign: 'center' }}>
        <MonthPicker>
            <Button className="btn-link" />
        </MonthPicker>
    </div>
));
