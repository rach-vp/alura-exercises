import re

def cpf_validation(cpf):
  """Validate if cpf hs 11 numeric digits"""
  if not cpf.isdigit():
    return 'O CPF deve ser composto apenas por números'
  elif len(cpf) != 11:
    return 'O CPF deve possuir 11 dígitos.'
  return ''

def name_validation(name):
  """Validate if name has no numeric digits"""
  if not name.isalpha():
    return 'Não inclua números neste campo.'
  return ''

def rg_validation(rg):
  """Validate if rg has 9 numeric digits"""
  if not rg.isdigit():
    return 'O RG deve ser composto apenas por números'
  elif len(rg) != 9:
    return 'O RG deve possuir 9 dígitos.'
  return ''

def phone_number_validation(phone_number):
  """Validate if phone number has at least 11 digits and has a valid structure"""
  if len(phone_number) < 11:
    return 'O número de telefone deve conter no mínimo 11 dígitos.'
  model = '[0-9]{2} [0-9]{5}-[0-9]{4}'
  valid = re.findall(model, phone_number)
  return 'O número de telefone deve seguir o padrão 99 99999-9999' if not valid else ''