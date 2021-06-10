import utils

class Account:

  def __init__(self, id, holder, balance, limit):
    self._id = id
    self._holder = holder
    self._balance = balance
    self._limit = limit

  @property
  def get_account_info(self):
    return {self._id: {
      'id': self._id,
      'holder': self._holder,
      'balance': self._balance,
      'limit': self._limit,
    }}

  @property
  def get_limit(self):
    return self._limit

  @get_limit.setter
  def set_limit(self, limit):
    self._limit = limit

  def __str__(self):
    return f"\nConta: {self._id}\nTitular: {self._holder}\nSaldo: R${self._balance:.2f}\nLimite disponível: R${self._limit:.2f}"

  def __statement_pos_operation(self):
    answer = utils.check_y_n('Deseja consultar o extrato?')
    if (answer == "y"):
      print(self)
    else:
      print("Agradecemos a preferência!")

  def __is_overdue(self, value):
    return (self._balance + self._limit) < value

  def __withdraw_from_limit(self, value):
    withdraw = False
    if (value > self._balance):
      self._balance = 0
      self._limit -= (value - self._balance)
      withdraw = True
    return withdraw

  def deposit(self, value):
    self._balance += value
    self.__statement_pos_operation()

  def withdraw(self, value):
    if (self.__is_overdue(value)):
      print(f"Transação não autorizada. \nSaldo indisponível.")
    elif (self.__withdraw_from_limit(value)):
      print(f"Saque efetuado utilizando limite de crédito.")
    else:
      self._balance -= value
      print(f"Transação efetuada com sucesso.")
    self.__statement_pos_operation()

  def transfer(self, value, target):
    self.withdraw(value)
    target.deposit(value)
    self.__statement_pos_operation()
