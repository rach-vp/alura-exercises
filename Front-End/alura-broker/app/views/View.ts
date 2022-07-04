export abstract class View<T> {
  private element: HTMLElement;

  constructor(selector: string) {
    this.element = document.querySelector(selector);
  }

   protected abstract template(model: T): string;

  public update(model: T): void {
    this.element.innerHTML = this.template(model);
    this.show();
  }

  public fade(): void {
    setTimeout(() => {
      this.element.style.display = 'none';
    }, 2000);
  }

  public show(display: string = 'block'): void {
    this.element.style.display = display;
  }
}