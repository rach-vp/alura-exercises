import { TradeController } from "./controllers/TradeController.js";

const controller = new TradeController();
const form = document.querySelector('.form');

if (!form) {
  throw new Error('Form not found. Please check the selector.');
}
form.addEventListener('submit', (event) => {
  event.preventDefault();
  controller.add();
});
