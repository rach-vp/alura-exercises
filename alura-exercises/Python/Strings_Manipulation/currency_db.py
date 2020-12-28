import pickle

class Currency_db:
  def __init__(self):
    self.currency_db = {
      "USD": 1.00,
      "BRL": 5.00,
      "EUR": 0.80,
      "GBP": 0.75,
      "JPY": 100.00,
      "ARS": 80.00,
      "MXN": 20.00
    }
    self._path = "/media/raquel/Shared_SSD/01_OneDrive/Estudos/Alura/alura-exercises/Python/Strings_Manipulation/currency_db.txt"

  @property
  def get_path(self):
    return self._path

  def update(self):
    with open(self._path, "wb") as currency:
      pickle.dump(self.currency_db, currency)
    currency.close()