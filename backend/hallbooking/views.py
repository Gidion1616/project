from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import *
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated










from django.db.models import Q






# Create your views here.



@api_view(['POST'])
def register_user(request):
    
    try:
        # Extract user data from the request
        data = request.data
        username = data.get("username")
        email = data.get("email")
        first_name = data.get("first_name")
        last_name = data.get("last_name")
        password = data.get("password")
        confirm_password = data.get("confirm_password")

        # Validate passwords
        if password != confirm_password:
            return Response({"error": "Passwords do not match."}, status=status.HTTP_400_BAD_REQUEST)

        # Check if the username or email already exists
        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already taken."}, status=status.HTTP_400_BAD_REQUEST)
        if User.objects.filter(email=email).exists():
            return Response({"error": "Email already registered."}, status=status.HTTP_400_BAD_REQUEST)

        # Create the user
        user = User.objects.create(
            username=username,
            email=email,
            first_name=first_name,
            last_name=last_name,
            password=make_password(password),  # Hash the password
        )

        return Response(
            {"message": "User registered successfully!", "user_id": user.id}, status=status.HTTP_201_CREATED
        )

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    



@api_view(['POST'])
def login_user(request):
    
    try:
        # Extract login data from the request
        data = request.data
        username = data.get("username")
        password = data.get("password")

        # Validate inputs
        if not username or not password:
            return Response({"error": "Username and password are required."}, status=status.HTTP_400_BAD_REQUEST)

        # Authenticate user
        user = authenticate(username=username, password=password)

        if user is not None:
            # Generate or retrieve token for the user
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                "message": "Login successful.",
                "token": token.key
            }, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid username or password."}, status=status.HTTP_401_UNAUTHORIZED)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




class AllHallsView(ListAPIView):
    """
    View to fetch all halls using DRF generics.
    """
    queryset = Hall.objects.all()
    serializer_class = HallSerializer



class LimitedHallsView(APIView):
    """
    View to fetch only the first 4 halls.
    """
    def get(self, request, *args, **kwargs):
        halls = Hall.objects.all()[:4]  # Limit to the first 4 halls
        serializer = HallSerializer(halls, many=True)
        return Response(serializer.data)




class HallDetailView(APIView):
    """
    View to fetch a specific hall by ID.
    """
    def get(self, request, pk, *args, **kwargs):
        try:
            hall = Hall.objects.get(pk=pk)
            serializer = HallSerializer(hall)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Hall.DoesNotExist:
            return Response({"error": "Hall not found."}, status=status.HTTP_404_NOT_FOUND)
        






class BookHallView(APIView):
    
    permission_classes = [IsAuthenticated]  # Require authentication
    """
    View to handle booking for a specific hall.
    Ensures no overlapping bookings for the same hall within the date range.
    """

    def post(self, request, *args):
        
        
        hall_id = request.data.get('hall')
        
        hall = Hall.objects.filter(id=hall_id).first()

        if not hall:
            return Response({"error": "Hall not found"}, status=status.HTTP_404_NOT_FOUND)

        # Extract booking details from the request data
        check_in = request.data.get('check_in')
        check_out = request.data.get('check_out')
        user = request.user

        if not check_in or not check_out:
            return Response({"error": "Check-in and check-out dates are required."}, status=status.HTTP_400_BAD_REQUEST)

        # Check for overlapping bookings
        overlapping_bookings = Booking.objects.filter(
        Q(check_in__lte=check_out) & Q(check_out__gte=check_in),
        hall=hall)

        if overlapping_bookings.exists():
            return Response(
                {"error": "This hall is already booked for the selected date range."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Create the booking
        booking = Booking.objects.create(
            user=user,
            hall=hall,
            check_in=check_in,
            check_out=check_out,
            special_request=request.data.get('special_request', "")
        )

        serializer = BookingSerializer(booking)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


