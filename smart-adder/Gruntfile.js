module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({ 
        clean: {
            all: ['out']
        },

        babel: {
            options: {
                sourceMap: false
            },
            js: {
                files: {
                    'out/Neuron.js': 'src/Neuron.js',
                    'out/NeuronLayer.js': 'src/NeuronLayer.js',
                    'out/NeuralNet.js': 'src/NeuralNet.js',
                    'out/GeneticEvolver.js': 'src/GeneticEvolver.js',
                    'out/main.js': 'src/main.js',
                }
            }
        },


        'watch': {
            js: {
                files: ['src/**/*.js'],
                tasks: ['build']
            },
        }
    });

    grunt.registerTask('build', ['clean', 'babel']);
    grunt.registerTask('default', ['build']);
};