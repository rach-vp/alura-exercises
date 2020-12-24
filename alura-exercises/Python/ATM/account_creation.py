from account import Account
import random
import utils

def set_balance():
  answer = utils.check_y_n('\nDeseja fazer um depósito inicial?')
  if (answer == "y"):
    balance = int(input("Digite o valor do depósito: "))
  else:
    balance = 0
  return balance

def set_limit():
  print("\nLimite de crédito inicial: R$ 1000,00")
  limit = 0
  answer = utils.check_y_n('Deseja solicitar mais limite?')
  if (answer == "y"):
    limit = int(input("Digite o valor desejado do limite:"))
  return limit

def create_account():
  id = str(random.randrange(1,10)) + str(random.randrange(1,10)) + str(random.randrange(1,10))
  holder = input("\nDigite o nome do titular: ")
  balance = set_balance()
  limit = set_limit()
  if (limit):
    account_data = Account(id, holder, balance, limit)
  else:
    account_data = Account(id, holder, balance)
  print("\nConta criada com sucesso!")
  account_data.statement()
  return account_data