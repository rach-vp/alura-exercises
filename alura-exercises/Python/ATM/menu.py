from account import Account
import account_creation
import utils

db_account = {}

while True:
  answer = utils.check_y_n('\nDeseja cadastrar conta?')
  if (answer == "y"):
    new_account = account_creation.create_account()
    db_account[new_account.get_id] = new_account
  else:
    print("\nAcesso encerrado.")
    break

print(db_account)
