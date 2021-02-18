from rest_framework import serializers
from .models import Room

#converts database info into json format
class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        #id is the primary key
        fields = ('id', 'code', 'host', 'guest_can_pause', 'votes_to_skip', 'created_at') # fields = '__all__'

# serialize request
class CreateRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('guest_can_pause', 'votes_to_skip', 'created_at')

class UpdateRoomSerializer(serializers.ModelSerializer):
    code = serializers.CharField(validators=[])

    class Meta:
        model = Room
        fields = ('guest_can_pause', 'votes_to_skip', 'code')