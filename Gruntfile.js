module.exports = function (grunt) {
    grunt.loadNpmTasks("grunt-contrib-concat");

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        concat: {
            options: {
                separator: "\n\n",
            },
            dist: {
                src: [
                    "src/template.js",
                    "src/placeholder.js",
                    "src/render.js",
                    "src/utils.js",
                    "src/build.js",
                    "src/replace.js",
                ],
                dest: "dist/template.js",
            },
        },
    });

    grunt.registerTask("default", ["concat"]);
};