'use strict';

const _ = require('lodash');
const Person = require('genevolve/genetic/person');
const Net = require('genevolve/network/net');


/**
 * Input: 2 numbers
 * Operation: Calculate linear combinations of input numbers
 * Output: 2 numbers - [<sum>, <dif>]
 */
class Adder extends Person {
    constructor(opt_serializedGenome) { super(opt_serializedGenome); }

    initGenome() {
        this.net = new Net({
            numOfInputs: 2,
            numOfOutputs: 2,
        }); 
    }

    static neuronConfiguration() {
        return {
            bias: false,
            printPrecision: 2,
            //Initialize weights randomly between [-1, 1]
            neuronInit: _ => Math.random() * 2 - 1,
            activator: 'as-is'
        }
    }

    getGenome() { return this.net.serializeGenome(); }

    setGenome(gene) { this.net.deserializeGenome(gene); }

    test(inputs) { return this.net.ignite(inputs); }

    getFitness(data) {
        const netOutputs = this.test(data.inputs);

        //We sum the Mean Square Error between expected output and net output
        const fitness = netOutputs.reduce((mse, output, index) => 
            mse + Math.pow(output - data.outputs[index], 2), 0);

        return fitness;
    }

    static compare(fitnessA, fitnessB) {
        return fitnessA - fitnessB;
    }

    static TestData() {
        const num1 = Math.random();
        const num2 = Math.random();

        return {
            inputs: [num1, num2],
            outputs: [num1 + num2, num1 - num2]
        };
    }
}


module.exports = Adder;
