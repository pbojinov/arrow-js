"use strict";

module.exports = function(grunt) {

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        // Define Directory
        dirs: {
            js:     "src/js",
            build:  "dist"
        },

        // Metadata
        pkg: grunt.file.readJSON("package.json"),
        banner:
        "\n" +
        "/*\n" +
         " * -------------------------------------------------------\n" +
         " * Project: <%= pkg.title %>\n" +
         " * Version: <%= pkg.version %>\n" +
         " *\n" +
         " * Author:  <%= pkg.author.name %>\n" +
         //" * Site:    <%= pkg.author.url %>\n" +
         " * Contact: <%= pkg.author.email %>\n" +
         " *\n" +
         " *\n" +
         " * Copyright (c) <%= grunt.template.today(\"yyyy\") %> Petar Bojinov\n" +
         " * -------------------------------------------------------\n" +
         " */\n" +
         "\n",

         jshint: {
            options: {
                curly: true,
                debug: true,
                unused: true,
                forin: true,
                eqnull: true,
                eqeqeq: true,
                browser: true,
                globals: {
                    devel: true,
                    jquery: false
                }
            },
            all: ['src/js/arrow.js'] //, '<%= dirs.build %>/<%= pkg.title %>-<%= pkg.version %>.min.js']
        },

        // Minify and Concat archives
        uglify: {
            options: {
                mangle: false,
                report: 'min',
                banner: "<%= banner %>"
            },
            dist: {
              files: {
                  "<%= dirs.build %>/<%= pkg.title %>-<%= pkg.version %>.min.js": "<%= dirs.js %>/arrow.js"
              }
            }
        },

        // Notifications
        notify: {
          js: {
            options: {
              title: "Javascript - <%= pkg.title %>",
              message: "Minified and validated with success!"
            }
          }
        }
    });


    // Register Taks
    // --------------------------

    // Observe changes, concatenate, minify and validate files
    grunt.registerTask("default", ["uglify", "notify:js"]);
    grunt.registerTask('dev', ['jshint'])

};