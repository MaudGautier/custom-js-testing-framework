import { Describe, expectEqual, Test, testRunner } from "./index";

export const testsWithSomeSkipped: Test<any>[] = [
  {
    name: "Test that passes",
    scenario: () => {
      // GIVEN
      const arg1 = 12;
      const arg2 = 12

      return expectEqual({expected: arg1, computed: arg2})
    },
  },
  {
    name: "Test that fails",
    scenario: () => {
      // GIVEN
      const arg1 = 12;
      const arg2 = 11

      return expectEqual({expected: arg1, computed: arg2})
    },
  },
  {
    name: "Test that throws an error",
    scenario: () => {
      // GIVEN
      const arg1 = 12;
      const arg2 = 11;

      throw new Error("I throw an error")

      return expectEqual({expected: arg1, computed: arg2})
    },
  },
  {
    name: "Test that should be skipped",
    scenario: () => {
      // GIVEN
      const arg1 = 12;
      const arg2 = 11;

      return expectEqual({expected: arg1, computed: arg2})
    },
    modulator: "skip"
  },
]

export const testsWithSomeOnly: Test<any>[] = [
  {
    name: "Test that passes",
    scenario: () => {
      // GIVEN
      const arg1 = 12;
      const arg2 = 12

      return expectEqual({expected: arg1, computed: arg2})
    },
  },
  {
    name: "Test that fails",
    scenario: () => {
      // GIVEN
      const arg1 = 12;
      const arg2 = 11

      return expectEqual({expected: arg1, computed: arg2})
    },
  },
  {
    name: "Test that throws an error",
    scenario: () => {
      // GIVEN
      const arg1 = 12;
      const arg2 = 11;

      throw new Error("I throw an error")

      return expectEqual({expected: arg1, computed: arg2})
    },
  },
  {
    name: "Only test that should be run (test1)",
    scenario: () => {
      // GIVEN
      const arg1 = 12;
      const arg2 = 11;

      return expectEqual({expected: arg1, computed: arg2})
    },
    modulator: "only"
  },
  {
    name: "Only test that should be run (test2)",
    scenario: () => {
      // GIVEN
      const arg1 = 12;
      const arg2 = 11;

      return expectEqual({expected: arg1, computed: arg2})
    },
    modulator: "only"
  }
]


const describeWithSomeSkipped: Describe = {name: "Some tests are skipped", tests: testsWithSomeSkipped}
const describeWithSomeOnly: Describe = {name: "Only `only` should run", tests: testsWithSomeOnly}

testRunner(describeWithSomeSkipped)
testRunner(describeWithSomeOnly)
