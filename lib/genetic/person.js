'use strict';

const _ = require('lodash');
const Chance = new require('chance')();


class Person {
    constructor(opt_initials) {
        this.name = Chance.integer({min: 0, max: 10000}) + ' - ' +
                    Chance.prefix() + ' ' +
                    Chance.name({middle: true});

        this.initGenome();
        if (opt_initials) this.setGenome(opt_initials);
    }

    initGenome() { throw new Error('InitGenome method must be overridden'); }

    getGenome() { throw new Error('GetGenome method must be overridden'); }

    setGenome(gene) { throw new Error('SetGenome method must be overridden'); }

    test(inputs) { throw new Error('Test method must be overridden'); }

    getFitness() { throw new Error('GetFitness method must be overridden'); }

    static compare(fitnessA, fitnessB) { throw new Error('CompareFitnesses method must be overridden'); }

    static TestData() { throw new Error('TestData method must be overridden'); }

    toString() {
        return 'Person: ' + this.name + '\n' + this.net.toString();
    }
}


module.exports = Person;
