import React from 'react';
import {storiesOf} from '@kadira/storybook';
import MonthPicker from './MonthPicker';
import Button from '../button/Button';

storiesOf('MonthPicker', module)
    .add('default', () => (
        <div style={{textAlign: 'center'}}>
            <MonthPicker>
                <Button className="btn-link"/>
            </MonthPicker>
        </div>
    ));
