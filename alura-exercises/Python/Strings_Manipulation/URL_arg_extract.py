# url = "www.bytebank.com.br/cambio?valor=1500&moedaOrigem=real&moedaDestino=dolar"

class URL_arg_extraction:
  def __init__(self, url):
    if self.is_url:
      self._url = url
      self._exchange_request = url[url.find("?") + 1:]
      self._arg_array = self._exchange_request.split("&")
    else:
      raise LookupError("URL inválida")

  @staticmethod
  def is_url(url):
    if url: return True
    else: return False

  def __str__(self):
    return self._exchange_request

  def extract_value(self):
    value = str(self._arg_array[0])
    value = value[value.find("=") + 1:]
    try:
      value = float(value)
    except:
      raise ValueError("Valor digitado não é um número!")
    else:
      return value

  def extract_origin_currency(self):
    origin_currency = str(self._arg_array[1])
    origin_currency = origin_currency[origin_currency.find("=") + 1:]
    return origin_currency

  def extract_destination_currency(self):
    destination_currency = str(self._arg_array[2])
    destination_currency = destination_currency[destination_currency.find("=") + 1:]
    return destination_currency