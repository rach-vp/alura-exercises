from URL_arg_extract import URL_arg_extraction

url = "https://www.bitebank.com.br/cambio?valor=1500&moedaOrigem=real&moedaDestino=dolar"

exchange_data = URL_arg_extraction(url)

# exchange_request = url[url.find("?") + 1:]

print(URL_arg_extraction.is_url(url))

print(f"Valor a ser convertido: {exchange_data.extract_value()}")
print(f"Moedade origem: {exchange_data.extract_origin_currency()}")
print(f"Moeda destino: {exchange_data.extract_destination_currency()}")