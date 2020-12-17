# coding: utf-8

import random

def play():

  words_bank = open('liguagens.txt', 'r')
  words = []
  for line in words_bank:
    words.append(line.strip().upper())
  words_bank.close()

  print('\n***************************************')
  print('*     Bem vindo ao jogo da Forca!     *')
  print('***************************************\n')

  hanged = False
  miss = 0
  right = False
  random_index = random.randrange(0, len(words))
  secret_word = words[random_index]
  guessing_string = []
  for letter in range(0, len(secret_word), 1):
    guessing_string.append('_')
  print(' '.join(guessing_string))

  while (not hanged and not right):
    guessed_letter = input('Digite uma letra:\n')
    if (guessed_letter in secret_word):
      for letter in range(0, len(secret_word), 1):
        if (secret_word[letter] == guessed_letter.strip().upper()):
          guessing_string[letter] = guessed_letter
    else:
      miss += 1
    print(' '.join(guessing_string))

    if ('_' not in guessing_string):
      right = True
      print('Parabéns! você acertou a palavra secreta!\n')
    elif (miss == 7):
      hanged = True
      print('\nVocê foi enforcado!')
      print(f'A palavra secreta é {secret_word}\n')

  print('***************************************')
  print('*            GAME OVER!               *')
  print('***************************************\n')

if __name__ == '__main__': play()