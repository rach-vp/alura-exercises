# coding: utf-8

import random

def getRandomWord():
  words_bank = open('liguagens.txt', 'r')
  words = []
  for line in words_bank:
    words.append(line.strip().upper())
  words_bank.close()
  random_index = random.randrange(0, len(words))
  return words[random_index]

def addRightGuess(guessed_letter, secret_word, guessing_string):
  for letter in range(0, len(secret_word), 1):
    if (secret_word[letter] == guessed_letter.strip().upper()):
      guessing_string[letter] = guessed_letter
  return guessing_string

def draw_hanging(miss):
    print("\n  _______     ")
    print(" |/      |    ")

    if(miss == 1):
        print(" |      (_)   ")
        print(" |            ")
        print(" |            ")
        print(" |            ")

    if(miss == 2):
        print(" |      (_)   ")
        print(" |      \     ")
        print(" |            ")
        print(" |            ")

    if(miss == 3):
        print(" |      (_)   ")
        print(" |      \|    ")
        print(" |            ")
        print(" |            ")

    if(miss == 4):
        print(" |      (_)   ")
        print(" |      \|/   ")
        print(" |            ")
        print(" |            ")

    if(miss == 5):
        print(" |      (_)   ")
        print(" |      \|/   ")
        print(" |       |    ")
        print(" |            ")

    if(miss == 6):
        print(" |      (_)   ")
        print(" |      \|/   ")
        print(" |       |    ")
        print(" |      /     ")

    if (miss == 7):
        print(" |      (_)   ")
        print(" |      \|/   ")
        print(" |       |    ")
        print(" |      / \   ")

    print(" |            ")
    print("_|___         \n")

def print_winner_screen():
  print("Parabéns, você ganhou!")
  print("       ___________      ")
  print("      '._==_==_=_.'     ")
  print("      .-\\:      /-.    ")
  print("     | (|:.     |) |    ")
  print("      '-|:.     |-'     ")
  print("        \\::.    /      ")
  print("         '::. .'        ")
  print("           ) (          ")
  print("         _.' '._        ")
  print("        '-------'       ")

def print_loser_sreen(secret_word):
  print("Você foi enforcado!")
  print(f"A palavra era {secret_word}")
  print("    _______________         ")
  print("   /               \       ")
  print("  /                 \      ")
  print("//                   \/\  ")
  print("\|   XXXX     XXXX   | /   ")
  print(" |   XXXX     XXXX   |/     ")
  print(" |   XXX       XXX   |      ")
  print(" |                   |      ")
  print(" \__      XXX      __/     ")
  print("   |\     XXX     /|       ")
  print("   | |           | |        ")
  print("   | I I I I I I I |        ")
  print("   |  I I I I I I  |        ")
  print("   \_             _/       ")
  print("     \_         _/         ")
  print("       \_______/           ")

def play():
  print('\n***************************************')
  print('*     Bem vindo ao jogo da Forca!     *')
  print('***************************************\n')
  hanged = False
  miss = 0
  right = False
  secret_word = getRandomWord()
  guessing_string = ['_' for letter in secret_word]
  while (not hanged and not right):
    print(' '.join(guessing_string))
    guessed_letter = input('\nDigite uma letra:\n').upper()
    if (guessed_letter in secret_word):
      guessing_string = addRightGuess(guessed_letter, secret_word, guessing_string)
    else:
      miss += 1
      draw_hanging(miss)
    if ('_' not in guessing_string):
      right = True
      print_winner_screen()
    elif (miss == 7):
      hanged = True
      print_loser_sreen(secret_word)
  print('\n***************************************')
  print('*            GAME OVER!               *')
  print('***************************************\n')

if __name__ == '__main__': play()