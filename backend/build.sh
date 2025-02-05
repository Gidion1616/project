
cd "$(dirname "$0")"

set -o errexit

pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic --no-input
