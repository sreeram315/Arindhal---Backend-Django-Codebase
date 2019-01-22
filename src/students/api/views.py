from rest_framework.generics import ( ListAPIView, RetrieveAPIView, DestroyAPIView,
										 UpdateAPIView, CreateAPIView)
from rest_framework.views import APIView
from rest_framework.permissions import ( AllowAny, IsAuthenticated, IsAdminUser, IsAuthenticatedOrReadOnly,
	)
from rest_framework.response import Response

from django.db.models import Q

from students.models import StudentInfo
from .permissions import IsOwner
from .serializers import StudentListSerializer, StudentCreateSerializer, StudentDetailSerializer, StudentSerializer
from .paginators import StudentInfoLimitPagination


class StudentInfoListAPIView(ListAPIView):
	serializer_class = StudentListSerializer
	pagination_class = StudentInfoLimitPagination
	permission_classes = [IsAuthenticated]

	def get_queryset(self):
		queryset = StudentInfo.objects.all()
		query  =  self.request.GET.get('q', '')
		section= self.request.GET.get('section', '')
		state  =  self.request.GET.get('state', '')
		gender  =  self.request.GET.get('gender', '')
		order_by  =  self.request.GET.get('order_by', 'name')
		reverse  =  self.request.GET.get('reverse', None)

		print(f'''

				{self.request.user}



			''')

		queryset = queryset.filter(			
									Q(name__icontains 		= query) 	 	|
									Q(reg_no__icontains 	= query) 		|
									Q(batch__icontains 		= query) 		|
									Q(section__icontains	= query)		,

									Q(state__icontains 		= state)   | 
									Q(state 				= None)   		,

									Q(gender__icontains		= gender)|
									Q(gender				= None),

									Q(section__icontains = section) |
									Q(section			 = None) ,
									owner = self.request.user,


								).order_by(
									order_by
								)

		if reverse == 'reverse': return queryset.reverse()
		return queryset


class StudentInfoDetailView(RetrieveAPIView):
	lookup_field = 'slug'
	queryset = StudentInfo.objects.all()
	serializer_class = StudentDetailSerializer
	permission_classes = [IsOwner]

class StudentInfoUpdateAPIView(UpdateAPIView):
	queryset = StudentInfo.objects.all()
	serializer_class = StudentSerializer
	permission_classes = [IsOwner]


class StudentInfoDeleteAPIView(DestroyAPIView):
	queryset = StudentInfo.objects.all()
	serializer_class = StudentSerializer

class StudentInfoCreateAPIView(CreateAPIView):
	queryset = StudentInfo.objects.all()
	serializer_class = StudentCreateSerializer

	def perform_create(self, serializer):
		serializer.save(owner = self.request.user)


class StudentInfoStatesView(APIView):
	def get(self, request):
		states = (StudentInfo.objects.all()).values_list('state').distinct()
		states = [state[0] for state in states]
		return Response(states)







	# queryset = queryset.filter(			
	# 								Q(name__icontains 		= query) 	 	|
	# 								Q(reg_no__icontains 	= query) 		|
	# 								Q(batch__icontains 		= query) 		|
	# 								Q(section__icontains	= query)		,

	# 								Q(state__icontains 		= state)   | 
	# 								Q(state 				= None)   		,

	# 								Q(gender__icontains		= gender),

	# 								section__icontains = section,
	# 								owner = self.request.user,


	# 							).order_by(
	# 								order_by
	# 							)