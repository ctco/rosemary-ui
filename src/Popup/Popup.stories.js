import { storiesOf } from '@storybook/react/dist/client/preview/index';
import Popup from './Popup';
import React from 'react';

storiesOf('Popup', module)
    .add('should render content into body and toggle on click', () => {
        return (
            <Popup attachment="bottom right" on="click">
                <button>Show popup</button>
                <span className="open-test-content">Popup content</span>
            </Popup>
        );
    })

    .add('should appear on hover', () => {
        return (
            <Popup attachment="bottom right">
                <button>Show popup</button>
                <span>Popup content</span>
            </Popup>
        );
    })

    .add('should disappear on click outside', () => {
        return (
            <Popup attachment="bottom right" on="click">
                <button>Show popup</button>
                <span>Popup content</span>
            </Popup>
        );
    })

    .add('should not disappear on click outside for modal popup', () => {
        return (
            <Popup attachment="middle center" on="click" modal={true}>
                <button>Show popup</button>
                <span>Popup content</span>
            </Popup>
        );
    });
