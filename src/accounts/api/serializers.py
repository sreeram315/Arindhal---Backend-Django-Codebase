from rest_framework.serializers import ModelSerializer, HyperlinkedIdentityField, SerializerMethodField

#
from accounts.models import AccountInfo
from django.conf.urls.static import static


class AccountDetailsSerializer(ModelSerializer):
	owner = SerializerMethodField()
	followers = SerializerMethodField()
	following = SerializerMethodField()
	username = SerializerMethodField()
	is_active = SerializerMethodField()
	followers_count = SerializerMethodField()
	following_count = SerializerMethodField()
	class Meta:
		model = AccountInfo
		fields = [
				"owner",			
				"name",			
				"username",		
				"email"	,		
				"dob"		,		
				"contact"	,		
				"address"	,	
				"date_time",	
				"updated"	,		
				"followers"		,
				"following",
				"followers_count"		,
				"following_count",
				"slug"			,
				"description"	,
				"is_active"
			]

	def get_owner(self, obj):
		return obj.owner.username

	def get_followers(self, obj):
		followers = []
		for user in obj.followers.all():
			try:
				user = AccountInfo.objects.get(owner = user)
				user_f = user.name
				slug_f = user.slug
				data = {
						"name" : user_f,
						"slug" : slug_f
				}
				followers.append(data)
			except: pass
		return followers

	def get_followers_count(self, obj):
		return obj.followers.all().count()

	def get_following_count(self, obj):
		return obj.owner.is_following.all().count()

	def get_following(self, obj):
		following = []
		for user in obj.owner.is_following.all():
			try:
				user_f = user.name
				slug_f = user.slug
				data = {
						'name': user_f,
						'slug': slug_f
				}
				following.append(data)
			except: pass
		return following

	def get_username(self, obj):
		return obj.owner.username

	def get_is_active(self, obj):
		return obj.owner.is_active

class AccountUpdateSerializer(ModelSerializer):
	class Meta:
		model = AccountInfo
		fields = [		
				"name",	
				"email"	,		
				"dob"		,		
				"contact"	,		
				"address"	,		
				"description"	,
			]



