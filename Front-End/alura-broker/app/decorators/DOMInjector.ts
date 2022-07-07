export const DOMInjector = (selector: string) => {
  return (target: any, propertyKey: string) => {
    const get = () => document.querySelector(selector);

    Object.defineProperty(target, propertyKey, { get });
  };
};
