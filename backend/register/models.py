from django.db import models
from datetime import date

class Patient(models.Model):
    GENDER_CHOICES = (("male", "Male"), ("female", "Female"))

    patient_id = models.CharField(max_length=20, unique=True, editable=False)
    name = models.CharField(max_length=100)
    dob = models.DateField()
    age = models.IntegerField(blank=True, null=True)
    gender = models.CharField(max_length=6, choices=GENDER_CHOICES)
    phone_number = models.CharField(max_length=15)

    def save(self, *args, **kwargs):
        # Generate unique patient_id based on today's date and incremental number
        if not self.patient_id:
            today = date.today().strftime("%d%m%Y")
            last_patient = Patient.objects.filter(patient_id__startswith=f"PA-{today}").order_by('id').last()
            next_id = 1 if not last_patient else int(last_patient.patient_id.split("-")[-1]) + 1
            self.patient_id = f"PA-{today}-{next_id:03d}"

        # Calculate age based on DOB
        self.age = date.today().year - self.dob.year - ((date.today().month, date.today().day) < (self.dob.month, self.dob.day))
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} - {self.patient_id}"
class Token(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    token_date = models.DateField()
    token_number = models.CharField(max_length=30, unique=True)

    def save(self, *args, **kwargs):
        if not self.token_number:
            date_str = self.token_date.strftime("%Y%m%d")
            today_tokens = Token.objects.filter(token_date=self.token_date)
            next_token = today_tokens.count() + 1
            self.token_number = f"TK-{date_str}-{next_token:03d}"
        super().save(*args, **kwargs)

    def __str__(self):
        return self.token_number
