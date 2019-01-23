from rest_framework.generics import ( ListAPIView, RetrieveAPIView, DestroyAPIView,
										 UpdateAPIView, CreateAPIView)
from rest_framework.views import APIView
from rest_framework.permissions import ( AllowAny, IsAuthenticated, IsAdminUser, IsAuthenticatedOrReadOnly,
	)


from rest_framework.response import Response
from django.db.models import Count

from django.db.models import Q
from django.contrib.auth import login, authenticate
import json

from django.contrib.auth import get_user_model 
from accounts.models import AccountInfo
from twitter.models import TweetInfo
UserModel = get_user_model()

from .serializers import NewTweetSerializer, TweetListSerializer

from .paginators import TweetInfoLimitPagination



##############################  T W I T T E R      A P I  ##############################



class TweetCreateAPIView(CreateAPIView):
	queryset 			= TweetInfo.objects.all()
	serializer_class 	= NewTweetSerializer

	def perform_create(self, serializer):
		user_account = AccountInfo.objects.get(owner = self.request.user)
		serializer.save(owner = user_account)



class TweetListAPIView(ListAPIView):
	serializer_class = TweetListSerializer
	pagination_class = TweetInfoLimitPagination
	permission_classes = []

	queryset = TweetInfo.objects.all()[:10]























