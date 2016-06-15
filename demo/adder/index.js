'use strict';

const Evolver = require('genevolve/genetic/evolver');
const Adder = require('./adder');
const _ = require('lodash');


var adder = new Evolver({Person: Adder});

console.log('INITIAL')
adder.testAndPrintPopulation([0.05, 0.01]);

for(let i = 0; i < 3000; i++){
    console.log('GENERATION ' + i);
    adder.evolve();
}
console.log('FINAL');
adder.testAndPrintPopulation([0.05, 0.01]);

var leader = adder.getMostFitPerson();

console.log(leader.toString());


console.log(leader.test([0.05, 0.01]));
console.log(leader.test([0.2, 0.3]));
console.log(leader.test([0.1, 0.05]));
console.log(leader.test([0.25, 0.25]));
console.log(leader.test([0.7, 0.2]));
