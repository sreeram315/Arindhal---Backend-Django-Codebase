from django.db import models
from django.db.models.signals import pre_save, post_save
from django.conf import settings
from django.db.models import Q


# Create your models here.
from .utils import unique_slug_generator
from .validators import validate_section

User = settings.AUTH_USER_MODEL


def get_location(instance, filename):
	return f'student_pictures/{instance.owner.username}/{instance.reg_no}.jpeg'


class StudentInfo(models.Model):
	owner			=	models.ForeignKey(User, on_delete = 'CASCADE')
	reg_no			=	models.IntegerField(null = True, blank  = True)
	name			=	models.CharField(max_length = 300, null = True, blank = True)
	cgpa			=	models.FloatField(null = True, blank  = True)
	dob				=	models.DateField(null = True, blank  = True)
	gender			=	models.CharField(max_length = 1, null = True, blank = True)
	section			=	models.CharField(max_length = 100, null = True, blank = True, validators = [validate_section])
	contact			=	models.CharField(max_length = 100, null = True, blank = True)
	batch			=	models.IntegerField(null = True, blank  = True)
	address			=	models.CharField(max_length = 1000, null = True, blank = True)
	department		=	models.CharField(max_length = 300, null = True, blank = True)
	description		=	models.CharField(max_length = 9999, blank = True, null = True)

	updated			=	models.DateTimeField(auto_now = True, null = True, blank = True)
	slug			=	models.SlugField(null = True, blank  = True)
	state			=	models.CharField(max_length = 200, null = True, blank = True)

	image			=	models.ImageField(		upload_to = get_location,  
													null = True,
													blank = True, 
													width_field="width_field", 
           										 	height_field="height_field"
           										)
	height_field 	= 	models.IntegerField(default=0)
	width_field 	= 	models.IntegerField(default=0)

	father_name		=	models.CharField(max_length = 300, null = True, blank = True)
	mother_name		=	models.CharField(max_length = 300, null = True, blank = True)

	father_contact	=	models.CharField(max_length = 100, null = True, blank = True)
	mother_contact	=	models.CharField(max_length = 100, null = True, blank = True)

	school			=	models.CharField(max_length = 900, null = True, blank = True)

	extra_content	=	models.TextField(default="-")
	

	def __str__(self):
		return str(f'{self.reg_no} -- {self.name}')

	@property
	def title(self):
		return self.name



def stu_info_pre_save(sender, instance, *args, **kwargs):
	print('saving')
	if not instance.state:
		state = '--'
		try:
			state = instance.address.split()[-2]
			if state == '-': state = instance.address.split()[-3]

			if state == 'Pradesh': state = instance.address.split()[-3] + ' ' + state
			elif state == 'Kashmir': state = 'Jammu & kashmir'
			elif state == 'Nadu': state = 'Tamil Nadu'
			elif state == 'Bengal': state = 'West Bengal'
			else: state = instance.address.split()[-2]
		except: pass
		instance.state = state

	if not instance.slug:
		instance.slug = unique_slug_generator(instance)
		

pre_save.connect(stu_info_pre_save, sender = StudentInfo)
	

