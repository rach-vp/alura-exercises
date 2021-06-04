from django import forms
from tempus_dominus.widgets import DatePicker
from datetime import datetime
from passagens.classe_viagem import classes
from passagens.validation import *

class PassagensForm(forms.Form):
  origem = forms.CharField(label='Origem', max_length=100)
  destino = forms.CharField(label='Destino', max_length=100)
  data_ida = forms.DateField(label='Data de ida', widget=DatePicker())
  data_volta = forms.DateField(label='Data de volta', widget=DatePicker())
  data_pesquisa = forms.DateField(label='Data da pesquisa', disabled=True, initial=datetime.today)
  classe = forms.ChoiceField(label='Classe', choices=classes)
  adicionais = forms.CharField(
    label='Informações adicionais',
    max_length=200,
    widget=forms.Textarea(),
    required=False,
  )
  email = forms.EmailField(label='Email')

  def clean(self):
    origem = self.cleaned_data.get('origem')
    destino = self.cleaned_data.get('destino')
    data_ida = self.cleaned_data.get('data_ida')
    data_volta = self.cleaned_data.get('data_volta')
    data_pesquisa = self.cleaned_data.get('data_pesquisa')
    lista_erros = {}

    campo_com_numero(origem, 'origem', lista_erros)
    campo_com_numero(destino, 'destino', lista_erros)
    origem_destino_iguais(origem, destino, lista_erros)
    data_ida_maior_data_volta(data_ida, data_volta, lista_erros)
    data_ida_menor_hoje(data_ida, data_pesquisa, lista_erros)

    if lista_erros is not None:
      for erro in lista_erros:
        mensagem_erro = lista_erros[erro]
        self.add_error(erro, mensagem_erro)
    return self.cleaned_data
