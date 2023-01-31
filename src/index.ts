export type Test = {
  name: string;
  scenario: () => boolean;
}

type TestResult = {
  result: boolean,
  name: string
};

type Arg = number;

export const expectEqual = (arg1: Arg, arg2: Arg) => {
  return arg1 === arg2
}


const executeTest = (test: Test): TestResult => {
  return {
    result: test.scenario(),
    name: test.name
  }
}


const EMOJI: Record<"success" | "fail", string> = {
  "success": "✅",
  "fail": "❌"
}

const displayTestResult = (testResult: TestResult) => {
  const status = testResult.result === true ? "success" : "fail";
  const emoji = EMOJI[status]
  console.log(`${emoji} ${testResult.name}`)
}

export const testRunner = (tests: Test[]) => {
  const testResults = tests.map(executeTest)

  testResults.forEach(displayTestResult)

  // displayFullReport(testResults)
}

