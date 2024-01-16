import { ExpectOutput, Mock, SupportedValueType } from "./types";
import { expectToHaveBeenCalled, expectToHaveBeenCalledNTimes } from "./matchers";

export const createMock = <T extends SupportedValueType>(values: T[] = []): Mock<T> => {
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

  mockingFunction.expectToHaveBeenCalledNTimes = (nTimes: number): ExpectOutput =>
    expectToHaveBeenCalledNTimes({
      expectedNumberOfCalls: nTimes,
      actualNumberOfCalls: hasBeenCalledNTimes,
    });

  mockingFunction.expectToHaveBeenCalled = (): ExpectOutput =>
    expectToHaveBeenCalled({
      actualNumberOfCalls: hasBeenCalledNTimes,
    });

  return mockingFunction;
};

// createMock([100, 10])();
// createMock().returnValueOnce(10);
