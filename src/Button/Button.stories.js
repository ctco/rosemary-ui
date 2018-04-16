import React from 'react';
import Button from './Button';
import { storiesOf } from '@storybook/react/dist/client/preview/index';

storiesOf('Button', module)
    .add('default', () => <Button>Button</Button>)
    .add('as href', () => (
        <Button href="#" as="a">
            Href button
        </Button>
    ));
