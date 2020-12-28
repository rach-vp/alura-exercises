import pickle
from currency_db import Currency_db

class Currency_conversion_from_URL:
  def __init__(self, url):
    if self.is_url(url):
      # URL manipulation
      self._url = url
      self._exchange_request = url[url.find("?") + 1:]
      self._arg_array = self._exchange_request.split("&")
      # Currency data base update
      currency_db = Currency_db()
      currency_db.update()
      currency_db_file = open(currency_db.get_path, "rb")
      self._currency_db_dict = pickle.load(currency_db_file)
      currency_db_file.close()
    else:
      raise LookupError("URL inválida")

  @staticmethod
  def is_url(url):
    if url and url.startswith("https://www.bytebank.com"):
      return True
    else:
      return False

  def __str__(self):
    return f">> Valor: {self.value()} / Moeda origem: {self.origin_currency()} / Moeda destino: {self.destination_currency()} / Valor destino: {self.conversion()} <<"

  def value(self):
    value = str(self._arg_array[0])
    value = value[value.find("=") + 1:]
    try:
      value = float(value)
    except:
      raise ValueError("Valor digitado não é um número!")
    else:
      return value

  def origin_currency(self):
    origin_currency = str(self._arg_array[1]).upper()
    origin_currency = origin_currency[origin_currency.find("=") + 1:]
    if origin_currency in self._currency_db_dict:
      return origin_currency
    else:
      return "Moeda origem não disponível para câmbio"

  def destination_currency(self):
    destination_currency = str(self._arg_array[2]).upper()
    destination_currency = destination_currency[destination_currency.find("=") + 1:]
    if destination_currency in self._currency_db_dict:
      return destination_currency
    else:
      return "Moeda destino não disponível para câmbio"

  def conversion(self):
    value = self.value()
    origin_factor = self._currency_db_dict[self.origin_currency()]
    destination_factor = self._currency_db_dict[self.destination_currency()]
    return (destination_factor / origin_factor) * value