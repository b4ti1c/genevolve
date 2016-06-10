import NeuralNet from './NeuralNet.js'
import GeneticEvolver from './GeneticEvolver.js'
import * as _ from 'lodash'

var personCreator = function(){
	return {
		net: new NeuralNet(2, 2, 0, 0),
		name: _.sample('abcdefghijklmnopqrstuvwxyz'.split(''), 5).join('')
	};
};

var errorGenerator = function(person){
	let num1 = Math.random();
	let num2 = Math.random();

	let out = person.net.igniteNet([num1, num2]);
	let addition = out[0];
	let subtraction = out[1];

	let fitness = Math.pow(num1 + num2 - addition, 2) + Math.pow(num1 - num2 - subtraction, 2);

	//let out = person.net.igniteNet([0.05, 0.01])[0];
	//let fitness = Math.abs(0.04 - out);

	//console.log('training with', num1.toFixed(2), num2.toFixed(2), out.toFixed(2));
	return fitness;
};

var errorComparator = function(fitnessA, fitnessB){
	return Math.abs(fitnessA) - Math.abs(fitnessB);
};


var genomeGetter = function(person){
	return person.net.getGenome();
};	

var genomeSetter = function(person, genome){
	person.net.setGenome(genome);
};

var adder = new GeneticEvolver(personCreator, errorGenerator, errorComparator, genomeGetter, genomeSetter);

var tester = function(person){
	return person.net.igniteNet([0.05, 0.01]);
};

console.log('INITIAL')
console.log(adder.generateOutputWithTestFunction(tester));

for(let i = 0; i < 10000; i++){
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
