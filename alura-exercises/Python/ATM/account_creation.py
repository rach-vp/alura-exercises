from account import Account
import random
import utils
import pickle

def create():
  id = str(random.randrange(1,10)) + str(random.randrange(1,10)) + str(random.randrange(1,10))
  holder = input("\nDigite o nome do titular: ")
  balance = set_balance()
  limit = set_limit()
  add_account_to_db(id, holder, balance, limit)
  account_data = Account(id, holder, balance, limit)
  print("\nConta criada com sucesso!")
  return account_data

def set_balance():
  answer = utils.check_y_n('\nDeseja fazer um depósito inicial?')
  balance = 0
  if (answer == "y"):
    balance = int(input("Digite o valor do depósito: "))
  return balance

def set_limit():
  print("\nLimite de crédito inicial: R$ 1000,00")
  limit = 1000
  answer = utils.check_y_n('Deseja solicitar mais limite?')
  if (answer == "y"):
    limit = int(input("Digite o valor desejado do limite:"))
  return limit

def add_account_to_dict(dict, id, holder, balance, limit):
  dict[id] = {
    "id": id,
    "holder": holder,
    "balance": balance,
    "limit": limit,
  }

def add_account_to_db(id, holder, balance, limit):
  path = "/media/raquel/Shared_SSD/01_OneDrive/Estudos/Alura/alura-exercises/Python/ATM/account_db.txt"
  try:
    with open(path, "rb") as db:
      try:
        accounts_db = pickle.load(db)
        add_account_to_dict(accounts_db, id, holder, balance, limit)
      except EOFError:
        accounts_db = {}
        add_account_to_dict(accounts_db, id, holder, balance, limit)
      with open(path, "wb") as db:
        pickle.dump(accounts_db, db)
  except FileNotFoundError:
    print("ERRO: Arquivo de banco de dados de contas não encontrado.")
    print("Um novo arquivo de banco de dados foi criado.")
    empty_db = open(path, "x").close()
    print("Inicie a criação da conta novamente.")
