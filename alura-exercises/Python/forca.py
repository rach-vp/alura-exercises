import random

def play():
  print('\n')
  print('***************************************')
  print('*  Bem vindo ao jogo de Adivinhação!  *')
  print('***************************************\n')

  secret_word = 'banana'

  hanged = False
  right = False
  guessing_string = []
  missing_letters = len(secret_word)
  for letter in range(0, len(secret_word), 1):
    guessing_string.append('_')
  print(' '.join(guessing_string))

  while (not hanged and not right):
    guessed_letter = input('Digite uma letra:\n')
    for letter in range(0, len(secret_word), 1):
      if (secret_word[letter] == guessed_letter.strip().lower()):
        guessing_string[letter] = guessed_letter
        missing_letters -= 1
    print(' '.join(guessing_string))
    if (missing_letters == 0):
      print('Parabéns! você acertou a palavra secreta!\n')
      break

  print('***************************************')
  print('*            GAME OVER!               *')
  print('***************************************\n')

if __name__ == '__main__': play()