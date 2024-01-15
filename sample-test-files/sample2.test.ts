import { Describe, Test } from "../src/types";
import { testRunner } from "../src/testRunner";
import { expectEqual } from "../src/matchers";
import { createMock } from "../src/mocks";

export const testsWithSomeSkipped: Test<any>[] = [
  {
    name: "Test that passes",
    scenario: () => {
      // GIVEN
      const arg1 = 12;
      const arg2 = 12;

      return expectEqual({ expected: arg1, computed: arg2 });
    },
  },
  {
    name: "Test that fails",
    scenario: () => {
      // GIVEN
      const arg1 = 12;
      const arg2 = 11;

      return expectEqual({ expected: arg1, computed: arg2 });
    },
  },
  {
    name: "Test that throws an error",
    scenario: () => {
      // GIVEN
      const arg1 = 12;
      const arg2 = 11;

      throw new Error("I throw an error");

      return expectEqual({ expected: arg1, computed: arg2 });
    },
  },
  {
    name: "Test that should be skipped",
    scenario: () => {
      // GIVEN
      const arg1 = 12;
      const arg2 = 11;

      return expectEqual({ expected: arg1, computed: arg2 });
    },
    modulator: "skip",
  },
];

export const testsWithSomeOnly: Test<any>[] = [
  {
    name: "Test that passes",
    scenario: () => {
      // GIVEN
      const arg1 = 12;
      const arg2 = 12;

      return expectEqual({ expected: arg1, computed: arg2 });
    },
  },
  {
    name: "Test that fails",
    scenario: () => {
      // GIVEN
      const arg1 = 12;
      const arg2 = 11;

      return expectEqual({ expected: arg1, computed: arg2 });
    },
  },
  {
    name: "Test that throws an error",
    scenario: () => {
      // GIVEN
      const arg1 = 12;
      const arg2 = 11;

      throw new Error("I throw an error");

      return expectEqual({ expected: arg1, computed: arg2 });
    },
  },
  {
    name: "Only test that should be run (test1)",
    scenario: () => {
      // GIVEN
      const arg1 = 12;
      const arg2 = 11;

      return expectEqual({ expected: arg1, computed: arg2 });
    },
    modulator: "only",
  },
  {
    name: "Only test that should be run (test2)",
    scenario: () => {
      // GIVEN
      const arg1 = 12;
      const arg2 = 11;

      return expectEqual({ expected: arg1, computed: arg2 });
    },
    modulator: "only",
  },
];

const testsWithMocks: Test<any>[] = [
  {
    name: "Test with a stub",
    scenario: () => {
      // GIVEN
      const stub = () => {
        return 12;
      };
      const value = 1;

      const functionWithADependency = (dependency: () => number) => (value: number) => {
        const value1 = dependency();
        return value1 + value;
      };

      // WHEN
      const result = functionWithADependency(stub)(value);

      return expectEqual({ expected: 12 + 1, computed: result });
    },
  },
  {
    name: "Test with a stub that changes over time",
    scenario: () => {
      // GIVEN
      const stub = createMock().returnValueOnce(100).returnValueOnce(10);
      const value = 1;
      const functionWithADependency = (dependency: any) => (value: number) => {
        const value1 = dependency();
        const value2 = dependency();
        return value1 + value2 + value;
      };

      // WHEN
      const result = functionWithADependency(stub)(value);

      // THEN
      return expectEqual({ expected: 111, computed: result });
    },
  },
  {
    name: "Test on expectToHaveBeenCalled that should pass as it has been called",
    modulator: "only",
    scenario: () => {
      // GIVEN
      const stub = createMock().returnValueOnce(200).returnValueOnce(20);
      const value = 1;
      const functionWithADependency = (dependency: any) => (value: number) => {
        const value1 = dependency();
        return value + value1;
      };

      // WHEN
      functionWithADependency(stub)(value);

      // THEN
      return stub.expectToHaveBeenCalled();
    },
  },
  {
    name: "Test on expectToHaveBeenCalled that should pass as it has been called twice",
    modulator: "only",
    scenario: () => {
      // GIVEN
      const stub = createMock().returnValueOnce(200).returnValueOnce(20);
      const functionWithADependency = (dependency: any) => (value: number) => {
        const value1 = dependency();
        return value + value1;
      };

      // WHEN
      functionWithADependency(stub)(1);
      functionWithADependency(stub)(2);

      // THEN
      return stub.expectToHaveBeenCalled();
    },
  },
  {
    name: "Test on expectToHaveBeenCalled that should fail as the dependency has *NOT* been called",
    modulator: "only",
    scenario: () => {
      // GIVEN
      const stub = createMock().returnValueOnce(200).returnValueOnce(20);
      const value = 1;
      const functionWithADependencyNotCalled = (dependency: any) => (value: number) => {
        // DEPENDENDY IS NOT CALLED
        const value1 = 1000;
        return value + value1;
      };

      // WHEN
      functionWithADependencyNotCalled(stub)(value);

      // THEN
      return stub.expectToHaveBeenCalled();
    },
  },
  {
    name: "Test on expectToHaveBeenCalled that should pass as it has been called 3 times",
    modulator: "only",
    scenario: () => {
      // GIVEN
      const stub = createMock().returnValueOnce(200).returnValueOnce(20).returnValueOnce(2);
      const functionWithADependency = (dependency: any) => (value: number) => {
        const value1 = dependency();
        return value + value1;
      };

      // WHEN
      functionWithADependency(stub)(1); // 201
      functionWithADependency(stub)(2); // 22
      functionWithADependency(stub)(3); // 5

      // THEN
      return stub.expectToHaveBeenCalledNTimes(3);
    },
  },
  {
    name: "Test on expectToHaveBeenCalled that should fail as it has been called 3 times",
    modulator: "only",
    scenario: () => {
      // GIVEN
      const stub = createMock().returnValueOnce(200).returnValueOnce(20).returnValueOnce(2);
      const functionWithADependency = (dependency: any) => (value: number) => {
        const value1 = dependency();
        return value + value1;
      };

      // WHEN
      functionWithADependency(stub)(1); // 201
      functionWithADependency(stub)(2); // 22
      functionWithADependency(stub)(3); // 5

      // THEN
      return stub.expectToHaveBeenCalledNTimes(2);
    },
  },
];

const describeWithSomeSkipped: Describe = { name: "Some tests are skipped", tests: testsWithSomeSkipped };
const describeWithSomeOnly: Describe = { name: "Only `only` should run", tests: testsWithSomeOnly };
const describeWithMocks: Describe = { name: "Tests with mocks", tests: testsWithMocks };

testRunner(describeWithMocks);
