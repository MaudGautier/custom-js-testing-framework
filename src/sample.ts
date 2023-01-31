import { expectEqual, Test, testRunner } from "./index";

export const tests: Test[] = [
  {
    name: "Test that passes",
    scenario: () => {
      // GIVEN
      const arg1 = 12;
      const arg2 = 12

      return expectEqual(arg1, arg2)
    },
  },
  {
    name: "Test that fails",
    scenario: () => {
      // GIVEN
      const arg1 = 12;
      const arg2 = 11

      return expectEqual(arg1, arg2)
    },
  }
]

testRunner(tests)
