import React from 'react';
import Button from './Button';
import ButtonGroup from './ButtonGroup';

import { storiesOf } from '@storybook/react/dist/client/preview/index';

import classNames from 'classnames';

storiesOf('Button', module)
    .add('default', () => <Button>Button</Button>)
    .add('primary', () => <Button className="btn--primary">Primary Button</Button>)
    .add('as link', () => (
        <Button href="#" as="a" className={classNames('btn-link', 'btn--inline')}>
            as link
        </Button>
    ))
    .add('Group', () => (
        <ButtonGroup>
            <Button className="btn--grouped">Button</Button>
            <Button className="btn--grouped" selected={true}>
                Button
            </Button>
            <Button className="btn--grouped">Button</Button>
            <Button className="btn--grouped" disabled={true}>
                Button
            </Button>
            <Button className="btn--grouped" disabled={true} selected={true}>
                Button
            </Button>
            <Button className="btn--grouped">Button</Button>
        </ButtonGroup>
    ));
