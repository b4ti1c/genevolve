'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _NeuronLayerJs = require('./NeuronLayer.js');

var _NeuronLayerJs2 = _interopRequireDefault(_NeuronLayerJs);

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

var NeuralNet = function NeuralNet(numOfOutput, numOfInput) {
	var numOfHiddenLayer = arguments[2] === undefined ? 0 : arguments[2];
	var numOfNeuronPerHiddenLayer = arguments[3] === undefined ? 1 : arguments[3];

	this.net = [];
	if (numOfHiddenLayer == 0) this.net.push(new _NeuronLayerJs2['default'](numOfOutput, numOfInput));else {
		this.net.push(new _NeuronLayerJs2['default'](numOfNeuronPerHiddenLayer, numOfInput));
		while (numOfHiddenLayer--) this.net.push(new _NeuronLayerJs2['default'](numOfNeuronPerHiddenLayer, numOfNeuronPerHiddenLayer));
		this.net.push(new _NeuronLayerJs2['default'](numOfOutput, numOfNeuronPerHiddenLayer));
	}
};

NeuralNet.prototype.igniteNet = function (inputs) {
	return this.net.reduce(function (pv, cur) {
		return cur.igniteLayer(pv);
	}, inputs);
};

NeuralNet.prototype.train = function (errors) {
	var _this = this;

	var errorSignals = errors.map(function (error, index) {
		return error * (1 - _this.net[_this.net.length]);
	});

	for (var i = this.net.length - 1; i >= 0; i++) {}
};

NeuralNet.prototype.getGenome = function () {
	return _.flattenDeep(this.net.map(function (layer) {
		return layer.getGenome();
	}));
};

NeuralNet.prototype.setGenome = function (genes) {
	var start = 0;
	this.net.forEach(function (layer) {
		layer.setGenome(genes.slice(start, start + layer.numOfGenesPerNeuron * layer.numOfNeurons));
		start += layer.numOfGenesPerNeuron * layer.numOfNeurons;
	});
};

NeuralNet.prototype.toString = function () {
	return this.net.join('\n-------------------\n') + '\n';
};

exports['default'] = NeuralNet;
module.exports = exports['default'];
