import adivinhacao

def game_menu():
  while True:
    print('***************************************')
    print('*            Menu de jogos            *')
    print('***************************************\n')

    print('(1) Adivinhação')
    option = int(input('Digite o número do jogo desejado (0 para sair): '))

    if (option == 0):
      break
    elif (option == 1):
      adivinhacao.play()
    else:
      print('Opção inválida.')
      exit = input('Deseja escolher um jogo novamente? [y/n]\n')
      if (exit.lower == 'y'):
        continue
      elif (exit.lower == 'n'):
        break
      else:
        print('Opção inválida.')
        print('O menu será encerrado.\n')

  print ('\n')
  print('***************************************')
  print('*        Obrigada por jogar!          *')
  print('***************************************\n')

if (__name__ == '__main__'): game_menu()