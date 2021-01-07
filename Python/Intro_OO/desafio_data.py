class Data:
  def __init__(self, day, month, year):
    self.day = day
    self.month = month
    self.year = year

  def formatada(self):
    print(f"{self.day}/{self.month}/{self.year}")

d = Data(21,11,2007)
d.formatada()