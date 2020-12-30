import pickle

def check_y_n(question):
  answer = input(f'{question} [y/n] ')
  while (answer.lower() != "y" and answer.lower() != "n"):
    print ("Opção inválida.")
    answer = input(f'{question} [y/n] ')
  return answer.lower()
