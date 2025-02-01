gendiff:
	node bin/gendiff.js
install:
	npm ci
lint:
	npx eslint .
setup:
	npm install
test:
	npm test
test-coverage:
	npm test -- --coverage --coverageProvider=v8