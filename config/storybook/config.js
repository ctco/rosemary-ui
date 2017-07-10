import { configure ,addDecorator} from '@kadira/storybook';
import {withKnobs} from '@kadira/storybook-addon-knobs';

const req = require.context('../../src/components', true, /.stories.js$/);
function loadStories() {
    req.keys().forEach((filename) => req(filename));
}

addDecorator(withKnobs);
configure(loadStories, module);