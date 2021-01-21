import pickle
import pprint

class Accounts_DB:
  def __init__(self):
    self._path = "/media/raquel/Shared_SSD/01_OneDrive/Estudos/Alura/Python/Bank_app/account_db.txt"
    if (self.file_exists()):
      with open(self._path, "rb") as db:
        self._db = pickle.load(db)
    else:
      self._db = {}
    self._index = 0

  @property
  def get_db(self):
    return self._db

  @property
  def get_path(self):
    return self._path

  def __iter__(self):
    return iter(self._db)

  def __getitem__(self, key):
    return self._db[key]

  def print_db(self):
    pprint.pprint(self._db)

  def unpickle_file(self, file):
    try:
      self._db = pickle.load(file)
    except EOFError:
      print("ERRO: Arquivo de banco de dados de contas vazio.")
      self._db = {}

  def file_exists(self):
    try:
      with open(self._path, "rb") as db:
        self.unpickle_file(db)
      return True
    except FileNotFoundError:
      print("ERRO: Arquivo de banco de dados de contas não encontrado.")
      open(self._path, "x").close()
      print("Um novo arquivo de banco de dados foi criado.")
      return False

  def update(self, new_obj1, new_obj2 = {}):
    with open(self._path, "wb") as db:
      try:
        self._db.update(new_obj1)
        if (new_obj2):
          self._db.update(new_obj2)
        pickle.dump(self._db, db)
      except:
        db.close()
