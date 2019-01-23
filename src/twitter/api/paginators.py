from rest_framework.pagination import LimitOffsetPagination, PageNumberPagination


class TweetInfoLimitPagination(LimitOffsetPagination):
	default_limit = 13
	max_limit = 9999999999999