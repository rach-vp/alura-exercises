import { Trade } from "../models/Trade.js";
import { TradesList } from "../models/TradesList.js";
import { MessageView } from "../views/MessageView.js";
import { TradesListView } from "../views/TradesListView.js";

export class TradeController {
  constructor(
    private inputDate: HTMLInputElement = document.querySelector('#data'),
    private inputAmount: HTMLInputElement = document.querySelector('#quantidade'),
    private inputValue: HTMLInputElement = document.querySelector('#valor'),
    private trades: TradesList = new TradesList(),
    private tradesListView = new TradesListView('#trades-list-view'),
    private messageView = new MessageView('#mensagemView')
  ) {}

  public add(): void {
    const trade = this.createTrade()
    this.trades.add(trade);
    this.updateView();

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

  private updateView(): void {
    this.tradesListView.update(this.trades);
    this.messageView.update('Trade successfully added!');
    this.messageView.fade();
  }
}
