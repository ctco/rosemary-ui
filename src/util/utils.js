import {isUndefined} from 'lodash';

function isFunction(possibleFunction) {
    return typeof possibleFunction === 'function';
}

function isDefined(value) {
    return !isUndefined(value);
}

function isInArray(value, arr) {
    return arr.indexOf(value) !== -1;
}

function contains(value, value2) {
    return value.toUpperCase().indexOf(value2.toUpperCase()) !== -1;
}

export {
    isFunction,
    isDefined,
    isInArray,
    contains
};