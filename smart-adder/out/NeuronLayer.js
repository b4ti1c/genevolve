'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

var _NeuronJs = require('./Neuron.js');

var _NeuronJs2 = _interopRequireDefault(_NeuronJs);

var NeuronLayer = function NeuronLayer(numOfNeurons, numOfInputsPerNeuron) {
	this.layer = _.map(new Array(numOfNeurons), function () {
		return new _NeuronJs2['default'](numOfInputsPerNeuron);
	});
	this.numOfGenesPerNeuron = numOfInputsPerNeuron + 1;
	this.numOfNeurons = numOfNeurons;
};

NeuronLayer.prototype.igniteLayer = function (inputs) {
	return this.layer.map(function (neuron) {
		return neuron.ignite(inputs);
	});
};

NeuronLayer.prototype.trainLayer = function (errorSignals) {
	this.layer.forEach(function (neuron, index) {});
};

NeuronLayer.prototype.getGenome = function () {
	return this.layer.map(function (neuron) {
		return neuron.getGenome();
	});
};

NeuronLayer.prototype.setGenome = function (genes) {
	var _this = this;

	var start = 0;
	this.layer.forEach(function (neuron) {
		neuron.setGenome(genes.slice(start, start + _this.numOfGenesPerNeuron));
		start += _this.numOfGenesPerNeuron;
	});
};

NeuronLayer.prototype.toString = function () {
	var str = this.layer.join('\n');

	return 'Layer with ' + this.numOfNeurons + ' neurons\n' + str;
};

exports['default'] = NeuronLayer;
module.exports = exports['default'];
