export abstract class View<T> {
  private element: HTMLElement;

  constructor(selector: string) {
    this.element = document.querySelector(selector);
  }

  abstract template(model: T): string;

  public update(model: T): void {
    this.element.innerHTML = this.template(model);
  }
}