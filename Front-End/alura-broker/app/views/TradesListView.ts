import { TradesList } from "../models/TradesList.js";

export class TradesListView {
  private element: HTMLElement;

  constructor(selector: string) {
    this.element = document.querySelector(selector);
  }

  private template(model: TradesList): string {
    return `
      <table class="table table-hover table-bordered">
        <thead>
          <tr>
            <th>DATE</th>
            <th>AMOUNT</th>
            <th>VALUE</th>
          </tr>
        </thead>
        <tbody>
          ${
            model.list().map(trade => (
              `
                <tr>
                  <td>${new Intl.DateTimeFormat().format(trade.date)}</td>
                  <td>${trade.amount}</td>
                  <td>${trade.value}</td>
                </tr>
              `
            )).join('')
          }
        </tbody>
      </table>
    `;
  }

  public update(model: TradesList): void {
    this.element.innerHTML = this.template(model);
  }
}