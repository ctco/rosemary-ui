import PropTypes from 'prop-types';

export const SMALL = 'sm';
export const NORMAL = 'default';
export const LARGE = 'lg';

export const anySize = PropTypes.oneOf([SMALL, NORMAL, LARGE]);
