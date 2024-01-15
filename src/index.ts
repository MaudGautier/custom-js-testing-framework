import { Describe, ExpectEqualInput, ExpectOutput, Mock, Test, SupportedValueType, TestResult } from "./types";

export const expectEqual = <ValueType extends SupportedValueType>({
  expected,
  computed,
}: ExpectEqualInput<ValueType>): ExpectOutput<ValueType> => {
  if (expected === computed) {
    return {
      result: "success",
      display: (name) => {
        return `✅ ${name}`;
      },
    };
  }

  return {
    result: "failure",
    expected,
    computed,
    display: (name) => {
      return `❌ ${name}
      Expected: ${expected}
      But got: ${computed}`;
    },
  };
};

const executeTest = <ValueType extends SupportedValueType>(test: Test<ValueType>): TestResult<ValueType> => {
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

const selectTestsToRun = <ValueType extends SupportedValueType>(tests: Test<ValueType>[]) => {
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

export const testRunner = <ValueType extends SupportedValueType>(describe: Describe) => {
  const tests = describe.tests;
  const testsToRun = selectTestsToRun(tests);

  const testResults = testsToRun.map(executeTest);

  displayDescribe(describe);

  testResults.forEach(displayTestResult);

  // displayFullReport(testResults)
};

export const createMock = <T>(values: T[] = []): Mock => {
  function* generator(): Generator<T, T | undefined, T> {
    for (let i = 0; i < values.length; i++) {
      yield values[i];
    }
    return undefined;
  }

  let hasBeenCalledNTimes = 0;
  const generatorInstance = generator();
  const mockingFunction = (): T | undefined => {
    hasBeenCalledNTimes += 1;
    const a = generatorInstance.next();
    return a.value;
  };
  mockingFunction.returnValueOnce = (value: T) => {
    return createMock([...values, value]);
  };

  mockingFunction.expectToHaveBeenCalledNTimes = (nTimes: number): ExpectOutput => {
    const expectedNumberOfCalls = nTimes;
    const actualNumberOfCalls = hasBeenCalledNTimes;
    return createExpectToHaveBeenCalledNTimesResult({ expectedNumberOfCalls, actualNumberOfCalls });
  };
  mockingFunction.expectToHaveBeenCalled = (): ExpectOutput => {
    const actualNumberOfCalls = hasBeenCalledNTimes;

    return createExpectToHaveBeenCalledResult({
      actualNumberOfCalls,
    });
  };

  return mockingFunction;
};

const createExpectToHaveBeenCalledResult = ({ actualNumberOfCalls }: { actualNumberOfCalls: number }): ExpectOutput => {
  if (actualNumberOfCalls >= 1) {
    return {
      result: "success",
      display: (name) => {
        return `✅ ${name}`;
      },
    };
  }

  return {
    result: "failure",
    actualNumberOfCalls,
    display: (name) => {
      return `❌ ${name}
      Expected to have been called at least once.
      But got called ${actualNumberOfCalls} times.`;
    },
  };
};

const createExpectToHaveBeenCalledNTimesResult = ({
  expectedNumberOfCalls,
  actualNumberOfCalls,
}: {
  expectedNumberOfCalls: number;
  actualNumberOfCalls: number;
}): ExpectOutput => {
  if (expectedNumberOfCalls === actualNumberOfCalls) {
    return {
      result: "success",
      display: (name) => {
        return `✅ ${name}`;
      },
    };
  }

  return {
    result: "failure",
    expectedNumberOfCalls,
    actualNumberOfCalls,
    display: (name) => {
      return `❌ ${name}
      Expected to have been called ${expectedNumberOfCalls} times.
      But got called ${actualNumberOfCalls} times.`;
    },
  };
};

// createMock([100, 10])();
// createMock().returnValueOnce(10);
