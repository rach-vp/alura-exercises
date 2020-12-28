import pickle

class Currency_db:
  def __init__(self):
    self.currency_db = {
      "dolar": 1.00,
      "real": 5.00,
      "euro": 0.80,
      "libra-esterlina": 0.75,
      "iene-japones": 100.00,
      "peso-argentino": 80.00,
      "peso-mexicano": 20.00
    }
    self._path = "/media/raquel/Shared_SSD/01_OneDrive/Estudos/Alura/alura-exercises/Python/Strings_Manipulation/currency_db.txt"

  @property
  def get_path(self):
    return self._path

  def update(self):
    with open(self._path, "wb") as currency:
      pickle.dump(self.currency_db, currency)
    currency.close()