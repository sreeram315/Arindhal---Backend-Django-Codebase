from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView

from django.conf import settings
from django.conf.urls.static import static

from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token



urlpatterns = [
    re_path(r'^admin/', admin.site.urls),
    re_path(r'^api-token-auth/', obtain_jwt_token),
    re_path(r'^api-token-verify/', verify_jwt_token),
    re_path(r'^google156f9c5c5fc961f3.html$', TemplateView.as_view(template_name='google156f9c5c5fc961f3.html.'), name="some"),
    re_path(r'^\.well-known/acme-challenge/h7t0wjUQwPIlR8ja0EL_P16yX95UZFcTOHNjN8F7Ad4$', TemplateView.as_view(template_name = 'h7t0wjUQwPIlR8ja0EL_P16yX95UZFcTOHNjN8F7Ad4'), name="temp1"),
    re_path(r'^\.well-known/acme-challenge/HNw7IegsixZdlpIDJA6-0VbX2aa4aktZMeKpowy7u_I$', TemplateView.as_view(template_name = 'HNw7IegsixZdlpIDJA6-0VbX2aa4aktZMeKpowy7u_I'), name="temp1"),
    re_path(r'^api/students/', include('students.api.urls')),
    re_path(r'^api/', include('accounts.api.urls')),
    re_path(r'^api/', include('twitter.api.urls')),

    


    re_path(r'^', TemplateView.as_view(template_name='frontend/index.html')),   # fromt-end
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root = settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)




# front end
urlpatterns += [re_path(r'^', TemplateView.as_view(template_name='frontend/index.html'))]
