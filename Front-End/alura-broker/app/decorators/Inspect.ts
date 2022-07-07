export const Inspect = () => {
  return (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) => {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: Array<any>) {
      console.log(`---> Method -- ${propertyKey} --`);
      console.log(`|--> Params -- ${JSON.stringify(args)} --`);
      const originalReturn = originalMethod.apply(this, args);
      console.log(`|--> Return -- ${originalReturn} --`);
      return originalReturn;
    }
    return descriptor;
  };
};
