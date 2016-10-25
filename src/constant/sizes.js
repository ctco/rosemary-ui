
import {PropTypes} from 'react';

export const SMALL = 'sm';
export const NORMAL = 'default';
export const LARGE = 'lg';

export const anySize = PropTypes.oneOf([SMALL, NORMAL, LARGE]);