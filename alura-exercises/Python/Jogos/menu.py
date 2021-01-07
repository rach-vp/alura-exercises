import adivinhacao
import forca

def game_menu():
  while True:
    print('\n***************************************')
    print('*            Menu de jogos            *')
    print('***************************************\n')

    print('(1) Adivinhação (2) Forca')
    print('\n')

    option = int(input('Digite o número do jogo desejado (0 para sair): '))

    if (option == 0):
      break
    elif (option == 1):
      adivinhacao.play()
    elif (option == 2):
      forca.play()
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

  print('\n***************************************')
  print('*        Obrigada por jogar!          *')
  print('***************************************\n')

if (__name__ == '__main__'): game_menu()