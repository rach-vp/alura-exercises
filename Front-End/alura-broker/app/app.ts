import { TradeController } from "./controllers/TradeController.js";

const controller = new TradeController();
const form = document.querySelector('.form');
const importButton = document.querySelector('#import-button');

if (!form) {
  throw new Error('Form not found. Please check the selector.');
}
form.addEventListener('submit', (event) => {
  event.preventDefault();
  controller.add();
});

if (!importButton) {
  throw new Error('Import button not found. Please check the selector.');
}
importButton.addEventListener('click', (event) => {
  controller.importTrades();
});
