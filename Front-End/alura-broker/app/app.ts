import { TradeController } from "./controllers/TradeController.js";

const controller = new TradeController();
const form = document.querySelector('.form');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  controller.add();
});
