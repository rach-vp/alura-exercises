from account import Account
import account_creation
import utils

while True:
  answer = utils.check_y_n('\nDeseja cadastrar conta?')
  if (answer == "y"):
    new_account = account_creation.create()
  else:
    print("\nAcesso encerrado.")
    break

