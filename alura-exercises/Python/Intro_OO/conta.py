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
  def __init__(self, id, holder, balance, limit):
    self.id = id
    self.holder = holder
    self.balance = balance
    self.limit = limit
  def deposit(self, value):
    self.balance += value
  def withdraw(self, value):
    self.balance -= value
  def statement(self):
    print(f"Saldo da conta {self.id}: R${self.balance:.2f}")
