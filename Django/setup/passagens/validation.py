def origem_destino_iguais(origem, destino, lista_erros):
  """Verifica se origem é igual ao destino"""
  if origem == destino:
      lista_erros['destino'] = 'Origem e destino não podem ser iguais!'

def campo_com_numero(valor_campo, nome_campo, lista_erros):
  """Verifica se se o campo contém algum número"""
  if any(char.isdigit() for char in valor_campo):
    lista_erros[nome_campo] = 'Campo inválido!'


def data_ida_maior_data_volta(data_ida, data_volta, lista_erros):
  """Verifica se a data de ida é maior que a data de volta"""
  if data_ida > data_volta:
    lista_erros['data_volta'] = 'Data de ida não pode ser maior que a data de volta!'

def data_ida_menor_hoje(data_ida, data_hoje,lista_erros):
  """Verifica se a data de ida é menor que a data de hoje"""
  if data_ida < data_hoje:
    lista_erros['data_ida'] = 'Data de ida não pode ser menor que a data de hoje!'