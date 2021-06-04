from django import forms
from tempus_dominus.widgets import DatePicker
from datetime import datetime
from passagens.classe_viagem import classes

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
