import { Trade } from "../models/Trade.js";
import { TradesList } from "../models/TradesList.js";

export class TradeController {
  private inputDate: HTMLInputElement;
  private inputAmount: HTMLInputElement;
  private inputValue: HTMLInputElement;
  private trades: TradesList = new TradesList();

  constructor() {
    this.inputDate = document.querySelector('#data');
    this.inputAmount = document.querySelector('#quantidade');
    this.inputValue = document.querySelector('#valor');
  }

  public add(): void {
    const trade = this.createTrade()
    this.trades.add(trade);

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
