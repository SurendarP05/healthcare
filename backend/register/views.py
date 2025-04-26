from rest_framework import viewsets
from .models import Patient, Token
from .serializers import PatientSerializer, TokenSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from rest_framework.decorators import action
from datetime import date

class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all().order_by('-id')
    serializer_class = PatientSerializer


# class TokenViewSet(viewsets.ModelViewSet):
#     queryset = Token.objects.all().order_by('-id')
#     serializer_class = TokenSerializer

#     @action(detail=False, methods=['post'])
#     def generate_token(self, request):
#         patient_id = request.data.get('patient_id')
#         filter_backends = [DjangoFilterBackend]
#         filterset_fields = ['token_date'] 

#         # Ensure patient_id is provided
#         if not patient_id:
#             return Response({"error": "Patient ID is required."}, status=400)

#         # Fetch the patient by patient_id
#         try:
#             patient = Patient.objects.get(patient_id=patient_id)
#         except Patient.DoesNotExist:
#             return Response({"error": "Patient not found!"}, status=404)

#         # Get today's date for token generation
#         token_date = date.today()

#         # Generate token for the selected patient
#         token = Token.objects.create(patient=patient, token_date=token_date)

#         # Return the token data
#         return Response({
#             "patient_id": patient.patient_id,
#             "patient_name": patient.name,
#             "token_date": token.token_date,
#             "token_number": token.token_number
#         })

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from django_filters.rest_framework import DjangoFilterBackend
from datetime import date
from .models import Token, Patient
from .serializers import TokenSerializer

class TokenViewSet(viewsets.ModelViewSet):
    queryset = Token.objects.all().order_by('-id')
    serializer_class = TokenSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['token_date']  # Enable filtering by token_date

    @action(detail=False, methods=['get'])
    def tokens_by_date(self, request):
        # Get the date from the query parameters
        token_date = request.query_params.get('token_date', date.today())
        
        try:
            token_date_obj = date.fromisoformat(token_date)  # Convert to date object
        except ValueError:
            return Response({"error": "Invalid date format. Please use YYYY-MM-DD."}, status=400)

        # Filter tokens by the selected date
        tokens = Token.objects.filter(token_date=token_date_obj)

        # Serialize the data
        serialized_tokens = TokenSerializer(tokens, many=True)

        return Response(serialized_tokens.data)

    @action(detail=False, methods=['post'])
    def generate_token(self, request):
        patient_id = request.data.get('patient_id')

        # Ensure patient_id is provided
        if not patient_id:
            return Response({"error": "Patient ID is required."}, status=400)

        # Fetch the patient by patient_id
        try:
            patient = Patient.objects.get(patient_id=patient_id)
        except Patient.DoesNotExist:
            return Response({"error": "Patient not found!"}, status=404)

        # Get today's date for token generation
        token_date = date.today()

        # Generate token for the selected patient
        token = Token.objects.create(patient=patient, token_date=token_date)

        # Return the token data
        return Response({
            "patient_id": patient.patient_id,
            "patient_name": patient.name,
            "token_date": token.token_date,
            "token_number": token.token_number
        })

