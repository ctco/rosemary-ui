import {addDecorator, configure} from '@storybook/react';
import {withKnobsOptions} from '@storybook/addon-knobs';

addDecorator(withKnobsOptions({
    debounce: {wait: 100, leading: true}, // Same as lodash debounce.
    timestamps: true // Doesn't emit events while user is typing.
}));

const req = require.context('../../src', true, /.stories.js$/);

function loadStories() {
    req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);