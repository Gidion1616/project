"""
ASGI config for server project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/asgi/
"""
import os
from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.server.settings')

application = get_asgi_application()


import os
settings_modude = 'server.deploy_setting' if 'RENDER_EXTERNAL_HOSTNAME' in os.environ else 'server.settings'

from django.core.asgi import get_asgi_application

# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings_module')

application = get_asgi_application()
