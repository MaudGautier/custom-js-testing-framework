export type SupportedValueType = number;

type Modulator = "skip" | "only";

type DisplayableTestResult = {
  display: (name: string) => void;
};

// -------------------------------------- Test and Describe (high-level types) ------------------------------------- //

export type Test<ValueType extends SupportedValueType> = {
  name: string;
  scenario: () => ExpectOutput<ValueType>;
  modulator?: Modulator;
};

export type Describe = {
  name: string;
  tests: Test<any>[];
};

// -------------------------------------- Expect types (Used for any Scenario) ------------------------------------- //

type SuccessfulOutput = {
  result: "success";
} & DisplayableTestResult;

type FailedOutput<ValueType extends SupportedValueType> = {
  result: "failure";
  expected: ValueType;
  computed: ValueType;
} & DisplayableTestResult;

type FailedMockOutput = {
  result: "failure";
  expectedNumberOfCalls?: number;
  actualNumberOfCalls: number;
} & DisplayableTestResult;

type ErroredOutput = {
  result: "error";
  error: string;
} & DisplayableTestResult;

export type ExpectOutput<ValueType extends SupportedValueType = any> =
  | SuccessfulOutput
  | FailedOutput<ValueType>
  | FailedMockOutput;

export type ExpectEqualInput<ValueType extends SupportedValueType> = {
  expected: ValueType;
  computed: ValueType;
};

export type ExpectToHaveBeenCalledInput = { actualNumberOfCalls: number };

export type ExpectToHaveBeenCalledNTimes = {
  expectedNumberOfCalls: number;
  actualNumberOfCalls: number;
};

// --------------------------------------- Test Results (For test execution) --------------------------------------- //

type WithName<T> = T & { name: string };

type FailedTestResult<ValueType extends SupportedValueType> = WithName<FailedOutput<ValueType>>;
type FailedMockTestResult = WithName<FailedMockOutput>;
type SuccessfulTestResult = WithName<SuccessfulOutput>;
type ErroredTestResult = WithName<ErroredOutput>;

export type TestResult<ValueType extends SupportedValueType> =
  | SuccessfulTestResult
  | FailedTestResult<ValueType>
  | FailedMockTestResult
  | ErroredTestResult;

// ------------------------------------------------------ Mock ----------------------------------------------------- //

export type Mock = {
  (): unknown;
  returnValueOnce: (value: any) => any;
  expectToHaveBeenCalledNTimes: (nTimes: number) => ExpectOutput;
  expectToHaveBeenCalled: () => ExpectOutput;
};
