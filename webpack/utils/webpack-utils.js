var _ = require('lodash');

var customizer = function(objValue, srcValue) {
    if (_.isArray(objValue)) {
        return objValue.concat(srcValue);
    }
};

module.exports.merge = function merge(defaults, config) {
    return _.mergeWith({}, defaults, config, customizer);
};
