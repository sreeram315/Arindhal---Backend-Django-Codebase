from django.conf.urls import url
from django.contrib import admin
from .views import ( TweetCreateAPIView, TweetListAPIView )



urlpatterns = [
    
     #########################  T W I T T E R    A P I         U R L S     #################
    url(r'^twitter/create/$', TweetCreateAPIView.as_view(), name = 'twitter-create-tweet'),
    url(r'^twitter/list/$', TweetListAPIView.as_view(), name = 'twitter-create-tweet'),


    


]
