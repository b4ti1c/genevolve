'use strict';

const _ = require('lodash');
const Person = require('genevolve/genetic/person');
const Net = require('genevolve/network/net');


/**
 * Input: 2 numbers
 * Operation: Calculate both the sum and the difference of input numbers
 * Output: 2 numbers - [<sum>, <dif>]
 */
class Adder extends Person {
    constructor(opt_serializedGenome) { super(opt_serializedGenome); }

    initGenome() {
        this.net = new Net({
            numOfInputs: 2,
            numOfOutputs: 2,
            hiddenLayers: 0,
            neuronsInHiddenLayer: 0
        }); 
    }

    getGenome() { return this.net.serializeGenome(); }

    setGenome(gene) { this.net.deserializeGenome(gene); }

    test(inputs) { return this.net.ignite(inputs); }

    getFitness(opt_inputs) {
        const inputs = _.assign({
            num1: Math.random(),
            num2: Math.random()
        }, opt_inputs || {});

        const netOutput = this.net.ignite([inputs.num1, inputs.num2]);
        const expectedOutput1 = inputs.num1 + inputs.num2;
        const expectedOutput2 = inputs.num1 - inputs.num2;

        //We sum the Mean Square Error for both the sum and the difference
        const fitness = Math.pow(expectedOutput1 - netOutput[0], 2) +
                        Math.pow(expectedOutput2 - netOutput[1], 2);

        return fitness;
    }

    static compare(adderA, adderB) {
        return adderA.getFitness({num1: 0.2, num2: 0.3}) - adderB.getFitness({num1: 0.2, num2: 0.3});
    }

    static compareFitnesses(fitnessA, fitnessB) {
        return fitnessA - fitnessB;
    }
}


module.exports = Adder;
