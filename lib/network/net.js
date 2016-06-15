'use strict';

const _ = require('lodash');
const Layer = require('genevolve/network/layer');


class Net {
    constructor(props) {
        this.props = _.assign({
            numOfInputs: 1,
            numOfOutputs: 1,
            hiddenLayers: 0,
            neuronsInHiddenLayer: 1 
        }, props || {});

        this.net = [];

        /**
         *  Example constructed net with params: 
         *  input = 1, output = 1, hiddenLayer= 1, neuronInHiddenLayer= 3
         *  
         *  input:       |   -> in
         *               o
         *         /   / | \
         *  hidden:   o  o  o
         *         \   \ | /
         *               o
         *  output:      |   -> out
         */

        if (this.props.hiddenLayers == 0)
            this.net.push(new Layer({numOfInputs: this.props.numOfInputs, numOfNeurons: this.props.numOfOutputs}));
        else {
            this.net.push(new Layer({numOfInputs: this.props.numOfInputs, numOfNeurons: this.props.hiddenLayers}));
            
            let layers = this.props.hiddenLayers;
            while(layers--)
                this.net.push(new Layer({numOfInputs: this.props.hiddenLayers, numOfNeurons: this.props.hiddenLayers}));
            
            this.net.push(new Layer({numOfInputs: this.props.hiddenLayers, numOfNeurons: this.props.numOfOutputs}));
        }
    }

    ignite(inputs) {
        return this.net.reduce((outputs, layer) => layer.ignite(outputs), inputs);
    }

    getGenome() {
        return this.net.map(layer => layer.getGenome());
    }

    setGenome(netGenes) {
        if (!_.isArray(netGenes)) throw new Error('Nets genes must be an array');
        if (netGenes.length != this.net.length)
            throw new Error('Net genes does not match to the layer count in the net');
        
        this.net.forEach((layer, index) => layer.setGenome(netGenes[index]));
    }

    serializeGenome() {
        return _.flatten(this.net.map(layer => layer.serializeGenome()));
    }


    deserializeGenome(genome) {
        if (!_.isArray(genome)) throw new Error('Genome must be an array');

        const totalNumberOfGenes = this.net.reduce((sum, layer) => 
            sum + layer.props.numOfInputs * layer.props.numOfNeurons, 0);

        const totalNumberOfGenesWithBias = this.net.reduce((sum, layer) => 
            sum + (layer.props.numOfInputs + 1) * layer.props.numOfNeurons, 0);

        if (genome.length != totalNumberOfGenes && genome.length != totalNumberOfGenesWithBias)
            throw new Error('Genome length is invalid for deserialization');

        let extraInput = 0;
        if (genome.length == totalNumberOfGenesWithBias) extraInput = 1;

        let start = 0;
        this.net.forEach(layer => {
            let geneLength = (layer.props.numOfInputs + extraInput) * layer.props.numOfNeurons;
            let gene = genome.slice(start, start + geneLength);
            layer.deserializeGenome(gene);
            start += geneLength;
        });
    }


    //WIP to be used for back-propagation. This function is yet incomplete. 
    train(errors) {
        let errorSignals = errors.map((error, index) => error * (1 -this.net[this.net.length]));

        for(let i = this.net.length - 1; i >= 0; i++){
                
        }
    }

    toString() {
        return  'Net with ' + this.net.length + ' layers: ' +
                '\n-------------------\n' + 
                this.net.join('\n-------------------\n') + 
                '\n===================\n';
    }
}


module.exports = Net;
