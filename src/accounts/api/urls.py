from django.conf.urls import url
from django.contrib import admin
from .views import (AccountBasicInfo, RegisterUser, CheckUsernameAvailability, 
					ProfileDetails, ProfileUpdateView, KaalaSearchResults,
					AccountDetailView, ToggleFollow  )



urlpatterns = [
    
     #########################  U S E R     A C C O U N T S         U R L S     #################
    url(r'^accounts/user-register/$', RegisterUser.as_view(), name = 'accounts-api-user-register'),
    url(r'^accounts/user-basic-details/$', AccountBasicInfo.as_view(), name = 'accounts-api-user-details'),
    url(r'^accounts/user-details/$', ProfileDetails.as_view(), name = 'accounts-api-user-details'),
    url(r'^accounts/user-open-details/(?P<slug>[\w-]+)/$', AccountDetailView.as_view(), name = 'accounts-api-user-open-details'),
    url(r'^accounts/user-update/$', ProfileUpdateView.as_view(), name = 'accounts-api-user-update'),
    url(r'^accounts/user-check-username-availability/$', CheckUsernameAvailability.as_view(), name = 'accounts-check-username-availability'),
    url(r'^accounts/user-follow-toggle/$', ToggleFollow.as_view(), name="user-foolow-toggle"),

    #########################  C A M P E R     U R L S     #################
    url(r'^camper-kaala-search/$', KaalaSearchResults.as_view(), name = 'camper-api-kaala-search'),

    


]
