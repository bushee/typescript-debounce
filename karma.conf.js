module.exports = function (config) {
    config.set({
        colors: true,
        browsers: ['PhantomJS'],
        frameworks: ['jasmine', 'karma-typescript'],
        reporters: ['progress', 'junit', 'karma-typescript'],
        files: [
            {pattern: 'src/**/*.ts', load: false},
            {pattern: 'test/**/*.ts', load: false}
        ],
        junitReporter: {
            outputDir: 'test-results',
            suite: 'models'
        },
        preprocessors: {
            '**/*.ts': ['karma-typescript']
        },
        singleRun: true
    });
};