export type Test <ValueType extends TestedValueType>= {
  name: string;
  scenario: () => ExpectOutput<ValueType>;
}

type FailedTestResult<ValueType extends TestedValueType> = FailedOutput<ValueType> & {
  name: string,
}

type SuccessfulTestResult = SuccessfulOutput & {
  name: string,
}

type TestResult<ValueType extends TestedValueType> = SuccessfulTestResult | FailedTestResult<ValueType>;

type TestedValueType = number;

type ExpectEqualInput <ValueType extends TestedValueType>= {
  expected: ValueType;
  computed: ValueType;
}

type DisplayableOutput = {
  display: (name: string) => void;
}

type SuccessfulOutput = { result: true } & DisplayableOutput;

type FailedOutput <ValueType extends TestedValueType> = {
  result: false;
  expected: ValueType;
  computed: ValueType;
} & DisplayableOutput;

type ExpectOutput <ValueType extends TestedValueType>= SuccessfulOutput | FailedOutput<ValueType>





export const expectEqual = <ValueType extends TestedValueType>(
  {expected, computed}: ExpectEqualInput<ValueType>
): ExpectOutput<ValueType> => {
  if (expected === computed) {
    return {
      result: true,
      display: (name) => {
        return `✅ ${name}`
      },
    }
  }

  return {
    result: false,
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
  const output = test.scenario();
  return {
    ...output,
    name: test.name,
  }
}



const displayTestResult = <ValueType extends TestedValueType>(testResult: TestResult<ValueType>) => {
  console.log(testResult.display(testResult.name))
}

export const testRunner = <ValueType extends TestedValueType>(tests: Test<ValueType>[]) => {
  const testResults = tests.map(executeTest)

  testResults.forEach(displayTestResult)

  // displayFullReport(testResults)
}

