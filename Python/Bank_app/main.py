import pprint
import utils
import account_creation
from account import Account
from accounts_db import Accounts_DB
import pickle


print("********************************")
print("*                              *")
print("*        Banco do Povo         *")
print("*   Área da pessoa atendente   *")
print("*                              *")
print("********************************")

while True:
  print("\nO que deseja fazer?")
  selection = int(input("(1) Criar conta\n(2) Extrato\n(3) Saque\n(4) Depósito\n(5) Transferência\n(6) Verificar contas cadastradas\n(7) Encerrar acesso\n"))

  db_account = Accounts_DB()
  if (selection > 7 or selection < 1):
    print("Opção inválida")
  elif (selection == 7):
    print("O acesso será encerrado.")
    break
  elif (selection == 1):
    new_account = account_creation.create()
  elif (selection == 6):
    db_account.print_db()
  else:
    account = input("Digite o número da conta: ")
    if (account in db_account):
      account = Account(db_account[account]['id'], db_account[account]['holder'], db_account[account]['balance'], db_account[account]['limit'])
      if (selection == 2):
        print(account)
      elif (selection == 3):
        value = int(input("Digite o valor do saque: "))
        account.withdraw(value)
        db_account.update(account.get_account_info)
      elif (selection == 4):
        value = int(input("Digite o valor do depósito: "))
        account.deposit(value)
        db_account.update(account.get_account_info)
      else:
        account2 = input("Digite o número da conta destino: ")
        if (account2 in db_account):
          account2 = Account(db_account[account2]['id'], db_account[account2]['holder'], db_account[account2]['balance'], db_account[account2]['limit'])
          value = int(input("Digite o valor da transferência: "))
          account.transfer(value, account2)
          db_account.update(account.get_account_info, account2.get_account_info)
        else:
          print(f"Conta destino > {account2} < inválida.")
    else:
      print(f"Conta > {account} < inválida.")
