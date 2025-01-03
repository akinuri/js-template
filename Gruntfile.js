module.exports = function (grunt) {
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-watch");

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        concat: {
            options: {
                separator: "\n\n",
                process: function (src, filepath) {
                    let filename = filepath.split("/").pop();
                    filename = filename.replace(".js", "");
                    filename = filename.toUpperCase();
                    src = src.trim();
                    return `// #region ==================== ${filename}\n\n${src}\n\n// #endregion`;
                },
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

        watch: {
            scripts: {
                files: ["src/**/*.js"],
                tasks: ["concat"],
                options: {
                    spawn: false,
                },
            },
        },
    });

    grunt.registerTask("default", ["concat", "watch"]);
};
