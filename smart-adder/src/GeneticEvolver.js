import * as _ from 'lodash'

var GeneticEvolver = function(personCreator, errorGenerator, errorComparator, genomeGetter, genomeSetter){
	this.p_c = 1;
	this.p_m = 0.02;
	this.mutation_max = 0.1;

	this.popSize = 100;
	//this.nbest = 5;

	this.producer = personCreator;
	this.trainer = errorGenerator;
	this.comparator = errorComparator;
	this.getGenome = genomeGetter;
	this.setGenome = genomeSetter;

	this.population = [];
	this.populate();
};


GeneticEvolver.prototype.populate = function(){
	while(this.population.length < this.popSize)
		this.population.push(this.producer());

	//console.log(this.population);
};


GeneticEvolver.prototype.evolve = function(generationCount = 1){
	while(generationCount--) 
		this.evolveOneGeneration_();
};


GeneticEvolver.prototype.evolveOneGeneration_ = function(){
	if(!this.population.length) this.populate();

	//console.log(this.population.map((person) => this.trainer(person)));
	this.population = this.population.map((person) => {
		person.fitness = this.trainer(person);
		return person;
	}, this);
	this.population.sort((personA, personB) => this.comparator(personA.fitness, personB.fitness));

	//console.log('SORTD');
	//console.log(this.population.map((person) => this.trainer(person)));

	//let best_population = this.population.slice(0, this.nbest);

	//console.log(best_population.map((person) => this.trainer(person)));
	let newPopulation = [];

	while(newPopulation.length < this.popSize){
		newPopulation = newPopulation.concat(this.produceChilds_(this.selectParents()));
		//newPopulation = newPopulation.concat(this.produceChilds_(_.sample(best_population, 2)));
		//console.log('new guys', newPopulation.slice(-2).map((person) => this.trainer(person)));
	}
	delete this.population;
	this.population = newPopulation;
};


GeneticEvolver.prototype.selectParents = function(){
	let index1, index2;
	let minFit = this.population[this.population.length - 1].fitness,
		maxFit = this.population[0].fitness;

	let mom, dad;

	let dif;

	let count = 0;
	do {
		index1 = Math.floor(Math.random() * this.population.length);
		mom = this.population[index1];
		if(!mom.partners) mom.partners = [];
		dif = 1 - Math.abs(mom.fitness - maxFit) / Math.abs(maxFit - minFit);
		//console.log('try 1 for', ++count);
	} while(mom.partners.length == this.population.length - 1 || Math.random() > dif);

	//console.log('Selected 1 for ' + this.trainer(mom) + ' with ' + dif);

	count = 0;
	do {
		index2 = Math.floor(Math.random() * this.population.length);
		dad = this.population[index2];
		if(!dad.partners) dad.partners = [];
		dif = 1 - Math.abs(dad.fitness - maxFit) / Math.abs(maxFit - minFit);
		//console.log('try 2 for', ++count);
	} while(mom.partners.indexOf(index2) != -1 || index2 == index1 || Math.random() > dif);
	
	mom.partners.push(index2);
	dad.partners.push(index1);

	//console.log('Selected 2 for ' + this.trainer(dad) + ' with ' + dif);

	return [mom, dad];
};	


GeneticEvolver.prototype.produceChilds_ = function(parents){
	//console.log('Parents', parents.map((e) => e.fitness));
	let child0 = this.getGenome(parents[0]);
	let child1 = this.getGenome(parents[1]);

	//console.log('child', child0)
	//console.log('child2', child1)

	if(Math.random() < this.p_c){
		let cross_index = Math.floor(Math.random() * (child0.length - 1)) + 1;
		//console.log('c_i', cross_index)
		let temp = child0;
		child0 = child0.slice(0, cross_index).concat(child1.slice(cross_index));
		child1 = child1.slice(0, cross_index).concat(temp.slice(cross_index));
	}

	//console.log('crossedchild', child0)
	//console.log('crossedchild2', child1)

	let childGenomes = [child0, child1];

	childGenomes = childGenomes.map((genome) => genome.map((gene) => {
		if(Math.random() < this.p_m){
			//console.log('MUTATION!');
			return gene + (Math.random() * 2 - 1) * this.mutation_max;
		}
		return gene;

	}, this));

	//console.log('new guys', childGenomes.map((person) => this.trainer(person)));
	

	return [this.createPersonWithGenome_(childGenomes[0]), this.createPersonWithGenome_(childGenomes[1])];
};


GeneticEvolver.prototype.createPersonWithGenome_ = function(genome){
	var person = this.producer();
	this.setGenome(person, genome);
	return person;
};


GeneticEvolver.prototype.getMostFitPerson = function(){
	return this.population.reduce((prev, curr) => {
		//console.log(this.comparator(prev.fitness, curr.fitness));
		let fitter = this.comparator(this.trainer(prev), this.trainer(curr)) <= 0 ? prev : curr;
		return fitter;
	});
};


GeneticEvolver.prototype.generateOutputWithTestFunction = function(tester){

	//this.population.sort((personA, personB) => this.comparator(tester(personA), tester(personB)));
	//console.log('must have sorted');
	return this.population.map((person) => tester(person)).sort(this.comparator);
};


export default GeneticEvolver
