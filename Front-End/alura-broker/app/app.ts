import { Trade } from "./models/Trade";

const trade = new Trade(new Date(), 10, 100);
console.log(trade.volume);
