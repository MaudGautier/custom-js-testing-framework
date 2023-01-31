export type Test = {
  name: string;
  scenario: () => boolean;
}

type Arg = number;

export const expectEqual = (arg1: Arg, arg2: Arg) => {
  return arg1 === arg2
}


const executeTest = (test: Test) => {return test.scenario()}

export const testRunner = (tests: Test[]) => {
  const testResults = tests.map(executeTest)
  console.log("testResults", testResults)

  // displayTestResults(testResults)
}

