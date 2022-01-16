To run file:

npm install

npm run dev (dev mode)

To run tests:

change test file in package.json:

"test": "mocha --timeout 10000 -r ts-node/register 'src/test/tweet.ts'" (src/test/tweet.ts) is one of the unit tests

npm run test

The assessment is missing some of unit/integration testing of task1, and whole task2
