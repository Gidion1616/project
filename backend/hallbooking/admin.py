from django.contrib import admin
from .models import Hall,Booking



@admin.register(Hall)
class HallAdmin(admin.ModelAdmin):
    # Fields to display in the admin list view
    list_display = ('hallname', 'price', 'size', 'capacity', 'halllocation')
    
    # Fields to filter by in the admin list view
    list_filter = ('price', 'capacity', 'halllocation')
    
    # Fields to search by in the admin search bar
    search_fields = ('hallname', 'halllocation')
    
    # Default ordering of the records
    ordering = ('hallname',)
    
admin.site.site_header = "HALL BOOKING  ADMINISTRATION"
# admin.site.site_title = "Weledi Africa Admin Portal"
# admin.site.index_title = "Welcome to Weledi Africa Admin Dashboard" 



@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('user', 'hall', 'check_in', 'check_out', 'booking_date')
    list_filter = ('check_in', 'check_out', 'booking_date')
    search_fields = ('user__username', 'hall__hallname')
