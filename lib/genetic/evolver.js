'use strict';

const _ = require('lodash');
const Person = require('genevolve/genetic/person');


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

        if (! new this.props.Person() instanceof Person) 
            throw new Error('Person parameter must be a constructor of a Person-Extended Object');

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

        this.testData = this.props.Person.TestData();
        this.partners = {};
        this.population.sort(this.sorter.bind(this));

        let nextGeneration = this.population.slice(0, this.props.carryBest);
        while(nextGeneration.length < this.props.populationSize) {
            let parents = this.selectRandomParents();
            let children = this.procreate(parents);
            nextGeneration.push(children.son, children.daughter);
        }
        
        this.population = nextGeneration;
    }

    sorter (personA, personB) {
        if (!this.testData) this.testData = this.props.Person.TestData();
        return this.props.Person.compare(personA.getFitness(this.testData), personB.getFitness(this.testData));
    }

    selectRandomParents() {
        let bestFit = this.population[0].getFitness(this.testData);
        let worstFit = this.population.slice(-1)[0].getFitness(this.testData);

        let mom, dad, ref;
        let selectionProbability;

        do {
            mom = this.population[Math.floor(Math.random() * this.population.length)];
            selectionProbability = Math.abs(mom.getFitness(this.testData) - worstFit) / Math.abs(bestFit - worstFit);
        } while (selectionProbability < Math.random());

        if (!this.partners[mom.name]) this.partners[mom.name] = {};

        do {
            dad = this.population[Math.floor(Math.random() * this.population.length)];
            selectionProbability = Math.abs(dad.getFitness(this.testData) - worstFit) / Math.abs(bestFit - worstFit);
        } while (selectionProbability < Math.random() || this.partners[mom.name][dad.name] || mom == dad);

        if (!this.partners[dad.name]) this.partners[dad.name] = {};

        this.partners[mom.name][dad.name] = true;
        this.partners[dad.name][mom.name] = true;

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
                sonGenome[i] += this.props.maximumMutation * this.props.Person.generateGene();
            if (this.props.mutationProbability > Math.random())
                daughterGenome[i] += this.props.maximumMutation * this.props.Person.generateGene();
        }

        let son = new this.props.Person(sonGenome);
        let daughter = new this.props.Person(daughterGenome);

        return {son, daughter};
    }

    getMostFitPerson() {
        return this.population.sort(this.sorter.bind(this))[0];
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
            this.population.map(person => ({
                person,
                outputs: person.test(inputs)
            }))
            .sort((objA, objB) => this.sorter(objA.person, objB.person))
            .map(obj => obj.person.name + ' => ' + obj.outputs.map(out => out.toFixed(this.props.Person.getPrintPrecision())))
            .join('\n');

        let pretty = '----------------------------\n' +
                     'Population responded to inputs ' + inputs + '\n\n' +
                     prettyOutput + '\n' +
                     '----------------------------';

        console.log(pretty);
    }
}


module.exports = Genetic;
