export type Test <ValueType extends TestedValueType>= {
  name: string;
  scenario: () => ExpectOutput<ValueType>;
  skip?: boolean;
  only?: boolean;
}

type FailedTestResult<ValueType extends TestedValueType> = FailedOutput<ValueType> & {
  name: string,
}

type SuccessfulTestResult = SuccessfulOutput & {
  name: string,
}

type ErroredTestResult = { result: "error", error: string, name: string } & DisplayableTestResult;

type TestResult<ValueType extends TestedValueType> = SuccessfulTestResult | FailedTestResult<ValueType> | ErroredTestResult;

type TestedValueType = number;

type ExpectEqualInput <ValueType extends TestedValueType>= {
  expected: ValueType;
  computed: ValueType;
}

type DisplayableTestResult = {
  display: (name: string) => void;
}

type SuccessfulOutput = { result: "success" } & DisplayableTestResult;

type FailedOutput <ValueType extends TestedValueType> = {
  result: "failure";
  expected: ValueType;
  computed: ValueType;
} & DisplayableTestResult;

type ExpectOutput <ValueType extends TestedValueType>= SuccessfulOutput | FailedOutput<ValueType>





export const expectEqual = <ValueType extends TestedValueType>(
  {expected, computed}: ExpectEqualInput<ValueType>
): ExpectOutput<ValueType> => {
  if (expected === computed) {
    return {
      result: "success",
      display: (name) => {
        return `✅ ${name}`
      },
    }
  }

  return {
    result: "failure",
    expected,
    computed,
    display: (name) => {
      return `❌ ${name}
      Expected: ${expected}
      But got: ${computed}`
    },
  }
}


const executeTest = <ValueType extends TestedValueType>(test: Test<ValueType>): TestResult<ValueType> => {
  try {
    const output = test.scenario();

    return {
      ...output,
      name: test.name,
    }
  } catch (e) {
    return {
      error: e,
      result: "error",
      name: test.name,
      display: (name) => {
        return `⚠️  ERROR IN TEST ${name} !! 
      Got the following error: ${e}`}
    };
  }
}


const selectTestsToRun =<ValueType extends TestedValueType>(tests: Test<ValueType>[]) => {
  const onlyTests = tests.filter(test => Boolean(test.only));

  if (onlyTests.length > 0) {
    return onlyTests.filter(test => Boolean(!test.skip))
  }

  return tests.filter(test => Boolean(!test.skip))
}


const displayTestResult = <ValueType extends TestedValueType>(testResult: TestResult<ValueType>) => {
  console.log(testResult.display(testResult.name))
}

export const testRunner = <ValueType extends TestedValueType>(tests: Test<ValueType>[]) => {
  const testsToRun = selectTestsToRun(tests)

  const testResults = testsToRun.map(executeTest)

  testResults.forEach(displayTestResult)

  // displayFullReport(testResults)
}

