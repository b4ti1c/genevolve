'use strict';

const _ = require('lodash');


class ConfigurationHelper {
    static validate(configuration) {
        let config = _.assign({
            hasBias: true,
            printPrecision: 2,
            weightGenerator: _ => Math.random(),
            neuronActivation: 'binary'
        }, configuration || {});

        let hasBias, printPrecision, weightGenerator, neuronActivation;

        hasBias = config.hasBias;
        printPrecision = config.printPrecision;
        weightGenerator = config.weightGenerator;

        if (_.isString(config.neuronActivation)) {
            switch (config.neuronActivation) {
                case 'as-is': neuronActivation = ConfigurationHelper.asIs; break;
                case 'binary': neuronActivation = ConfigurationHelper.binary; break;
                case 'sigmoid': neuronActivation = ConfigurationHelper.sigmoid(config.sigma || 1); break;
                default:
                    throw new Error('Unknown neuronActivation function!');
            };
        } else neuronActivation = config.neuronActivation;

        return {hasBias, printPrecision, weightGenerator, neuronActivation};
    }

    static asIs(x) { return x; }
    static binary(x) { return x > 0.5 ? 1 : 0; }
    static sigmoid(sigma) { return x => 1 / (1 + Math.exp(-x / sigma)); }
}


module.exports = ConfigurationHelper;
