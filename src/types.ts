export type TestedValueType = number;
type Modulator = "skip" | "only";

// Test Result
type DisplayableTestResult = {
  display: (name: string) => void;
};

// Expect inputs and outputs
type SuccessfulOutput = { result: "success" } & DisplayableTestResult;

type FailedOutput<ValueType extends TestedValueType> = {
  result: "failure";
  expected: ValueType;
  computed: ValueType;
} & DisplayableTestResult;

type FailedMockOutput = {
  result: "failure";
  expectedNumberOfCalls?: number;
  actualNumberOfCalls: number;
} & DisplayableTestResult;

export type ExpectOutput<ValueType extends TestedValueType = any> =
  | SuccessfulOutput
  | FailedOutput<ValueType>
  | FailedMockOutput;

export type ExpectEqualInput<ValueType extends TestedValueType> = {
  expected: ValueType;
  computed: ValueType;
};

// Test & Describe
export type Test<ValueType extends TestedValueType> = {
  name: string;
  scenario: () => ExpectOutput<ValueType>;
  modulator?: Modulator;
};

export type Describe = {
  name: string;
  tests: Test<any>[];
};

// Test result
type FailedTestResult<ValueType extends TestedValueType> = FailedOutput<ValueType> & {
  name: string;
};

type FailedMockTestResult = FailedMockOutput & {
  name: string;
};

type SuccessfulTestResult = SuccessfulOutput & {
  name: string;
};

type ErroredTestResult = { result: "error"; error: string; name: string } & DisplayableTestResult;

export type TestResult<ValueType extends TestedValueType> =
  | SuccessfulTestResult
  | FailedTestResult<ValueType>
  | FailedMockTestResult
  | ErroredTestResult;

// Mock
export type Mock = {
  (): unknown;
  returnValueOnce: (value: any) => any;
  expectToHaveBeenCalledNTimes: (nTimes: number) => ExpectOutput;
  expectToHaveBeenCalled: () => ExpectOutput;
};
