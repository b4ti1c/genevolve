'use strict';

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _NeuralNetJs = require('./NeuralNet.js');

var _NeuralNetJs2 = _interopRequireDefault(_NeuralNetJs);

var _GeneticEvolverJs = require('./GeneticEvolver.js');

var _GeneticEvolverJs2 = _interopRequireDefault(_GeneticEvolverJs);

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

var personCreator = function personCreator() {
	return {
		net: new _NeuralNetJs2['default'](2, 2, 0, 0),
		name: _.sample('abcdefghijklmnopqrstuvwxyz'.split(''), 5).join('')
	};
};

var fitnessCalculator = function fitnessCalculator(person) {
	var num1 = Math.random();
	var num2 = Math.random();

	var out = person.net.igniteNet([num1, num2]);
	var addition = out[0];
	var subtraction = out[1];

	var fitness = Math.pow(num1 + num2 - addition, 2) + Math.pow(num1 - num2 - subtraction, 2);

	//let out = person.net.igniteNet([0.05, 0.01])[0];
	//let fitness = Math.abs(0.04 - out);

	//console.log('training with', num1.toFixed(2), num2.toFixed(2), out.toFixed(2));
	return fitness;
};

var fitnessComparator = function fitnessComparator(fitnessA, fitnessB) {
	return Math.abs(fitnessA) - Math.abs(fitnessB);
};

var genomeGetter = function genomeGetter(person) {
	return person.net.getGenome();
};

var genomeSetter = function genomeSetter(person, genome) {
	person.net.setGenome(genome);
};

var adder = new _GeneticEvolverJs2['default'](personCreator, fitnessCalculator, fitnessComparator, genomeGetter, genomeSetter);

var tester = function tester(person) {
	return person.net.igniteNet([0.05, 0.01]);
};

console.log('INITIAL');
console.log(adder.generateOutputWithTestFunction(tester));

for (var i = 0; i < 10000; i++) {
	console.log('GENERATION ' + i);
	adder.evolve();
	//console.log(adder.generateOutputWithTestFunction(tester));
}
console.log('FINAL');
console.log(adder.generateOutputWithTestFunction(tester));

var leader = adder.getMostFitPerson();

console.log(leader.net.toString());

/*
console.log(leader.net.igniteNet([0.3, 0.6])[0]);
console.log(leader.net.igniteNet([0.1, 0.4])[0]);
console.log(leader.net.igniteNet([0.2, 0.3])[0]);
*/
console.log(leader.net.igniteNet([0.05, 0.01]));
console.log(leader.net.igniteNet([0.2, 0.3]));
console.log(leader.net.igniteNet([0.1, 0.05]));
console.log(leader.net.igniteNet([0.25, 0.25]));
console.log(leader.net.igniteNet([0.7, 0.2]));
