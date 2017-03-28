module.exports = function(grunt) {
	grunt.initConfig({
		// Make package info available to tasks
    	pkg: grunt.file.readJSON('package.json'),
    	nodemon: {
      		dev: {
        		script: 'dist/server/app.js',
        		options: {
          			ignore: [ 'node_modules/**', 'dist' ]
        		}
      		}
    	},
    	babel: {
	        options: {
	            sourceMap: true,
	            presets: [ 'babel-preset-es2015',
	                       'babel-preset-es2016',
	                       'babel-preset-stage-2' ]
	        },
	        dist: {
	            files: [
	            	{
	                	expand: true,
                		cwd: 'src/server',
                		src: ['*.js'],
                		dest: 'dist/server'
	            	}
	            ]
	        }
    	},
    	watch: {
	      javascript: {
	        files: ['src/server/*.js'],
    		tasks: ['run:commands:exec']
	      }
	    },
	    // Run dev watch tasks (and others potentially) concurrently 
	    concurrent: {
	      dev: {
	        tasks: ['run:commands:exec', 'watch'],
	        options: {
	          logConcurrentOutput: true
	        }
	      }
	    },
	    run: {
	    	commands: {
	      			exec: 'node dist/server/app.js',
	      			grunt: 'grunt'
	    	}
	  	}
	});

	// Load third party tasks
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-babel');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-run');

  	grunt.registerTask('default', ['babel']);
}