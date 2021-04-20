const merge = require('merge');
const ts_preset = require('ts-jest/jest-preset');

module.exports = merge.recursive(ts_preset, {
    collectCoverage: process.env.COLLECT_COVERAGE !== '0',
    collectCoverageFrom: [
        'src/**/*.ts',
    ],
    clearMocks: true,
    verbose: true,
    testPathIgnorePatterns: [
        '<rootDir>/dist/',
        '<rootDir>/node_modules/',
    ],
    reporters: [
        "default",
        process.env.GITHUB_ACTIONS === 'true' ? 'jest-github-actions-reporter' : null,
    ].filter(Boolean),
    testLocationInResults: true
});
