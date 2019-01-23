from django.db import models
from django.db.models.signals import pre_save, post_save
from django.conf import settings
from django.db.models import Q


from .utils import unique_slug_generator

from accounts.models import AccountInfo
User = settings.AUTH_USER_MODEL

def get_location(instance, filename):
	return f'twitter_images/{instance.owner.username}/{instance.content}.jpeg'


class TweetInfo(models.Model):
	owner			=	models.ForeignKey(AccountInfo, on_delete = 'CASCADE')
	added			=	models.DateTimeField(auto_now_add = True, null = True, blank = True)
	updated			=	models.DateTimeField(auto_now = True, null = True, blank = True)
	slug			=	models.SlugField(null = True, blank  = True)
	content			=	models.TextField(default="-")

	image			=	models.ImageField(			upload_to = get_location,  
													null = True,
													blank = True, 
													width_field="width_field", 
           										 	height_field="height_field",
           										)
	height_field 	= 	models.IntegerField(default=0)
	width_field 	= 	models.IntegerField(default=0)


	def __str__(self):
		return str(f'{self.owner.username} -- {self.content[:10]}')

	@property
	def title(self):
		return self.content



def stu_info_pre_save(sender, instance, *args, **kwargs):
	if not instance.slug:
		instance.slug = unique_slug_generator(instance)
		

pre_save.connect(stu_info_pre_save, sender = TweetInfo)
	

