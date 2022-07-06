export const LogExecutionTime = () => {
  return (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) => {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: Array<any>): any {
      const t1 = performance.now();
      const originalResult = originalMethod.apply(this, args);
      const totalTime = performance.now() - t1;
      console.log(`Method ${propertyKey} - runtime: ${totalTime}ms`);
      originalResult;
    }
    return descriptor;
  }
}
