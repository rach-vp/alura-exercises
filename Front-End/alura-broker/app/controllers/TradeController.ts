import { DOMInjector } from "../decorators/DOMInjector.js";
import { Inspect } from "../decorators/Inspect.js";
import { LogExecutionTime } from "../decorators/LogExecutionTime.js";
import { WeekDays } from "../enums/WeekDays.js";
import { Trade } from "../models/Trade.js";
import { TradesList } from "../models/TradesList.js";
import { MessageView } from "../views/MessageView.js";
import { TradesListView } from "../views/TradesListView.js";

export class TradeController {
  @DOMInjector('#data')
  private inputDate: HTMLInputElement;
  @DOMInjector('#quantidade')
  private inputAmount: HTMLInputElement;
  @DOMInjector('#valor')
  private inputValue: HTMLInputElement;
  private trades: TradesList = new TradesList();
  private tradesListView = new TradesListView('#trades-list-view');
  private messageView = new MessageView('#mensagemView');

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

  @LogExecutionTime()
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

  @LogExecutionTime(true)
  @Inspect // No need to execute the function
  private updateView(): void {
    this.tradesListView.update(this.trades);
    this.messageView.update('Trade successfully added!');
  }

  private isWorkDay(date: Date) {
    return date.getDay() > WeekDays.SUNDAY && date.getDay() < WeekDays.SATURDAY;
  }
}
