from rest_framework.permissions import BasePermission


class IsOwner(BasePermission):
	message = 'oyy! you are not the owner of this data!'
	def has_object_permission(self, request, view, obj):
		print(obj.owner == request.user)
		return obj.owner == request.user
