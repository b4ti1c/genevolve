import * as _ from 'lodash'

var Neuron = function(numOfinputs) {
	this.weights = _.map(new Array(numOfinputs), () => Math.random() * 2 - 1);
	//this.weights = _.map(new Array(numOfinputs), () => Math.random();
	this.threshold = Math.random();
	//this.learningRate = 0.1;
};


Neuron.prototype.ignite = function(inputs){
	if(inputs.length != this.weights.length) throw new Error('Input number does not match weights');

	var sum = this.weights.reduce((pv, cur, i) => pv + cur * inputs[i], -1 * this.threshold);
	this.activation = this.sigmoid(sum);

	return this.activation;
};


Neuron.prototype.sigmoid = function(x){
	//var p = 1.0;
	//return 1 / (1 + Math.exp(-x / p));
	return x;
};


Neuron.prototype.train = function(errorSignal){
	this.weights = this.weights.map((weight) => weight + this.learningRate * errorSignal * this.activation);
};


Neuron.prototype.getGenome = function(){
	return this.weights.concat(this.threshold);
};


Neuron.prototype.setGenome = function(gene){
	this.threshold = gene.slice(-1)[0];
	this.weights = gene.slice(0, gene.length - 1);
};


Neuron.prototype.toString = function(){
	var str = this.weights.map((e) => e.toFixed(2)).join(', ') + ' || ' + this.threshold.toFixed(2);
	return 'Neuron (' + this.weights.length + ' inputs) : ' + str;
}

export default Neuron