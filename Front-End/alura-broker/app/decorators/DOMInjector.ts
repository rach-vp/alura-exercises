export const DOMInjector = (selector: string) => {
  return (target: any, propertyKey: string) => {
    let element: HTMLElement;
    const get = () => {
      element = element || document.querySelector(selector);
      return element;
    };

    Object.defineProperty(target, propertyKey, { get });
  };
};
