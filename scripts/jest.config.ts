module.exports = {
    'transform': {
        '^.+\\.tsx?$': 'ts-jest'
    },
    'testRegex': '(/test/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    'moduleFileExtensions': [
        'ts',
        'tsx',
        'js',
        'jsx',
        'json',
        'node'
    ],
    'globals': {
        'ts-jest': {
            'userBabelrc': true
        }
    },
    'coveragePathIgnorePatterns': [
        '*dao*',
        '%dao%',
        '*people*',
        '%people%',
        'src/dao/',
        'src/dao/*'
    ]
};