export type Test <ValueType extends TestedValueType>= {
  name: string;
  scenario: () => ExpectOutput<ValueType>;
}

type TestResult = {
  result: boolean,
  name: string
};

type TestedValueType = number;

type ExpectEqualInput <ValueType extends TestedValueType>= {
  expected: ValueType;
  computed: ValueType;
}

type SuccessOutput = { result: boolean }
type FailureOutput <ValueType extends TestedValueType> = {
  result: boolean;
  expected: ValueType;
  computed: ValueType;
}
type ExpectOutput <ValueType extends TestedValueType>= SuccessOutput | FailureOutput<ValueType>


export const expectEqual = <ValueType extends TestedValueType>(
  {expected, computed}: ExpectEqualInput<ValueType>
): ExpectOutput<ValueType> => {
  return {
    result: expected === computed,
  }
}


const executeTest = <ValueType extends TestedValueType>(test: Test<ValueType>): TestResult => {
  return {
    result: test.scenario().result,
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

export const testRunner = <ValueType extends TestedValueType>(tests: Test<ValueType>[]) => {
  const testResults = tests.map(executeTest)

  testResults.forEach(displayTestResult)

  // displayFullReport(testResults)
}

