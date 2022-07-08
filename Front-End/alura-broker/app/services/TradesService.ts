import { Trade } from "../models/Trade.js";

// Won't create a .env for this project
const API_URL = 'http://localhost:8080';

export class TradesService {
  public fetchCurrentTrades(): Promise<Array<Trade>> {
    return fetch(`${API_URL}/dados`)
    .then(response => response.json())
    .then((currentData: Array<CurrentTrade>) => currentData.map(
      ({ montante, vezes }) => new Trade(new Date(), vezes, montante)
    ));
  }
}