import { Describe, SupportedValueType, Test, TestResult } from "./types";

const executeTest = <ValueType extends SupportedValueType, T extends Test<ValueType>>(
  test: T
): TestResult<ValueType> => {
  try {
    const output = test.scenario();

    return {
      ...output,
      name: test.name,
    };
  } catch (e: any) {
    return {
      error: e,
      result: "error",
      name: test.name,
      display: (name) => {
        return `⚠️  ERROR IN TEST ${name} !! 
      Got the following error: ${e}`;
      },
    };
  }
};

const selectTestsToRun = <ValueType extends SupportedValueType, T extends Test<ValueType>>(tests: T[]) => {
  const onlyTests = tests.filter((test) => Boolean(test.modulator === "only"));

  if (onlyTests.length > 0) {
    return onlyTests.filter((test) => Boolean(test.modulator !== "skip"));
  }

  return tests.filter((test) => Boolean(test.modulator !== "skip"));
};

const displayTestResult = <ValueType extends SupportedValueType>(testResult: TestResult<ValueType>) => {
  console.log(testResult.display(testResult.name));
};

const displayDescribe = (describe: Describe) => {
  console.log(`\n--------- ${describe.name} ----------`);
};

export const testRunner = (describe: Describe) => {
  const tests = describe.tests;
  const testsToRun = selectTestsToRun(tests);

  const testResults = testsToRun.map(executeTest);

  displayDescribe(describe);

  testResults.forEach(displayTestResult);
};
