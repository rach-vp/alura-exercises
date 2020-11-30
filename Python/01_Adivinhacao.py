print('***************************************')
print('*  Bem vindo ao jogo de Adivinhação!  *')
print('***************************************\n')

secret_num = 13

guess = input('Digite um número:\n')
print(f'Você digitou o número {guess} \n')

right = int(guess) == secret_num
bigger = int(guess) > secret_num
lower = int(guess) < secret_num

if (right):
  print('Você acertou o número secreto!\n')
else:
  if (bigger):
    print('Que pena! Seu palpite é maior que o númeor secreto.\n')
  elif (lower):
    print('Que pena! Seu palpite é menor que o númeor secreto.\n')

print('***************************************')
print('*            GAME OVER!               *')
print('***************************************\n')