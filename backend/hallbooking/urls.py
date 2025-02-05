from django.urls import path
from . import views



urlpatterns = [
    path('register/', views.register_user, name='register_user'),
    path('login/', views.login_user, name='login_user'),
    path('halls/', views.AllHallsView.as_view(), name='all_halls'),
    path('halls/limited/', views.LimitedHallsView.as_view(), name='limited_halls'),
    path('halls/<int:pk>/', views.HallDetailView.as_view(), name='hall_detail'),
    path('halls/book/', views.BookHallView.as_view(), name='book_hall'),

]    