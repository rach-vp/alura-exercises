from django import forms

class PassagensForm(forms.Form):
  origem = forms.CharField(label='Origem', max_length=100)
  destino = forms.CharField(label='Destino', max_length=100)
  data_ida = forms.DateField(label='Data de ida')
  data_volta = forms.DateField(label='Data de volta')
