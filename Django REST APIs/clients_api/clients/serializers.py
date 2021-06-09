from rest_framework import serializers
from clients.models import Client
from clients.validators import *

class ClientSerializer(serializers.ModelSerializer):
  class Meta:
    model = Client
    fields = '__all__'

  def validate(self, data):
    data_to_validate = {
      'name': name_validation(data['name']),
      'cpf': cpf_validation(data['cpf']),
      'rg': rg_validation(data['rg']),
      'phone_number': phone_number_validation(data['phone_number']),
    }
    errors = {}

    for field in data_to_validate:
      if data_to_validate[field]:
        errors[field] = data_to_validate[field]
    if errors.keys():
      raise serializers.ValidationError(errors)
    else:
      return data

    # for field in data_to_validate:
    #   if data_to_validate[field]:
    #     errors[field] = data_to_validate[field]
    # if errors.keys():
    #   for error in errors:
    #     raise serializers.ValidationError({ error: errors[error] })
    # else:
    #   return data
