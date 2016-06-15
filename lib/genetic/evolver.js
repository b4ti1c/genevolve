'use strict';

const _ = require('lodash');


class Genetic {
    constructor(props) {
        this.props = _.assign({
            crossoverProbability: 1,
            mutationProbability: 0.02,
            maximumMutation: 0.1,
            populationSize: 100,
            carryBest: 5,
            Person: function() {}
        }, props || {});

        this.population = [];
        this.populate();
    }

    populate() {
        while(this.population.length < this.props.populationSize)
            this.population.push(new this.props.Person());
    }

    evolve(generationCount) {
        generationCount = generationCount || 1;
        while(generationCount--) this.evolveGeneration();
    }

    evolveGeneration() {
        if (this.population.length < this.props.populationSize) this.populate();

        this.references = {};
        this.population.sort(this.sorter.bind(this));

        // console.log('----------------------------')
        // this.population.forEach(person => console.log(this.references[person.name].fitness))

        let nextGeneration = this.population.slice(0, this.props.carryBest);
        while(nextGeneration.length < this.props.populationSize) {
            let parents = this.selectRandomParents();
            let children = this.procreate(parents);
            nextGeneration.push(children.son, children.daughter);
        }
        
        this.population = nextGeneration;
    }

    selectRandomParents() {
        let bestFit = this.references[this.population[0].name].fitness;
        let worstFit = this.references[this.population.slice(-1)[0].name].fitness;

        let mom, dad, ref;
        let selectionProbability;

        do {
            mom = this.population[Math.floor(Math.random() * this.population.length)];
            ref = this.references[mom.name];
            selectionProbability = Math.abs(ref.fitness - worstFit) / Math.abs(bestFit - worstFit);
        } while (selectionProbability < Math.random());

        do {
            dad = this.population[Math.floor(Math.random() * this.population.length)];
            ref = this.references[dad.name];
            selectionProbability = Math.abs(ref.fitness - worstFit) / Math.abs(bestFit - worstFit);
        } while (selectionProbability < Math.random() || ref.partners[mom.name] || mom == dad);

        this.references[mom.name].partners[dad.name] = true;
        this.references[dad.name].partners[mom.name] = true;

        return {mom, dad};
    }

    procreate(parents) {
        const momGenome = parents.mom.getGenome();
        const dadGenome = parents.dad.getGenome();
        const genomeLength = momGenome.length;

        let sonGenome = momGenome;
        let daughterGenome = dadGenome;

        if (this.props.crossoverProbability > Math.random()) {
            let crossoverIndex = Math.floor(Math.random() * (genomeLength - 1)) + 1;
        
            sonGenome = momGenome.slice(0, crossoverIndex).concat(dadGenome.slice(crossoverIndex));
            daughterGenome = dadGenome.slice(0, crossoverIndex).concat(momGenome.slice(crossoverIndex));
        }

        for (let i = 0; i < genomeLength; i++) {
            if (this.props.mutationProbability > Math.random())
                sonGenome[i] += this.props.maximumMutation * (Math.random() * 2 - 1);
            if (this.props.mutationProbability > Math.random())
                daughterGenome[i] += this.props.maximumMutation * (Math.random() * 2 - 1);
        }

        let son = new this.props.Person(sonGenome);
        let daughter = new this.props.Person(daughterGenome);

        return {son, daughter};
    }

    getMostFitPerson() {
        return this.population.sort(this.sorter.bind(this))[0];
    }

    sorter(personA, personB) {
        if (!this.references) this.references = {};

        if(!this.references[personA.name]) 
            this.references[personA.name] = {
                fitness: personA.getFitness(),
                partners: {}
            };

        if(!this.references[personB.name]) 
            this.references[personB.name] = {
                fitness: personB.getFitness(),
                partners: {}
            };

        let fitnessA = this.references[personA.name].fitness;
        let fitnessB = this.references[personB.name].fitness;
        return this.props.Person.compareFitnesses(fitnessA, fitnessB);
    }

    testPopulation(inputs) {
        return this.population.map(person => person.test(inputs));
    }

    toString() {
        return  'Population with ' + this.props.populationSize + ' people: \n' +
                '\n==================\n' + 
                this.population.join('\n==================\n') + 
                '\n';
    }

    printPopulation() {
        console.log('Population: \n' + this.population.map(person => person.name).join('\n'));
    }

    testAndPrintPopulation(inputs) {
        let prettyOutput = 
            this.population.map(person => {
                let fitness = person.test(inputs);
                return {person, fitness};
            })
            .sort((objA, objB) => this.props.Person.compareFitnesses(objA.fitness, objB.fitness))
            .map(obj => obj.person.name + ' => ' + obj.fitness)
            .join('\n');

        console.log('----------------------------');
        console.log('Population responded to inputs', inputs);
        console.log(prettyOutput);
        console.log('----------------------------');
    }
}


module.exports = Genetic;
