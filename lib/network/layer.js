'use strict';

const _ = require('lodash');
const Neuron = require('genevolve/network/neuron');
const colors = require('colors');


class Layer {
    constructor(props) {
        this.props = _.assign({
            numOfInputs: 1, 
            numOfNeurons: 1
        }, props || {});

        this.layer = _.map(new Array(this.props.numOfNeurons), _ => new Neuron({numOfInputs: this.props.numOfInputs}));
    }

    //Returns an array of outputs produced by each of the neurons in the layer
    ignite(inputs) {
        return this.layer.map(neuron => neuron.ignite(inputs));
    }

    getGenome() {
        return this.layer.map(neuron => neuron.getGenome());
    }

    setGenome(layerGenes) {
        if (!_.isArray(layerGenes)) throw new Error('Layer genes must be an array');
        if (layerGenes.length != this.props.numOfNeurons)
            throw new Error('Layer genes does not match to the neuron count in the layer');

        this.layer.forEach((neuron, index) => neuron.setGenome(layerGenes[index]));
    }

    serializeGenome() {
        return _.flatten(this.layer.map(neuron => neuron.serializeGenome()));
    }

    deserializeGenome(genome) {
        if (!_.isArray(genome)) throw new Error('Genome must be an array');

        if (genome.length != this.props.numOfNeurons * this.props.numOfInputs &&
            genome.length != this.props.numOfNeurons *(this.props.numOfInputs + 1))
            throw new Error('Genome length is invalid for neuron layer');

        let numOfGenesPerNeuron = this.props.numOfInputs + 1;

        if (genome.length == this.props.numOfNeurons * this.props.numOfInputs) {
            console.log('Warning, deserializing layer genome without bias, is this intentional?'.yellow);
            numOfGenesPerNeuron = this.props.numOfInputs;
        }

        let start = 0;
        this.layer.forEach(neuron => {
            let gene = genome.slice(start, start + numOfGenesPerNeuron);
            neuron.deserializeGenome(gene);
            start += numOfGenesPerNeuron;
        });
    }

    //WIP to be used for back-propagation. This function is yet incomplete. 
    train(errorSignals) {}

    toString() {
        return 'Layer with ' + this.props.numOfNeurons + ' neurons\n' + 
                this.layer.join('\n');
    }
}


module.exports = Layer;
