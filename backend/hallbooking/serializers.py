from rest_framework import serializers
from .models import Hall,Booking

class HallSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hall
        fields = '__all__'



class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ['id', 'user', 'hall', 'check_in', 'check_out', 'special_request', 'booking_date']

