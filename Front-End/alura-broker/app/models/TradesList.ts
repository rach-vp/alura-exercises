import { Trade } from "./Trade.js";

export class TradesList {
  private trades: Array<Trade> = [];

  public add(trade: Trade): void {
    this.trades.push(trade);
  }

  public list(): ReadonlyArray<Trade> {
    return this.trades;
  }
}