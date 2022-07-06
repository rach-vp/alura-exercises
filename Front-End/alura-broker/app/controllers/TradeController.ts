import { LogExecutionTime } from "../decorators/LogExecutionTime.js";
import { WeekDays } from "../enums/WeekDays.js";
import { Trade } from "../models/Trade.js";
import { TradesList } from "../models/TradesList.js";
import { MessageView } from "../views/MessageView.js";
import { TradesListView } from "../views/TradesListView.js";

export class TradeController {
  constructor(
    private inputDate: HTMLInputElement = document.querySelector('#data') as HTMLInputElement,
    private inputAmount: HTMLInputElement = document.querySelector('#quantidade') as HTMLInputElement,
    private inputValue: HTMLInputElement = document.querySelector('#valor') as HTMLInputElement,
    private trades: TradesList = new TradesList(),
    private tradesListView = new TradesListView('#trades-list-view'),
    private messageView = new MessageView('#mensagemView')
  ) {}

  @LogExecutionTime()
  public add(): void {
    const trade = this.createTrade();

    if (this.isWorkDay(trade.date)) {
      this.trades.add(trade);
      this.updateView();
    } else {
      this.messageView.update('Only trades in workdays are allowed!');
    }

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

    this.messageView.fade();
  }

  private updateView(): void {
    this.tradesListView.update(this.trades);
    this.messageView.update('Trade successfully added!');
  }

  private isWorkDay(date: Date) {
    return date.getDay() > WeekDays.SUNDAY && date.getDay() < WeekDays.SATURDAY;
  }
}
