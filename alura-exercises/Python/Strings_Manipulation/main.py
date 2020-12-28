from URL_arg_extract import URL_arg_extract

url = "www.bytebank.com.br/cambio?valor=1500&moedaOrigem=real&moedaDestino=dolar"

exchange = URL_arg_extract(url)
print(exchange)
