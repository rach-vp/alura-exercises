import { TradesList } from "../models/TradesList.js";
import { View } from "./View.js";

export class TradesListView extends View<TradesList> {
  template(model: TradesList): string {
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
}