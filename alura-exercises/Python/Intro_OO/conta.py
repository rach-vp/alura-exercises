# def new_account(id, holder, balance, limit):
#     account = {
#       "id": id,
#       "holder": holder,
#       "balance": balance,
#       "limit": limit,
#     }
#     return account

# def deposit(account, value):
#     account["balance"] += value

# def withdraw(account, value):
#     account["balance"] -= value

# def statement(account):
#     print(f"Saldo {account.balance}")

class Account:
  def __init__(self, id, holder, balance, limit = 1000):
    self.__id = id
    self.__holder = holder
    self.__balance = balance
    self.__limit = limit
  def deposit(self, value):
    self.__balance += value
  def withdraw(self, value):
    self.__balance -= value
  def statement(self):
    print(f"Saldo da conta {self.__id}: R${self.__balance:.2f}")
  def transfer(self, value, target):
    self.withdraw(value)
    target.withdraw(value)
  def is_overdue(self):
    overdue = False
    if (self.__balance < 0):
      overdue = True
    return overdue
