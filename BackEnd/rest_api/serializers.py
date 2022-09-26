from rest_framework import serializers
from rest_api.models import OnlineJudge


class OnlineJudgeSerializer(serializers.ModelSerializer):

    class MetaData:
        model = OnlineJudge
        fields = ('user',
                  'code',
                  'isPassed'
                  )