'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

var Neuron = function Neuron(numOfinputs) {
	this.weights = _.map(new Array(numOfinputs), function () {
		return Math.random() * 2 - 1;
	});
	//this.weights = _.map(new Array(numOfinputs), () => Math.random();
	this.threshold = Math.random();
	//this.learningRate = 0.1;
};

Neuron.prototype.ignite = function (inputs) {
	if (inputs.length != this.weights.length) throw new Error('Input number does not match weights');

	var sum = this.weights.reduce(function (pv, cur, i) {
		return pv + cur * inputs[i];
	}, -1 * this.threshold);
	this.activation = this.sigmoid(sum);

	return this.activation;
};

Neuron.prototype.sigmoid = function (x) {
	//var p = 1.0;
	//return 1 / (1 + Math.exp(-x / p));
	return x;
};

Neuron.prototype.train = function (errorSignal) {
	var _this = this;

	this.weights = this.weights.map(function (weight) {
		return weight + _this.learningRate * errorSignal * _this.activation;
	});
};

Neuron.prototype.getGenome = function () {
	return this.weights.concat(this.threshold);
};

Neuron.prototype.setGenome = function (gene) {
	this.threshold = gene.slice(-1)[0];
	this.weights = gene.slice(0, gene.length - 1);
};

Neuron.prototype.toString = function () {
	var str = this.weights.map(function (e) {
		return e.toFixed(2);
	}).join(', ') + ' || ' + this.threshold.toFixed(2);
	return 'Neuron (' + this.weights.length + ' inputs) : ' + str;
};

exports['default'] = Neuron;
module.exports = exports['default'];
