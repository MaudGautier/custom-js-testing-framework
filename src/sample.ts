import { Describe, expectEqual, stubGenerator, Test, testRunner } from "./index";

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

const testsWithMocks: Test<any>[] = [
  {
    name: "Test with a stub",
    scenario: () => {
      // GIVEN
      const stub = () => { return 12 }
      const value = 1;

      const functionWithADependency = (dependency: () => number) => (value: number) => {
        const value1 = dependency()
        return value1 + value
      }


      // WHEN
      const result = functionWithADependency(stub)(value)

      return expectEqual({expected: 12 + 1, computed: result })
    }
  },
  {
    name: "Test with a stub that changes over time",
    scenario: () => {
      // GIVEN
      function* generator1 () {
        yield 100
        yield 10
      }
      // [] => generator
      const stub = stubGenerator([100, 10])

      const value = 1;

      const functionWithADependency = (dependency: any) => (value: number) => {
        const value1 = dependency()
        const value2 = dependency()
        return value1 + value2 + value
      }


      // WHEN
      const result = functionWithADependency(stub)(value)

      // THEN
      return expectEqual({expected: 111, computed: result })
    }
  }
]




const describeWithSomeSkipped: Describe = {name: "Some tests are skipped", tests: testsWithSomeSkipped}
const describeWithSomeOnly: Describe = {name: "Only `only` should run", tests: testsWithSomeOnly}
const describeWithMocks: Describe = {name: "Tests with mocks", tests: testsWithMocks}

testRunner(describeWithSomeSkipped)
testRunner(describeWithSomeOnly)
testRunner(describeWithMocks)
