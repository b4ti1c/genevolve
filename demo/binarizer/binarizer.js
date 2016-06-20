'use strict';

const _ = require('lodash');
const Person = require('genevolve').Person;
const Net = require('genevolve').Net;
const Chance = new require('chance')();


const precision = 6;

/**
 * Input: 1 numbers
 * Operation: Converts integer to 32 bit binary representation
 * Output: 32 numbers - [<binary>]
 */
class Binarizer extends Person {
    constructor(opt_serializedGenome) { super(opt_serializedGenome); }

    initGenome() {
        this.net = new Net({
            numOfInputs: 1,
            numOfOutputs: precision,
            neuronConfig: {
                weightGenerator: Binarizer.generateGene,       
                hasBias: false,                            
                printPrecision: Binarizer.getPrintPrecision(), 
                neuronActivation: 'linear'                  
            }
        }); 
    }

    getGenome() { return this.net.serializeGenome(); }

    setGenome(gene) { this.net.deserializeGenome(gene); }

    genomeToString() { return this.net.toString(); }

    test(inputs) { return [Binarizer.processOutput(this.net.ignite(inputs))]; }

    getFitness(data) {
        const netOutput = this.test(data.inputs);
        const expected = Binarizer.processOutput(data.outputs);
        const fitness = Math.pow(netOutput[0] - expected, 2);

        return fitness;
    }

    static compare(fitnessA, fitnessB) {
        return fitnessA - fitnessB;
    }

    static generateGene() { return Math.random(); }

    static getPrintPrecision() { return 3; }

    static processOutput(out) {
        return out.reduce((p, c, i) => p + parseFloat(c, 10) * Math.pow(2, i), 0);
        // return parseFloat(out[0], 10) * 8 + parseFloat(out[1], 10) * 4 + parseFloat(out[2], 10) * 2 + parseFloat(out[3], 10);
    }

    static TestData() {
        const num = Chance.integer({min: 1, max: Math.pow(2, precision) - 1});
        const bin = ('00000000000000000000000000000000' + num.toString(2)).slice(-1 * precision).split('').reverse();

        return {
            inputs: [num],
            outputs: bin
        };
    }
}


module.exports = Binarizer;
