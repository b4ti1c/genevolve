'use strict';


const _ = require('lodash');
const Net = require('genevolve/network/net');
const Layer = require('genevolve/network/layer');



// var genome = [[1,2,3,4], [5,6,6,7], [3,3,1,2]];
// console.log(genome);

// genome = _.flatten(genome);
// console.log(genome);

// let genesByNeuron = _.map(new Array(3), _ => []);

// genome.forEach((gene, index) => {
//     let neuronIndex = Math.floor(index / 4);
//     genesByNeuron[neuronIndex].push(gene);
// });

// console.log(genesByNeuron);

// let start = 0;
// this.layer.forEach(neuron => {
//     let gene = genome.slice(start, start + numOfGenesPerNeuron);
//     neuron.deserializeGenome(gene);
//     start += numOfGenesPerNeuron;
// })


// return;

const net = new Net({numOfInputs: 2,
                     numOfOutputs: 2,
                     hiddenLayers: 1, 
                     neuronsInHiddenLayer: 1});
// net.setGenome([
//     [{weights: [0.33, 0.33, 0.34], bias: 0}],
//     [{weights: [1], bias: 0}],
//     [{weights: [1], bias: 0}, {weights: [-1], bias: 0}]
// ])

// let rv = net.ignite([2, 2]);

console.log(net.toString());

let genome = net.serializeGenome();

console.log(genome);

genome[0] = 0;
genome[5] = 2;
genome[8] = -130;

net.deserializeGenome(genome);

console.log(net.toString());


// let obj = {
//     weights: [1,2,3,4,5],
//     bias: 6
// };

// console.log('object is', obj);

// let clone = obj.weights.concat(obj.bias);

// console.log('clone is', clone);
// console.log('obj after', obj)

// console.log(net.getGenome());
