import { expectEqual, Test, testRunner } from "./index";

export const tests: Test<number>[] = [
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
    skip: true,
  }

]

testRunner(tests)
