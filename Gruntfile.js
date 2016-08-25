module.exports = function (grunt) {

grunt.initConfig({
  bump: {
    options: {
      files: ['package.json'],
      updateConfigs: [],
      commit: true,
      commitMessage: 'Bumping version to %VERSION%',
      commitFiles: ['package.json'],
      createTag: false,
      tagName: 'v%VERSION%',
      tagMessage: 'Version %VERSION%',
      push: true,
      pushTo: 'origin',
      gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
      globalReplace: false,
      prereleaseName: false,
      metadata: '',
      regExp: false
    }
  },
})

    grunt.loadNpmTasks('grunt-bump');

    grunt.registerTask('incrementVersion', ['bump', 'teamcity']);

    grunt.task.registerTask('teamcity', 'A task to set version parameter in TeamCity using service messages', function() {
        var pkgJson = require('./package.json');
        var version = pkgJson.version;
        grunt.log.writeln("##teamcity[setProjectParameter npm_timelog-components='" + version + "']");
        grunt.log.writeln("##teamcity[buildNumber '" + version + "']");
    });
};
