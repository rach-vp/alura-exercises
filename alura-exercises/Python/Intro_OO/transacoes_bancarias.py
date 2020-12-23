import random

def check_y_n(question):
  answer = input(f'{question} [y/n] ')
  while (answer != "y" and answer != "n"):
    print ("Opção inválida.")
    answer = input(f'{question} [y/n] ')
  return answer

class Account:

  def __init__(self, id, holder, balance, limit = 1000):
    self.__id = id
    self.__holder = holder
    self.__balance = balance
    self.__limit = limit

  def statement(self):
    print(f"\nConta: {self.__id}")
    print(f"Titular: {self.__holder}")
    print(f"Saldo: R${self.__balance:.2f}")
    print(f"Limite disponível: R${self.__limit:.2f}")

  def __is_overdue(self, value):
    return (self.__balance + self.__limit) < value

  def __withdraw_from_limit(self, value):
    withdraw = False
    if (value > self.__balance):
      self.__balance = 0
      self.__limit -= (value - self.__balance)
      withdraw = True
    return withdraw

  def deposit(self, value):
    self.__balance += value

  def withdraw(self, value):
    if (self.__is_overdue(value)):
      print(f"Transação não autorizada. \nSaldo indisponível.")
    elif (self.__withdraw_from_limit(value)):
      print(f"Saque efetuado utilizando limite de crédito.")
    else:
      self.__balance -= value
      print(f"Transação efetuada com sucesso.")
    answer = check_y_n('Deseja consultar o extrato? [y/n]')
    if (answer == "y"):
      self.statement()
    else:
      print("Obrigada pela preferência!")

  def transfer(self, value, target):
    self.withdraw(value)
    target.withdraw(value)

  @property
  def limit(self):
    return self.__limit

  @limit.setter
  def set_limit(self, limit):
    self.__limit = limit

db_account = {}

class CreateAccount:

  def __set_balance():
    answer = check_y_n('\nDeseja fazer um depósito inicial?')
    if (answer == "y"):
      balance = int(input("Digite o valor do depósito: "))
    else:
      balance = 0
    return balance

  def __set_limit():
    print("\nLimite de crédito inicial: R$ 1000,00")
    limit = 0
    answer = check_y_n('Deseja solicitar mais limite?')
    if (answer == "y"):
      limit = int(input("Digite o valor desejado do limite:"))
    return limit

  def create():
    id = str(random.randrange(1,10) + random.randrange(1,10) + random.randrange(1,10))
    holder = input("\nDigite o nome do titular: ")
    balance = __class__.__set_balance()
    account_name = f"conta{len(db_account) + 1}"
    limit = __class__.__set_limit()
    if (limit):
      account_data = Account(id, holder, balance, limit)
    else:
      account_data = Account(id, holder, balance)
    print("\nConta criada com sucesso!")
    account_data.statement()
    db_account[account_name] = account_data

while True:
  answer = check_y_n('\nDeseja cadastrar conta?')
  if (answer == "y"):
    CreateAccount.create()
  else:
    print("\nAcesso encerrado.")
    break

print(db_account)