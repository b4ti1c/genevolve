'use strict';

const _ = require('lodash');


class Configurator {
    constructor() { this.configure(); }

    configure(configuration) {
        let config = _.assign({
            bias: true,
            printPrecision: 2,
            neuronInit: _ => Math.random(),
            activator: 'binary'
        }, configuration || {});

        this.bias = config.bias;
        this.printPrecision = config.printPrecision;
        this.neuronInit = config.neuronInit;

        if (_.isString(config.activator)) {
            switch (config.activator) {
                case 'as-is': this.activator = Configurator.asIs; break;
                case 'binary': this.activator = Configurator.binary; break;
                case 'sigmoid': this.activator = Configurator.sigmoid(config.sigma || 1); break;
                default:
                    throw new Error('Unknown activator function!');
            };
        } else this.activator = config.activator;
    }

    static asIs(x) { return x; }
    static binary(x) { return x > 0.5 ? 1 : 0; }
    static sigmoid(sigma) { return x => 1 / (1 + Math.exp(-x / sigma)); }
}


module.exports = new Configurator();
