from account import Account
from accounts_db import Accounts_DB
import random
import utils
import pickle

def add_account_to_db(account_dict):
  accounts_db = Accounts_DB()
  if (accounts_db.file_exists()):
    accounts_db.update(account_dict)
    print("\nConta criada com sucesso!")
  else:
    print("Inicie a criação da conta novamente.")

def set_limit():
  print("\nLimite de crédito inicial: R$ 1000,00")
  limit = 1000
  answer = utils.check_y_n('Deseja solicitar mais limite?')
  if (answer == "y"):
    limit = int(input("Digite o valor desejado do limite:"))
  return limit

def set_balance():
  answer = utils.check_y_n('\nDeseja fazer um depósito inicial?')
  balance = 0
  if (answer == "y"):
    balance = int(input("Digite o valor do depósito: "))
  return balance

def create():
  id = str(random.randrange(1,10)) + str(random.randrange(1,10)) + str(random.randrange(1,10))
  holder = input("\nDigite o nome do titular: ")
  balance = set_balance()
  limit = set_limit()
  account_data = Account(id, holder, balance, limit)
  add_account_to_db(account_data.get_account_info)
  return account_data
