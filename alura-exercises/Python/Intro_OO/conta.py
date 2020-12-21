def new_account(id, holder, balance, limit):
    account = {
      "id": id,
      "holder": holder,
      "balance": balance,
      "limit": limit,
    }
    return account

def deposit(account, value):
    account["balance"] += value

def withdraw(account, value):
    account["balance"] -= value

def statement(account):
    print(f"Saldo {account.balance}")