from rest_framework.pagination import LimitOffsetPagination, PageNumberPagination


class StudentInfoLimitPagination(LimitOffsetPagination):
	default_limit = 32
	max_limit = 9999999999999