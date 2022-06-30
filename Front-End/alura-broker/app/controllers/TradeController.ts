import { Trade } from "../models/Trade.js";

export class TradeController {
  private inputDate: HTMLInputElement;
  private inputAmount: HTMLInputElement;
  private inputValue: HTMLInputElement;

  constructor() {
    this.inputDate = document.querySelector('#data');
    this.inputAmount = document.querySelector('#quantidade');
    this.inputValue = document.querySelector('#valor');
  }

  add(): void {
    this.createTrade();
    this.clearForm();

    this.inputDate.focus();
  }

  private createTrade(): Trade {
    const dateSeparatorRegExp = /-/g;

    return new Trade(
      new Date(this.inputDate.value.replace(dateSeparatorRegExp, ',')),
      parseInt(this.inputAmount.value),
      parseFloat(this.inputValue.value),
    );
  }

  private clearForm(): void {
    this.inputDate.value = '';
    this.inputAmount.value = '';
    this.inputValue.value = '';
  }
}
