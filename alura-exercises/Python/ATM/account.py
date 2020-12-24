import utils

class Account:

  def __init__(self, id, holder, balance, limit = 1000):
    self.__id = id
    self.__holder = holder
    self.__balance = balance
    self.__limit = limit

  @property
  def get_limit(self):
    return self.__limit

  @get_limit.setter
  def set_limit(self, limit):
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
    answer = utils.check_y_n('Deseja consultar o extrato? [y/n]')
    if (answer == "y"):
      self.statement()
    else:
      print("Obrigada pela preferência!")

  def transfer(self, value, target):
    self.withdraw(value)
    target.deposit(value)
