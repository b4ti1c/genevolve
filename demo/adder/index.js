'use strict';

const _ = require('lodash');
const Evolver = require('genevolve').Evolver;
const Adder = require('./adder');


var adder = new Evolver({Person: Adder});

console.log('INITIAL')
adder.testAndPrintPopulation([0.05, 0.01]);

for(let i = 0; i < 3000; i++){
    if (i % 50 == 0) console.log('GENERATION ' + i);
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
