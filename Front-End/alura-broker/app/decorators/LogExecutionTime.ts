export const LogExecutionTime = (inSeconds: boolean = false) => {
  return (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) => {
    let divisor = 1;
    let timeUnit = 'ms';
    if (inSeconds) {
      divisor = 1000;
      timeUnit = 's';
    }

    const originalMethod = descriptor.value;
    descriptor.value = function (...args: Array<any>): any {
      const t1 = performance.now();
      const originalResult = originalMethod.apply(this, args);
      const totalTime = (performance.now() - t1) / divisor;
      console.log(`Method ${propertyKey} - runtime: ${totalTime}${timeUnit}`);
      return originalResult;
    }
    return descriptor;
  }
}
