from django.db import models

from django.contrib.auth.models import User  # Assuming you're using Django's built-in User model

# Create your models here.

class Hall(models.Model):
    hallname = models.CharField(max_length=255)  # Name of the hall
    hallimage = models.ImageField(upload_to='halls/')  # Path to upload hall images
    price = models.DecimalField(max_digits=10, decimal_places=2)  # Price of the hall
    size = models.CharField(max_length=50)  # Size in square feet
    capacity = models.PositiveIntegerField()  # Capacity of people
    halllocation = models.CharField(max_length=255)  # Location of the hall

    def __str__(self):
        return self.hallname
    


class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="bookings")  # Reference to the User model
    hall = models.ForeignKey(Hall, on_delete=models.CASCADE, related_name="bookings")  # Reference to the Hall model
    check_in = models.DateField()  # Check-in date
    check_out = models.DateField()  # Check-out date
    special_request = models.TextField(blank=True, null=True)  # Special requests from the user
    booking_date = models.DateTimeField(auto_now_add=True)  # Date when the booking was created

    def __str__(self):
        return f"{self.user.username} - {self.hall.hallname} ({self.check_in} to {self.check_out})"


    
        
