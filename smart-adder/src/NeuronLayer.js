import * as _ from 'lodash'
import Neuron from './Neuron.js'

var NeuronLayer = function(numOfNeurons, numOfInputsPerNeuron){
	this.layer = _.map(new Array(numOfNeurons), () => new Neuron(numOfInputsPerNeuron));
	this.numOfGenesPerNeuron = numOfInputsPerNeuron + 1;
	this.numOfNeurons = numOfNeurons;
};

NeuronLayer.prototype.igniteLayer = function(inputs){
	return this.layer.map((neuron) => neuron.ignite(inputs));
};


NeuronLayer.prototype.trainLayer = function(errorSignals){
	this.layer.forEach(function(neuron, index){
		
	});
};


NeuronLayer.prototype.getGenome = function(){
	return this.layer.map((neuron) => neuron.getGenome());
};


NeuronLayer.prototype.setGenome = function(genes){
	var start = 0;
	this.layer.forEach((neuron) => {
		neuron.setGenome(genes.slice(start, start + this.numOfGenesPerNeuron));
		start += this.numOfGenesPerNeuron;
	});
};


NeuronLayer.prototype.toString = function(){
	var str = this.layer.join('\n');

	return 'Layer with ' + this.numOfNeurons + ' neurons\n' + str;
};


export default NeuronLayer
