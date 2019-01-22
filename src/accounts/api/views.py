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
UserModel = get_user_model()

from .serializers import AccountDetailsSerializer, AccountUpdateSerializer


##############################  U S E R    A C C O U N T S     A P I  ##############################


class AccountBasicInfo(APIView):
	permission_classes = [IsAuthenticated]
	def get(self, request):
		user = (AccountInfo.objects.filter(owner = request.user)).first()
		username = user.username
		name     = user.name
		data = {
			'username': username,
			'name'	  : name
		}

		return Response(data)

class RegisterUser(APIView):
	## API to create user
	def post(self, request):
		print(request.data)
		username_ = request.data.get('username')
		password_ =  request.data.get('password')
		name_	  =  request.data.get('name')	
		user = UserModel.objects.create(username=username_)
		user.set_password(password_)
		user.save()
		acc = AccountInfo.objects.get(owner = user)
		acc.name = name_
		acc.save()
		print(acc)
		return Response("POST DONE")

class CheckUsernameAvailability(APIView):
	def get(self, request):
		return Response("GET REQUEST NOT AVAILABLE")

	def post(self, request):
		try:
			print("Got data ", request.data)
			username = request.data.get('username')
			usernames_all = UserModel.objects.filter(username = username)
			print(usernames_all)
			if usernames_all.exists():
				return Response('NOT_OK')
			else:
				return Response("OK")
		except:
			return Response("ERROR")

class AccountDetailView(RetrieveAPIView):
	lookup_field = 'slug'
	serializer_class = AccountDetailsSerializer
	queryset = AccountInfo.objects.all()

class ProfileDetails(RetrieveAPIView):
	serializer_class = AccountDetailsSerializer
	permission_classes = [IsAuthenticated]

	def get_object(self):
		obj = AccountInfo.objects.get(owner = self.request.user)
		return obj

class ProfileUpdateView(UpdateAPIView):
	serializer_class = AccountUpdateSerializer
	permission_classes = [IsAuthenticated]

	def get_object(self):
		obj = AccountInfo.objects.get(owner = self.request.user)
		return obj

class ToggleFollow(APIView):
	permission_classes = [IsAuthenticated]
	def post(self, request):
		# try:
		user2_username   = request.data.get("username")
		user1			= self.request.user
		action 			= request.data.get("action")

		acc_1			= AccountInfo.objects.get(owner = user1)
		acc_2 			= AccountInfo.objects.get(owner__username = user2_username).owner
		
		if action=="toggle":
			if acc_2 not in acc_1.followers.all():
				acc_1.followers.add(acc_2)
			elif acc_2 in acc_1.followers.all():
				acc_1.followers.remove(acc_2)
			return Response("Action performed")
		else:
			return Response("Action failed")

			
		# except:
		# 	return Response('Action failed')




##############################  C A M P E R    A P I  ##############################


class KaalaSearchResults(APIView):

	def get(self, request):
		q = self.request.GET.get("q")
		if not q or len(q)==0: return Response("NaN")
		data={}

		def get_users(q, retuner = []):
			# users with query q
			users = AccountInfo.objects.filter(Q(name__icontains = q) | Q(owner__username__icontains = q))\
										.annotate(num_followers=Count('followers')) \
										.order_by('-num_followers')[:4]
			
			for user in users:
				followers = user.followers.count()
				following = user.owner.is_following.count()

				retuner.append({
								'name': user.name,
								'username': user.owner.username,
								'email': user.email,
								'slug': user.slug,
								'followers': followers,
								'following': following
							})
			return retuner
		

		data['users'] = get_users(q)

		if len(data['users'])!=0:
			return Response(data)

		return Response("NaN")
























