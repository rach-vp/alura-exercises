import { Trade } from "../models/Trade.js";
import { TradesList } from "../models/TradesList.js";
import { TradesListView } from "../views/TradesListView.js";

export class TradeController {
  private inputDate: HTMLInputElement;
  private inputAmount: HTMLInputElement;
  private inputValue: HTMLInputElement;
  private trades: TradesList = new TradesList();
  private tradesListView = new TradesListView('#trades-list-view');

  constructor() {
    this.inputDate = document.querySelector('#data');
    this.inputAmount = document.querySelector('#quantidade');
    this.inputValue = document.querySelector('#valor');
    this.tradesListView.update(this.trades);
  }

  public add(): void {
    const trade = this.createTrade()
    this.trades.add(trade);
    this.tradesListView.update(this.trades);

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
