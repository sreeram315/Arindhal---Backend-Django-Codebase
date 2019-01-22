from rest_framework.serializers import ModelSerializer, HyperlinkedIdentityField, SerializerMethodField

#
from students.models import StudentInfo
from django.conf.urls.static import static

all_fields = [
				'name',
				'reg_no',
				'cgpa',
				'section',
				'gender',
				'dob',
				'batch',
				'contact',
				'address',
				'description',
				'father_name',
				'mother_name',
				'father_contact',
				'mother_contact',
				'department',
				'school',
				'extra_content',

				'image',
			]

url_detail = HyperlinkedIdentityField(
	view_name = 'students-api-detail',
	lookup_field = 'slug'
		)

class StudentSerializer(ModelSerializer):
	owner = SerializerMethodField()
	something = SerializerMethodField()
	url = url_detail
	class Meta:
		model = StudentInfo
		fields = [
				'name',
				'reg_no',
				'cgpa',
				'section',
				'gender',
				'dob',
				'batch',
				'contact',
				'address',
				'description',
				'father_name',
				'mother_name',
				'father_contact',
				'mother_contact',
				'department',
				'school',
				'extra_content',
				'url',
				'owner',
				'something',
				'image',
				'slug'
			]
	def get_owner(self, obj):
		return obj.owner.username

	def get_something(self, obj):
		return obj.reg_no

class StudentListSerializer(ModelSerializer):
	owner = SerializerMethodField()
	something = SerializerMethodField()
	url = url_detail
	class Meta:
		model = StudentInfo
		fields = [
				'name',
				'reg_no',
				'cgpa',
				'section',
				'gender',
				'dob',
				'batch',
				'contact',
				'address',
				'description',
				'father_name',
				'mother_name',
				'father_contact',
				'mother_contact',
				'department',
				'school',
				'extra_content',
				'url',
				'owner',
				'something',
				'image',
				'slug'
			]
	def get_owner(self, obj):
		return obj.owner.username

	def get_something(self, obj):
		return obj.reg_no

class StudentDetailSerializer(ModelSerializer):
	owner = SerializerMethodField()
	image = SerializerMethodField()
	class Meta:
		lookup_field = 'slug'
		model = StudentInfo
		extra_fields = ['owner', 'slug']
		fields = all_fields + extra_fields

	def get_owner(self, obj):
		return obj.owner.username

	def get_image(self, obj):
		if not obj.image: return '/static/images/image_not_found.png'
		return None

class StudentCreateSerializer(ModelSerializer):
	class Meta:
		model = StudentInfo
		extra_fields = ['slug']
		fields = all_fields + extra_fields






