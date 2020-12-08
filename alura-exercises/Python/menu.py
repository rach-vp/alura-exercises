import adivinhacao

def game_menu():
  while True:
    print('\n')
    print('***************************************')
    print('*            Menu de jogos            *')
    print('***************************************\n')

    print('(1) Adivinhação')
    print('\n')

    option = int(input('Digite o número do jogo desejado (0 para sair): '))

    if (option == 0):
      break
    elif (option == 1):
      adivinhacao.play()
    else:
      print('Opção inválida.')
      exit = input('Deseja voltar ao início? [y/n]\n')
      if (exit.lower() == 'y'):
        continue
      elif (exit.lower() == 'n'):
        break
      else:
        print('Opção inválida.')
        print('O menu será encerrado.\n')
        break

  print ('\n')
  print('***************************************')
  print('*        Obrigada por jogar!          *')
  print('***************************************\n')

if (__name__ == '__main__'): game_menu()