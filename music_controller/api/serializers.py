from rest_framework import serializers
from .models import Room

#converts database info into json format
class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        #id is the primary key
        fields = ('id', 'code', 'host', 'guest_can_pause', 'votes_to_skip', 'created_at') # fields = '__all__'