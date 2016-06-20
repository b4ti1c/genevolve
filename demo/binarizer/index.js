'use strict';

const _ = require('lodash');
const Evolver = require('genevolve').Evolver;
const Binarizer = require('./binarizer');
const Chance = new require('chance')();



var binarizer = new Evolver({
    Person: Binarizer, 
    populationSize: 200,
    mutationProbability: 0.2,
    maximumMutation: 0.2
});

console.log('INITIAL')
binarizer.testAndPrintPopulation([7], [0,1,1,1]);

for(let i = 0; i < 500; i++){
    if (i % 50 == 0) console.log('GENERATION ' + i);
    binarizer.evolve();
}
console.log('FINAL');
binarizer.testAndPrintPopulation([7], [0,1,1,1]);

var leader = binarizer.getMostFitPerson();

console.log(leader.toString());

for (let i = 0; i < 30; i++) {
    let num = Chance.integer({min: 0, max: Math.pow(2, 6) - 1});
    console.log(num, leader.test([num]));
}





// console.log('INITIAL');

// let leader;
// leader = mult.getMostFitPerson();

// console.log(leader.toString());

// mult.evolve(50);

// leader = mult.getMostFitPerson();

// console.log(leader.toString());
