from URL_arg_extract import URL_arg_extraction

url = "www.bytebank.com.br/cambio?valor=1500&moedaOrigem=real&moedaDestino=dolar"

exchange_data = URL_arg_extraction(url)

# exchange_request = url[url.find("?") + 1:]

print(exchange_data.extract_value())
print(exchange_data.extract_destination_currency())
print(exchange_data.extract_origin_currency())