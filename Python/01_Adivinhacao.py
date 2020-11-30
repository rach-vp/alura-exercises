print('***************************************')
print('*  Bem vindo ao jogo de Adivinhação!  *')
print('***************************************\n')

secret_num = 13

guess = input('Digite um número:\n')
print(f'Você digitou o número {guess} \n')

if (int(guess) == secret_num):
  print('Você acertou o número secreto!\n')
elif (int(guess) > secret_num):
  print('Que pena! Seu palpite é maior que o númeor secreto.\n')
else:
  print('Que pena! Seu palpite é menor que o númeor secreto.\n')

print('***************************************')
print('*            GAME OVER!               *')
print('***************************************\n')