import random

def checkedInput():
  guess = input("Digite um número de 1 a 100:\n")
  while (int(guess) < 1 or int(guess) > 100):
    print("Número digitado está fora do intervalo permitido.\n")
    guess = input("Digite um número de 1 a 100:\n")
  while (guess == ""):
    print("Input vazio.\n")
    guess = input("Digite um número de 1 a 100:\n")
  return guess

def compareGuess(higher):
  if (higher):
    print("Que pena! Seu palpite é maior que o número secreto.\n")
  else:
    print("Que pena! Seu palpite é menor que o número secreto.\n")

def updateScore(score, secret_num, guess):
  score -= abs(secret_num - int(guess))
  return score

def print_winner_screen():
  print("Parabéns, você ganhou!")
  print("       ___________      ")
  print("      '._==_==_=_.'     ")
  print("      .-\\:      /-.    ")
  print("     | (|:.     |) |    ")
  print("      '-|:.     |-'     ")
  print("        \\::.    /      ")
  print("          '::. .'        ")
  print("           ) (          ")
  print("         _.' '._        ")
  print("        '-------'       ")

def print_loser_sreen(secret_num):
  print("\nSua tentativas se esgotaram!")
  print(f"O número secreto era {secret_num}.")
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
  print("\n***************************************")
  print("*  Bem vindo ao jogo de Adivinhação!  *")
  print("***************************************\n")

  attempt_num = 1
  secret_num = round(random.randrange(1, 101))
  right = False
  score = 1000
  attempt_total = int(input("Digite o número de tentativas:\n"))
  print(f"Você tem {attempt_total} tentativa(s).\n")
  while (not right and attempt_num <= attempt_total):
    print(f"Tentativa {attempt_num} de {attempt_total}.\n")
    guess = checkedInput()
    right = int(guess) == secret_num
    higher = int(guess) > secret_num
    if (right):
      print_winner_screen()
    else:
      compareGuess(higher)
      score = updateScore(score, secret_num, guess)
    attempt_num += 1
  if (not right):
    print_loser_sreen(secret_num)
    score -= 500
  print(f"Sua pontuação foi {score}.\n")
  print("\n***************************************")
  print("*            GAME OVER!               *")
  print("***************************************\n")

if __name__ == "__main__": play()