export class MessageView {
  private element: HTMLElement;

  constructor(selector: string) {
    this.element = document.querySelector(selector);
  }

  private template(model: string): string {
    return `
      <p class="alert alert-info">${model}</p>
    `
  }

  public update(model: string): void {
    this.element.innerHTML = this.template(model);
  }
}