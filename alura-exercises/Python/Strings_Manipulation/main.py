from currency_conversion import Currency_conversion_from_URL

url = "https://www.bytebank.com.br/cambio?valor=1500&moedaOrigem=BRL&moedaDestino=EUR"

exchange_data = Currency_conversion_from_URL(url)

# exchange_request = url[url.find("?") + 1:]

print(exchange_data)
