class URL_arg_extract:
  def __init__(self, url):
    if self.is_url:
      self._url = url
      self._exchange_request = url[url.find("?") + 1:]
    else:
      raise LookupError("URL inválida")

  @staticmethod
  def is_url(url):
    if url: return True
    else: return False

  def __str__(self):
    return self._exchange_request