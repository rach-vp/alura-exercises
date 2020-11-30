print('***************************************')
print('*  Bem vindo ao jogo de Adivinhação!  *')
print('***************************************\n')

secret_num = 13

attempt_total = input('Digite o número de tentativas:\n')
print(f'Você tem {attempt_total} tentativa(s).\n')
attempt_num = 1
while (attempt_num <= int(attempt_total)):
  print(f'Tentativa {attempt_num} de {attempt_total}.\n')
  guess = input('Digite um número:\n')
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
  attempt_num += 1

print('***************************************')
print('*            GAME OVER!               *')
print('***************************************\n')