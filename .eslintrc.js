module.exports = {
	extends: ['airbnb-base', 'airbnb-typescript/base', 'prettier'],
	env: {
	commonjs: true,
    amd: true
	},
  parserOptions: {
    project: './tsconfig.json',
	},
    "rules": {
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        // "requirejs/no-invalid-define": 2,
        // "requirejs/no-multiple-define": 2,
        // "requirejs/no-named-define": 2,
        // "requirejs/no-commonjs-wrapper": 2,
        // "requirejs/no-object-define": 1
    },
  	ignorePatterns: [
		'.eslintrc.js',
		'**/*.js',
		'**/node_modules/**',
		'**/dist/**',
		'**/test/**',
		'**/templates/**',
		'**/ormconfig.ts',
        '**/migrations/**',
        '**/example/**'
	],
};