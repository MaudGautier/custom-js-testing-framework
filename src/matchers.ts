import {
  ExpectEqualInput,
  ExpectOutput,
  ExpectToHaveBeenCalledInput,
  ExpectToHaveBeenCalledNTimes,
  SupportedValueType,
} from "./types";

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

export const expectToHaveBeenCalledNTimes = ({
  expectedNumberOfCalls,
  actualNumberOfCalls,
}: ExpectToHaveBeenCalledNTimes): ExpectOutput => {
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

export const expectToHaveBeenCalled = ({ actualNumberOfCalls }: ExpectToHaveBeenCalledInput): ExpectOutput => {
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
