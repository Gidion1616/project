import os

# Install dependencies
os.system("pip install -r requirements.txt")

# Apply migrations
os.system("python manage.py migrate")

# Collect static files
os.system("python manage.py collectstatic --noinput")

print("Build completed successfully!")
