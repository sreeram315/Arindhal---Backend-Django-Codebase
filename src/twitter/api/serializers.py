from rest_framework.serializers import ModelSerializer, HyperlinkedIdentityField, SerializerMethodField


from twitter.models import TweetInfo
from accounts.models import AccountInfo
from django.conf.urls.static import static


class NewTweetSerializer(ModelSerializer):
	class Meta:
		model = TweetInfo
		fields = [
				"content",
				"image",
			]

class TweetListSerializer(ModelSerializer):
	user_username = SerializerMethodField()
	user_name = SerializerMethodField()
	user_slug = SerializerMethodField()
	class Meta:
		model = TweetInfo
		fields = [
				"content",
				"slug",
				"user_username",
				"user_name",
				"user_slug"
		]

	def get_user_name(self, obj):
		return obj.owner.name

	def get_user_username(self, obj):
		return obj.owner.username

	def get_user_slug(self, obj):
		return obj.owner.slug







