import random

print('***************************************')
print('*  Bem vindo ao jogo de Adivinhação!  *')
print('***************************************\n')

secret_num = round(random.random()*100)

attempt_total = input('Digite o número de tentativas:\n')
print(f'Você tem {attempt_total} tentativa(s).\n')
for attempt_num in range(1, int(attempt_total) + 1):
  print(f'Tentativa {attempt_num} de {attempt_total}.\n')
  guess = input('Digite um número de 1 a 100:\n')
  if (int(guess) < 1 or int(guess) > 100):
    print('Número digitado está fora do intervalo permitido.\n')
    continue
  right = int(guess) == secret_num
  higher = int(guess) > secret_num
  lower = int(guess) < secret_num
  if (right):
    print('Você acertou o número secreto!\n')
    break
  else:
    if (higher):
      print('Que pena! Seu palpite é maior que o número secreto.\n')
    elif (lower):
      print('Que pena! Seu palpite é menor que o número secreto.\n')

print('***************************************')
print('*            GAME OVER!               *')
print('***************************************\n')