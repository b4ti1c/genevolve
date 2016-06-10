import NeuronLayer from './NeuronLayer.js'
import * as _ from 'lodash'

var NeuralNet = function(numOfOutput, numOfInput, numOfHiddenLayer = 0, numOfNeuronPerHiddenLayer = 1){
	this.net = [];
	if(numOfHiddenLayer == 0)
		this.net.push(new NeuronLayer(numOfOutput, numOfInput));
	else {
		this.net.push(new NeuronLayer(numOfNeuronPerHiddenLayer, numOfInput));
		while(numOfHiddenLayer--)
			this.net.push(new NeuronLayer(numOfNeuronPerHiddenLayer, numOfNeuronPerHiddenLayer));
		this.net.push(new NeuronLayer(numOfOutput, numOfNeuronPerHiddenLayer));
	}
};


NeuralNet.prototype.igniteNet = function(inputs){
	return this.net.reduce((pv, cur) => cur.igniteLayer(pv), inputs);
};


NeuralNet.prototype.train = function(errors){
	var errorSignals = errors.map((error, index) => error * (1 -this.net[this.net.length]));

	for(let i = this.net.length - 1; i >= 0; i++){
			
	}
};


NeuralNet.prototype.getGenome = function(){
	return _.flattenDeep(this.net.map((layer) => layer.getGenome()));
};


NeuralNet.prototype.setGenome = function(genes){
	var start = 0;
	this.net.forEach((layer) => {
		layer.setGenome(genes.slice(start, start + layer.numOfGenesPerNeuron * layer.numOfNeurons));
		start += layer.numOfGenesPerNeuron * layer.numOfNeurons;
	});
};


NeuralNet.prototype.toString = function(){
	return this.net.join('\n-------------------\n') + '\n';
};

export default NeuralNet
