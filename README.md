# Custom JavaScript testing framework

This is a custom JS testing framework similar in essence to the broadly known [jest](https://jestjs.io/) framework.

The goal of re-implementing _jest_ fom scratch was to be able to capture the essence of its underlying principles.

This project was based on Mathieu Eveillard's idea.

## Getting started

```
# Install dependencies
npm install

# Run one test file
npm test ./sample-test-files/sample.test.ts

# Run multiple test files
npm run run-test-list ./sample-test-files/sam*.ts
```

## Sample output

Hereafter is the output we currently get when running the test on a sample file.

```
$ npm test ./sample-test-files/sample.test.ts

> typescript-kata-starter@1.0.0 test
> ts-node "./sample-test-files/sample.test.ts"


--------- Some tests are skipped ----------
✅ Test that passes
❌ Test that fails
      Expected: 12
      But got: 11
⚠️  ERROR IN TEST Test that throws an error !!
      Got the following error: Error: I throw an error

--------- Only `only` should run ----------
❌ Only test that should be run (test1)
      Expected: 12
      But got: 11
❌ Only test that should be run (test2)
      Expected: 12
      But got: 11

--------- Tests with mocks ----------
✅ Test on expectToHaveBeenCalled that should pass as it has been called
✅ Test on expectToHaveBeenCalled that should pass as it has been called twice
❌ Test on expectToHaveBeenCalled that should fail as the dependency has *NOT* been called
      Expected to have been called at least once.
      But got called 0 times.
✅ Test on expectToHaveBeenCalled that should pass as it has been called 3 times
❌ Test on expectToHaveBeenCalled that should fail as it has been called 3 times
      Expected to have been called 2 times.
      But got called 3 times.
```

## File organization

The framework is in the `src/` folder.

The `sample-test-files/` folder contains sample test files, defined in the format understandable by this custom testing
library.

## Features list

- [x] Display failing tests
- [x] Display unexpected errors
- [x] Add a `skip` feature to tests
- [x] Add a modulator: either `skip` OR `only`
- [x] Add a `describe` option
- [ ] Add a `skip` option on `describe` sections
- [x] Add a function emulator (`mock` feature)
- [ ] Allow to compare objects (not only scalars - cf expectEqual)
- [ ] Display full report
- [x] Pass test files as parameters
- [ ] Exit on fail


