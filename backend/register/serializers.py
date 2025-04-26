from rest_framework import serializers
from .models import Patient, Token
from datetime import date

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = "__all__"
        read_only_fields = ['patient_id', 'age']

class TokenSerializer(serializers.ModelSerializer):
    patient_id = serializers.CharField(write_only=True)  # Only take patient_id for token generation
    patient = PatientSerializer(read_only=True)

    class Meta:
        model = Token
        fields = ['id', 'patient', 'patient_id', 'token_date', 'token_number']
        read_only_fields = ['token_number', 'patient']

    def create(self, validated_data):
        patient_id = validated_data.pop('patient_id')
        # Fetch the patient by patient_id
        patient = Patient.objects.get(patient_id=patient_id)
        
        # Set the current date if not provided
        token_date = validated_data.get('token_date', None)
        if not token_date:
            token_date = date.today()
        
        # Generate the token
        token_number = f"TK-{token_date.strftime('%Y%m%d')}-{str(Token.objects.filter(token_date=token_date).count() + 1).zfill(3)}"
        
        token = Token.objects.create(patient=patient, token_date=token_date, token_number=token_number)
        return token
